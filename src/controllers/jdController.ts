import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { UserRequest } from '../types';
import { GeminiService } from '../services/ai/geminiService';
import pdf from 'pdf-parse';
import fs from 'fs';

// Initialize AI service
const geminiService = new GeminiService();

export const jdController = {
  /**
   * Creates a new Job Description
   */
  async createJd(req: UserRequest, res: Response) {
    console.log('jdController.createJd: START');
    try {
      const {
        title,
        description,
        minExperience,
        maxExperience,
        languages,
        projectContext,
      } = req.body;
      const creatorId = req.user?.id;

      if (!creatorId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (
        !title ||
        !description ||
        minExperience === undefined ||
        maxExperience === undefined ||
        !languages
      ) {
        return res
          .status(400)
          .json({ error: 'All required fields must be provided.' });
      }

      const newJd = await prisma.jobDescription.create({
        data: {
          title,
          description,
          minExperience: parseInt(minExperience, 10),
          maxExperience: parseInt(maxExperience, 10),
          languages,
          projectContext,
          creator: {
            connect: { id: creatorId },
          },
        },
      });

      console.log('jdController.createJd: END - JD created successfully');
      res.status(201).json(newJd);
    } catch (error) {
      console.error('jdController.createJd: ERROR creating JD:', error);
      res.status(500).json({ error: 'Failed to create job description' });
    }
  },

  /**
   * Gets all Job Descriptions
   */
  async getJds(req: Request, res: Response) {
    console.log('jdController.getJds: START');
    try {
      const jds = await prisma.jobDescription.findMany({
        include: {
          _count: {
            select: { candidates: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      console.log('jdController.getJds: END - Fetched all JDs');
      res.json(jds);
    } catch (error) {
      console.error('jdController.getJds: ERROR fetching JDs:', error);
      res.status(500).json({ error: 'Failed to fetch job descriptions' });
    }
  },

  /**
   * Gets a single Job Description by ID
   */
  async getJdById(req: Request, res: Response) {
    console.log('jdController.getJdById: START');
    try {
      const { id } = req.params;
      const jd = await prisma.jobDescription.findUnique({
        where: { id },
        include: {
          test: true,
          candidates: {
            include: {
              resume: true,
            },
          },
        },
      });

      if (!jd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      console.log('jdController.getJdById: END - Fetched JD by ID');
      res.json(jd);
    } catch (error) {
      console.error('jdController.getJdById: ERROR fetching JD:', error);
      res.status(500).json({ error: 'Failed to fetch job description' });
    }
  },

  /**
   * Updates a Job Description by ID
   */
  async updateJd(req: UserRequest, res: Response) {
    console.log('jdController.updateJd: START');
    try {
      const { id } = req.params;
      const {
        title,
        description,
        minExperience,
        maxExperience,
        languages,
        projectContext,
      } = req.body;
      const creatorId = req.user?.id;

      const existingJd = await prisma.jobDescription.findUnique({
        where: { id },
      });

      if (!existingJd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      if (existingJd.creatorId !== creatorId) {
        return res
          .status(403)
          .json({ error: 'Forbidden: You can only update your own job descriptions' });
      }

      const updatedJd = await prisma.jobDescription.update({
        where: { id },
        data: {
          title,
          description,
          minExperience:
            minExperience !== undefined
              ? parseInt(minExperience, 10)
              : undefined,
          maxExperience:
            maxExperience !== undefined
              ? parseInt(maxExperience, 10)
              : undefined,
          languages,
          projectContext,
        },
      });

      console.log('jdController.updateJd: END - JD updated successfully');
      res.json(updatedJd);
    } catch (error) {
      console.error('jdController.updateJd: ERROR updating JD:', error);
      res.status(500).json({ error: 'Failed to update job description' });
    }
  },

  /**
   * Deletes a Job Description by ID
   */
  async deleteJd(req: UserRequest, res: Response) {
    console.log('jdController.deleteJd: START');
    try {
      const { id } = req.params;
      const creatorId = req.user?.id;

      const existingJd = await prisma.jobDescription.findUnique({
        where: { id },
      });

      if (!existingJd) {
        return res.status(404).json({ error: 'Job description not found' });
      }

      if (existingJd.creatorId !== creatorId) {
        return res.status(403).json({ error: 'Forbidden: You can only delete your own job descriptions' });
      }

      await prisma.jobDescription.delete({
        where: { id },
      });

      console.log('jdController.deleteJd: END - JD deleted successfully');
      res.status(204).send();
    } catch (error) {
      console.error('jdController.deleteJd: ERROR deleting JD:', error);
      res.status(500).json({ error: 'Failed to delete job description' });
    }
  },

  /**
   * Uploads a resume for a specific Job Description
   */
  async uploadResumeForJd(req: UserRequest, res: Response) {
    console.log('jdController.uploadResumeForJd: START');
    try {
      const { id: jdId } = req.params;
      const { email } = req.body;
      const file = req.file;

      if (!jdId) {
        return res.status(400).json({ error: 'Job Description ID is required.' });
      }
      if (!file) {
        return res.status(400).json({ error: 'Resume file is required.' });
      }
      if (!email) {
        return res.status(400).json({ error: 'Candidate email is required.' });
      }

      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      // Parse the resume PDF to extract text
      const fileBuffer = fs.readFileSync(file.path);
      const pdfData = await pdf(fileBuffer);
      const resumeText = pdfData.text;

      // Analyze the resume against the JD using AI
      console.log('jdController.uploadResumeForJd: Starting AI analysis...');
      const analysis = await geminiService.analyzeResumeForJd(resumeText, jobDescription);
      console.log('jdController.uploadResumeForJd: AI analysis completed. Score:', analysis.suitabilityScore);

      // Create the resume record with analysis
      const resume = await prisma.resume.create({
        data: {
          email: analysis.candidateEmail || email,
          filename: file.originalname,
          path: file.path || 'temporary-path',
          size: file.size,
          analysis: analysis as any,
        },
      });

      // Create the candidate record with suitability score
      const newCandidate = await prisma.candidate.create({
        data: {
          status: 'PendingReview',
          suitabilityScore: analysis.suitabilityScore,
          suitabilityAnalysis: analysis.analysis as any,
          jobDescription: {
            connect: { id: jdId },
          },
          resume: {
            connect: { id: resume.id },
          },
        },
        include: {
          resume: true,
        },
      });

      console.log('jdController.uploadResumeForJd: END - Resume uploaded, analyzed, and candidate created');
      res.status(201).json({
        message: 'Resume uploaded and analyzed successfully',
        candidate: newCandidate,
        analysis: {
          suitabilityScore: analysis.suitabilityScore,
          summary: analysis.analysis.summary,
        },
      });
    } catch (error) {
      console.error('jdController.uploadResumeForJd: ERROR uploading resume:', error);
      // Check for Prisma's unique constraint violation error
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        return res.status(409).json({
          error: 'This candidate has already applied for this job description.',
        });
      }
      res.status(500).json({ error: 'Failed to upload and analyze resume' });
    }
  },

  /**
   * Sends test links to selected candidates for a specific Job Description
   */
  async sendTestsToCandiidates(req: UserRequest, res: Response) {
    console.log('jdController.sendTestsToCandiidates: START');
    try {
      const { id: jdId } = req.params;
      const { candidateIds } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
        return res.status(400).json({ error: 'Candidate IDs are required.' });
      }

      // Verify the JD exists and has a test
      const jobDescription = await prisma.jobDescription.findUnique({
        where: { id: jdId },
        include: {
          test: true,
        },
      });

      if (!jobDescription) {
        return res.status(404).json({ error: 'Job Description not found.' });
      }

      if (!jobDescription.test) {
        return res.status(400).json({ error: 'No test project has been generated for this JD yet.' });
      }

      // Get the selected candidates
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

      // Update candidate status to 'TestSent'
      const updatedCandidates = await Promise.all(
        candidates.map(candidate =>
          prisma.candidate.update({
            where: { id: candidate.id },
            data: {
              status: 'TestSent',
            },
            include: {
              resume: true,
            },
          })
        )
      );

      // TODO: In a real application, you would send emails here
      // For now, we'll just log the information that would be sent
      console.log('Test links would be sent to:');
      updatedCandidates.forEach(candidate => {
        console.log(`- ${candidate.resume.email}: ${jobDescription.test?.gitRepoUrl}`);
      });

      console.log('jdController.sendTestsToCandiidates: END - Tests sent successfully');
      res.status(200).json({
        message: `Test links sent to ${updatedCandidates.length} candidates`,
        sentTo: updatedCandidates.map(c => ({
          candidateId: c.id,
          email: c.resume.email,
          testUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/test/${jobDescription.test?.id}`,
          githubRepository: jobDescription.test?.gitRepoUrl,
        })),
      });
    } catch (error) {
      console.error('jdController.sendTestsToCandiidates: ERROR sending tests:', error);
      res.status(500).json({ error: 'Failed to send test links' });
    }
  },
};
