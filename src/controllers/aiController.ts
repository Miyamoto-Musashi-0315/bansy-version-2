import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { GeminiService } from '../services/ai/geminiService';
import GithubService from '../services/githubService';
import { untar } from '@/utils/tar';
import pdf from 'pdf-parse';
import { UserRequest } from '../types';
import { config } from '../config';

// Instantiate services
const geminiService = new GeminiService();

// Map the orgName from config to the expected organizationName for the service
const githubConfig = {
  ...config.github,
  organizationName: config.github.orgName,
};
const githubService = new GithubService(githubConfig);

export const aiController = {
  /**
   * Analyze a candidate's resume for a specific job description.
   * The resume is expected to be uploaded and available in the request.
   */
  async analyzeResumeForJd(req: Request, res: Response) {
    const { jdId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    if (!jdId) {
      return res.status(400).json({ error: 'Job Description ID is required.' });
    }

    try {
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Parse the resume PDF
      const pdfData = await pdf(file.buffer);
      const resumeText = pdfData.text;

      // Call Gemini to analyze the resume against the JD
      const analysis = await geminiService.analyzeResumeForJd(
        resumeText,
        jobDescription
      );

      // Create a resume record first
      const resume = await prisma.resume.create({
        data: {
          email: analysis.candidateEmail || 'unknown@email.com',
          filename: file.originalname,
          path: file.path || 'temporary-path',
          size: file.size,
          analysis: analysis as any, // Store the full analysis
        },
      });

      // Create a candidate record
      const candidate = await prisma.candidate.create({
        data: {
          status: 'PendingReview',
          suitabilityScore: analysis.suitabilityScore,
          suitabilityAnalysis: analysis.analysis as any,
          jobDescriptionId: jdId,
          resumeId: resume.id,
        },
        include: {
          resume: true,
          jobDescription: true,
        },
      });

      res.status(201).json({
        message: 'Resume analyzed successfully',
        candidate,
        analysis,
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      res.status(500).json({ error: 'Failed to analyze resume.' });
    }
  },

  /**
   * Generate a coding project for a specific job description.
   */
  async generateProjectForJd(req: UserRequest, res: Response) {
    const { jdId } = req.params;
    const user = req.user;

    console.log(`[${new Date().toISOString()}] Starting project generation for JD: ${jdId}, User: ${user?.id}`);

    if (!user) {
      console.error('Unauthorized access attempt to generate project');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // 1. Fetch the Job Description from the database
      console.log(`Fetching JD from database: ${jdId}`);
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: { test: true } // Include existing test to check if already generated
      });

      if (!jobDescription) {
        console.error(`Job Description not found: ${jdId}`);
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Check if test already exists
      if (jobDescription.test) {
        console.log(`Test already exists for JD: ${jdId}, proceeding with regeneration...`);
        
        const testIdToDelete = jobDescription.test.id;

        // Delete order matters because of FK constraints.
        // 1. Submission events linked to this test
        await prisma.submissionEvent.deleteMany({ where: { testId: testIdToDelete } });
        // 2. Submissions linked to this test
        await prisma.submission.deleteMany({ where: { testId: testIdToDelete } });
        // 3. Test files (if any)
        await prisma.testFile.deleteMany({ where: { testId: testIdToDelete } });
        // 4. Test cases
        await prisma.testCase.deleteMany({ where: { testId: testIdToDelete } });

        console.log('Deleted dependent SubmissionEvents, Submissions, TestFiles, and TestCases');

        // 5. Finally delete the test itself
        await prisma.test.delete({ where: { id: testIdToDelete } });

        console.log('Existing test deleted, proceeding with new generation...');
      }
      
      console.log(`Creating preliminary test record for JD: ${jobDescription.title}`);
      // 2. Create a preliminary Test record to get a testId
      const preliminaryTest = await prisma.test.create({
        data: {
          title: `Generating test for ${jobDescription.title}...`,
          jobDescriptionId: jdId,
          difficulty: 'Pending',
          language: 'Pending',
          requirements: {},
        },
      });

      console.log(`Preliminary test created with ID: ${preliminaryTest.id}`);

      // 3. Generate the project from the JD using the Gemini service
      console.log('Starting Gemini project generation...');
      const projectTemplate = await geminiService.generateProjectFromJd({
        title: jobDescription.title,
        description: jobDescription.description,
        minExperience: jobDescription.minExperience,
        maxExperience: jobDescription.maxExperience,
        languages: jobDescription.languages,
        projectContext: jobDescription.projectContext,
      });

      console.log(`Project template generated: ${projectTemplate.title}`);

      // 4. Create a GitHub repository and commit the generated project files
      console.log('Creating GitHub repository...');
      const { repoUrl, cloneUrl } = await githubService.createTemporaryRepo(
        preliminaryTest.id,
        user.id,
        projectTemplate.projectFiles, // Code files
        projectTemplate.githubWorkflows || [],
        projectTemplate.githubIssues || []
      );

      console.log(`GitHub repository created: ${repoUrl}`);

      // 5. Persist the Test and its TestCases in two steps to avoid nested-create issues
      console.log('Updating test record with final details...');
      const updatedTest = await prisma.test.update({
        where: { id: preliminaryTest.id },
        data: {
          gitRepoUrl: cloneUrl,
          title: projectTemplate.title,
          description: projectTemplate.description,
          difficulty: projectTemplate.difficulty,
          language: projectTemplate.languages ? projectTemplate.languages.join(', ') : 'unknown',
          requirements: projectTemplate.requirements,
        },
      });

      // Insert test cases separately
      console.log(`Creating ${projectTemplate.testCases.length} test cases...`);
      if (projectTemplate.testCases.length > 0) {
        await prisma.testCase.createMany({
          data: projectTemplate.testCases.map(tc => ({
            description: tc.description,
            input: tc.input ?? null,
            expectedOutput: tc.expectedOutput ?? '',
            category: tc.category,
            difficulty: tc.difficulty,
            points: tc.points,
            verificationMethod: tc.verificationMethod,
            testId: updatedTest.id,
          })),
        });
      }

      // Insert project files into TestFile table for future reuse
      console.log(`Creating ${projectTemplate.projectFiles.length} test files...`);
      if (projectTemplate.projectFiles.length > 0) {
        await prisma.testFile.createMany({
          data: projectTemplate.projectFiles.map(file => ({
            path: file.path,
            content: file.content,
            testId: updatedTest.id,
          })),
        });
      }

      const finalTest = await prisma.test.findUnique({
        where: { id: updatedTest.id },
        include: { testCases: true },
      });

      console.log(`[${new Date().toISOString()}] Project generation completed successfully for JD: ${jdId}`);

      res.status(201).json({
        message: 'Project created successfully!',
        test: finalTest,
        githubRepository: repoUrl,
      });

    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] Error generating project for JD ${jdId}:`, {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
        response: error?.response?.data,
      });

      // Clean up preliminary test if it was created
      try {
        if (jdId) {
          const existingTest = await prisma.test.findFirst({
            where: { 
              jobDescriptionId: jdId,
              title: { contains: 'Generating test for' }
            }
          });
          if (existingTest) {
            await prisma.test.delete({ where: { id: existingTest.id } });
            console.log('Cleaned up preliminary test record');
          }
        }
      } catch (cleanupError) {
        console.error('Error cleaning up preliminary test:', cleanupError);
      }

      // Provide more specific error messages
      if (error?.message?.includes('GitHub')) {
        return res.status(500).json({ error: 'Failed to create GitHub repository. Please check GitHub configuration.' });
      } else if (error?.message?.includes('Gemini') || error?.message?.includes('AI')) {
        return res.status(500).json({ error: 'Failed to generate project with AI. Please try again.' });
      } else if (error?.message?.includes('Database') || error?.message?.includes('Prisma')) {
        return res.status(500).json({ error: 'Database error occurred. Please try again.' });
      } else {
        return res.status(500).json({ error: 'Failed to generate project. Please try again.' });
      }
    }
  },

  /**
   * Create individual candidate repositories with CI/CD workflows and GitHub Issues
   */
  async createCandidateRepositories(req: UserRequest, res: Response) {
    const { candidateIds } = req.body;
    const { jdId } = req.params;
    const user = req.user;

    console.log(`[${new Date().toISOString()}] Starting candidate repo creation for JD: ${jdId}, Candidates: ${candidateIds?.length}`);

    if (!user) {
      console.error('Unauthorized access attempt to create candidate repositories');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
      return res.status(400).json({ error: 'Candidate IDs are required.' });
    }

    try {
      // 1. Fetch the Job Description and its test
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: { 
          test: {
            include: { testCases: true }
          }
        }
      });

      if (!jobDescription) {
        console.error(`Job Description not found: ${jdId}`);
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      if (!jobDescription.test) {
        return res.status(400).json({ error: 'No test project has been generated for this JD yet.' });
      }

      // 2. Get the candidates
      const candidates = await prisma.candidate.findMany({
        where: {
          id: { in: candidateIds },
          jobDescriptionId: jdId,
        },
        include: {
          resume: true,
        },
      });

      if (candidates.length === 0) {
        return res.status(404).json({ error: 'No eligible candidates found.' });
      }

      // 3. Generate fresh project template with CI/CD components
      console.log('Generating project template with CI/CD workflows...');
      const projectTemplate = await geminiService.generateProjectFromJd({
        title: jobDescription.title,
        description: jobDescription.description,
        minExperience: jobDescription.minExperience,
        maxExperience: jobDescription.maxExperience,
        languages: jobDescription.languages,
        projectContext: jobDescription.projectContext,
      });

      console.log(`Project template generated with ${projectTemplate.githubWorkflows?.length || 0} workflows and ${projectTemplate.githubIssues?.length || 0} issues`);

      // 4. Create individual repositories for each candidate
      const candidateRepos: Array<{
        candidateId: string;
        email: string;
        repoUrl: string;
        cloneUrl: string;
      }> = [];

      for (const candidate of candidates) {
        try {
          console.log(`Creating repository for candidate: ${candidate.id}`);
          
          // Create individual repository with CI/CD and issues
          const { repoUrl, cloneUrl } = await githubService.createCandidateRepo(
            jobDescription.test.id,
            candidate.id,
            projectTemplate.projectFiles,
            projectTemplate.githubWorkflows || [],
            projectTemplate.githubIssues || []
          );

          candidateRepos.push({
            candidateId: candidate.id,
            email: candidate.resume.email,
            repoUrl,
            cloneUrl,
          });

          // Update candidate status to 'TestSent' and store repository URL
          await prisma.candidate.update({
            where: { id: candidate.id },
            data: {
              status: 'TestSent',
              individualRepoUrl: repoUrl,
              repoCreatedAt: new Date(),
            },
          });

          console.log(`Repository created for candidate ${candidate.id}: ${repoUrl}`);
        } catch (candidateError: any) {
          console.error(`Failed to create repository for candidate ${candidate.id}:`, candidateError);
          // Continue with other candidates instead of failing completely
        }
      }

      console.log(`[${new Date().toISOString()}] Created ${candidateRepos.length} candidate repositories`);

      res.status(201).json({
        message: `Created ${candidateRepos.length} individual repositories with CI/CD pipelines`,
        candidateRepositories: candidateRepos,
        projectTemplate: {
          title: projectTemplate.title,
          description: projectTemplate.description,
          difficulty: projectTemplate.difficulty,
          workflowsCount: projectTemplate.githubWorkflows?.length || 0,
          issuesCount: projectTemplate.githubIssues?.length || 0,
        },
      });

    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] Error creating candidate repositories:`, {
        message: error?.message,
        stack: error?.stack,
        name: error?.name,
      });

      // Provide specific error messages
      if (error?.message?.includes('GitHub')) {
        return res.status(500).json({ error: 'Failed to create GitHub repositories. Please check GitHub configuration.' });
      } else if (error?.message?.includes('Gemini') || error?.message?.includes('AI')) {
        return res.status(500).json({ error: 'Failed to generate project with AI. Please try again.' });
      } else {
        return res.status(500).json({ error: 'Failed to create candidate repositories. Please try again.' });
      }
    }
  },
};
