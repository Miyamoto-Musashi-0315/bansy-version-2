"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiController = void 0;
const prismaClient_1 = require("../prismaClient");
const geminiService_1 = require("../services/ai/geminiService");
const githubService_1 = __importDefault(require("../services/githubService"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const config_1 = require("../config");
// Instantiate services
const geminiService = new geminiService_1.GeminiService();
// Map the orgName from config to the expected organizationName for the service
const githubConfig = {
    ...config_1.config.github,
    organizationName: config_1.config.github.orgName,
};
const githubService = new githubService_1.default(githubConfig);
exports.aiController = {
    /**
     * Analyze a candidate's resume for a specific job description.
     * The resume is expected to be uploaded and available in the request.
     */
    async analyzeResumeForJd(req, res) {
        const { jdId } = req.params;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'Resume file is required.' });
        }
        if (!jdId) {
            return res.status(400).json({ error: 'Job Description ID is required.' });
        }
        try {
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
                where: { id: jdId },
            });
            if (!jobDescription) {
                return res.status(404).json({ error: 'Job Description not found.' });
            }
            // Parse the resume PDF
            const pdfData = await (0, pdf_parse_1.default)(file.buffer);
            const resumeText = pdfData.text;
            // Call Gemini to analyze the resume against the JD
            const analysis = await geminiService.analyzeResumeForJd(resumeText, jobDescription);
            // Create a resume record first
            const resume = await prismaClient_1.prisma.resume.create({
                data: {
                    email: analysis.candidateEmail || 'unknown@email.com',
                    filename: file.originalname,
                    path: file.path || 'temporary-path',
                    size: file.size,
                    analysis: analysis, // Store the full analysis
                },
            });
            // Create a candidate record
            const candidate = await prismaClient_1.prisma.candidate.create({
                data: {
                    status: 'PendingReview',
                    suitabilityScore: analysis.suitabilityScore,
                    suitabilityAnalysis: analysis.analysis,
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
        }
        catch (error) {
            console.error('Error analyzing resume:', error);
            res.status(500).json({ error: 'Failed to analyze resume.' });
        }
    },
    /**
     * Generate a coding project for a specific job description.
     */
    async generateProjectForJd(req, res) {
        var _a, _b, _c, _d, _e, _f;
        const { jdId } = req.params;
        const user = req.user;
        console.log(`[${new Date().toISOString()}] Starting project generation for JD: ${jdId}, User: ${user === null || user === void 0 ? void 0 : user.id}`);
        if (!user) {
            console.error('Unauthorized access attempt to generate project');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            // 1. Fetch the Job Description from the database
            console.log(`Fetching JD from database: ${jdId}`);
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
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
                await prismaClient_1.prisma.submissionEvent.deleteMany({ where: { testId: testIdToDelete } });
                // 2. Submissions linked to this test
                await prismaClient_1.prisma.submission.deleteMany({ where: { testId: testIdToDelete } });
                // 3. Test files (if any)
                await prismaClient_1.prisma.testFile.deleteMany({ where: { testId: testIdToDelete } });
                // 4. Test cases
                await prismaClient_1.prisma.testCase.deleteMany({ where: { testId: testIdToDelete } });
                console.log('Deleted dependent SubmissionEvents, Submissions, TestFiles, and TestCases');
                // 5. Finally delete the test itself
                await prismaClient_1.prisma.test.delete({ where: { id: testIdToDelete } });
                console.log('Existing test deleted, proceeding with new generation...');
            }
            console.log(`Creating preliminary test record for JD: ${jobDescription.title}`);
            // 2. Create a preliminary Test record to get a testId
            const preliminaryTest = await prismaClient_1.prisma.test.create({
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
            const { repoUrl, cloneUrl } = await githubService.createTemporaryRepo(preliminaryTest.id, user.id, projectTemplate.projectFiles, // Code files
            projectTemplate.githubWorkflows || [], projectTemplate.githubIssues || []);
            console.log(`GitHub repository created: ${repoUrl}`);
            // 5. Persist the Test and its TestCases in two steps to avoid nested-create issues
            console.log('Updating test record with final details...');
            const updatedTest = await prismaClient_1.prisma.test.update({
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
                await prismaClient_1.prisma.testCase.createMany({
                    data: projectTemplate.testCases.map(tc => {
                        var _a, _b;
                        return ({
                            description: tc.description,
                            input: (_a = tc.input) !== null && _a !== void 0 ? _a : null,
                            expectedOutput: (_b = tc.expectedOutput) !== null && _b !== void 0 ? _b : '',
                            category: tc.category,
                            difficulty: tc.difficulty,
                            points: tc.points,
                            verificationMethod: tc.verificationMethod,
                            testId: updatedTest.id,
                        });
                    }),
                });
            }
            // Insert project files into TestFile table for future reuse
            console.log(`Creating ${projectTemplate.projectFiles.length} test files...`);
            if (projectTemplate.projectFiles.length > 0) {
                await prismaClient_1.prisma.testFile.createMany({
                    data: projectTemplate.projectFiles.map(file => ({
                        path: file.path,
                        content: file.content,
                        testId: updatedTest.id,
                    })),
                });
            }
            const finalTest = await prismaClient_1.prisma.test.findUnique({
                where: { id: updatedTest.id },
                include: { testCases: true },
            });
            console.log(`[${new Date().toISOString()}] Project generation completed successfully for JD: ${jdId}`);
            res.status(201).json({
                message: 'Project created successfully!',
                test: finalTest,
                githubRepository: repoUrl,
            });
        }
        catch (error) {
            console.error(`[${new Date().toISOString()}] Error generating project for JD ${jdId}:`, {
                message: error === null || error === void 0 ? void 0 : error.message,
                stack: error === null || error === void 0 ? void 0 : error.stack,
                name: error === null || error === void 0 ? void 0 : error.name,
                response: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data,
            });
            // Clean up preliminary test if it was created
            try {
                if (jdId) {
                    const existingTest = await prismaClient_1.prisma.test.findFirst({
                        where: {
                            jobDescriptionId: jdId,
                            title: { contains: 'Generating test for' }
                        }
                    });
                    if (existingTest) {
                        await prismaClient_1.prisma.test.delete({ where: { id: existingTest.id } });
                        console.log('Cleaned up preliminary test record');
                    }
                }
            }
            catch (cleanupError) {
                console.error('Error cleaning up preliminary test:', cleanupError);
            }
            // Provide more specific error messages
            if ((_b = error === null || error === void 0 ? void 0 : error.message) === null || _b === void 0 ? void 0 : _b.includes('GitHub')) {
                return res.status(500).json({ error: 'Failed to create GitHub repository. Please check GitHub configuration.' });
            }
            else if (((_c = error === null || error === void 0 ? void 0 : error.message) === null || _c === void 0 ? void 0 : _c.includes('Gemini')) || ((_d = error === null || error === void 0 ? void 0 : error.message) === null || _d === void 0 ? void 0 : _d.includes('AI'))) {
                return res.status(500).json({ error: 'Failed to generate project with AI. Please try again.' });
            }
            else if (((_e = error === null || error === void 0 ? void 0 : error.message) === null || _e === void 0 ? void 0 : _e.includes('Database')) || ((_f = error === null || error === void 0 ? void 0 : error.message) === null || _f === void 0 ? void 0 : _f.includes('Prisma'))) {
                return res.status(500).json({ error: 'Database error occurred. Please try again.' });
            }
            else {
                return res.status(500).json({ error: 'Failed to generate project. Please try again.' });
            }
        }
    },
    /**
     * Create individual candidate repositories with CI/CD workflows and GitHub Issues
     */
    async createCandidateRepositories(req, res) {
        var _a, _b, _c, _d, _e, _f, _g;
        const { candidateIds } = req.body;
        const { jdId } = req.params;
        const user = req.user;
        console.log(`[${new Date().toISOString()}] Starting candidate repo creation for JD: ${jdId}, Candidates: ${candidateIds === null || candidateIds === void 0 ? void 0 : candidateIds.length}`);
        if (!user) {
            console.error('Unauthorized access attempt to create candidate repositories');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
            return res.status(400).json({ error: 'Candidate IDs are required.' });
        }
        try {
            // 1. Fetch the Job Description and its test
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
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
            const candidates = await prismaClient_1.prisma.candidate.findMany({
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
            console.log(`Project template generated with ${((_a = projectTemplate.githubWorkflows) === null || _a === void 0 ? void 0 : _a.length) || 0} workflows and ${((_b = projectTemplate.githubIssues) === null || _b === void 0 ? void 0 : _b.length) || 0} issues`);
            // 4. Create individual repositories for each candidate
            const candidateRepos = [];
            for (const candidate of candidates) {
                try {
                    console.log(`Creating repository for candidate: ${candidate.id}`);
                    // Create individual repository with CI/CD and issues
                    const { repoUrl, cloneUrl } = await githubService.createCandidateRepo(jobDescription.test.id, candidate.id, projectTemplate.projectFiles, projectTemplate.githubWorkflows || [], projectTemplate.githubIssues || []);
                    candidateRepos.push({
                        candidateId: candidate.id,
                        email: candidate.resume.email,
                        repoUrl,
                        cloneUrl,
                    });
                    // Update candidate status to 'TestSent' and store repository URL
                    await prismaClient_1.prisma.candidate.update({
                        where: { id: candidate.id },
                        data: {
                            status: 'TestSent',
                            individualRepoUrl: repoUrl,
                            repoCreatedAt: new Date(),
                        },
                    });
                    console.log(`Repository created for candidate ${candidate.id}: ${repoUrl}`);
                }
                catch (candidateError) {
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
                    workflowsCount: ((_c = projectTemplate.githubWorkflows) === null || _c === void 0 ? void 0 : _c.length) || 0,
                    issuesCount: ((_d = projectTemplate.githubIssues) === null || _d === void 0 ? void 0 : _d.length) || 0,
                },
            });
        }
        catch (error) {
            console.error(`[${new Date().toISOString()}] Error creating candidate repositories:`, {
                message: error === null || error === void 0 ? void 0 : error.message,
                stack: error === null || error === void 0 ? void 0 : error.stack,
                name: error === null || error === void 0 ? void 0 : error.name,
            });
            // Provide specific error messages
            if ((_e = error === null || error === void 0 ? void 0 : error.message) === null || _e === void 0 ? void 0 : _e.includes('GitHub')) {
                return res.status(500).json({ error: 'Failed to create GitHub repositories. Please check GitHub configuration.' });
            }
            else if (((_f = error === null || error === void 0 ? void 0 : error.message) === null || _f === void 0 ? void 0 : _f.includes('Gemini')) || ((_g = error === null || error === void 0 ? void 0 : error.message) === null || _g === void 0 ? void 0 : _g.includes('AI'))) {
                return res.status(500).json({ error: 'Failed to generate project with AI. Please try again.' });
            }
            else {
                return res.status(500).json({ error: 'Failed to create candidate repositories. Please try again.' });
            }
        }
    },
};
