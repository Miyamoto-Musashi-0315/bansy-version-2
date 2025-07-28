"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jdController = void 0;
const prismaClient_1 = require("../prismaClient");
const geminiService_1 = require("../services/ai/geminiService");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const fs_1 = __importDefault(require("fs"));
const githubService_1 = __importDefault(require("../services/githubService"));
const config_1 = require("../config");
// Initialize AI service
const geminiService = new geminiService_1.GeminiService();
// Map the orgName from config to the expected organizationName for the service
const githubConfig = {
    ...config_1.config.github,
    organizationName: config_1.config.github.orgName,
};
const githubService = new githubService_1.default(githubConfig);
exports.jdController = {
    /**
     * Creates a new Job Description
     */
    async createJd(req, res) {
        var _a;
        console.log('jdController.createJd: START');
        try {
            const { title, description, minExperience, maxExperience, languages, projectContext, } = req.body;
            const creatorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!creatorId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (!title ||
                !description ||
                minExperience === undefined ||
                maxExperience === undefined ||
                !languages) {
                return res
                    .status(400)
                    .json({ error: 'All required fields must be provided.' });
            }
            const newJd = await prismaClient_1.prisma.jobDescription.create({
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
        }
        catch (error) {
            console.error('jdController.createJd: ERROR creating JD:', error);
            res.status(500).json({ error: 'Failed to create job description' });
        }
    },
    /**
     * Gets all Job Descriptions
     */
    async getJds(req, res) {
        console.log('jdController.getJds: START');
        try {
            const jds = await prismaClient_1.prisma.jobDescription.findMany({
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
        }
        catch (error) {
            console.error('jdController.getJds: ERROR fetching JDs:', error);
            res.status(500).json({ error: 'Failed to fetch job descriptions' });
        }
    },
    /**
     * Gets a single Job Description by ID
     */
    async getJdById(req, res) {
        console.log('jdController.getJdById: START');
        try {
            const { id } = req.params;
            const jd = await prismaClient_1.prisma.jobDescription.findUnique({
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
        }
        catch (error) {
            console.error('jdController.getJdById: ERROR fetching JD:', error);
            res.status(500).json({ error: 'Failed to fetch job description' });
        }
    },
    /**
     * Updates a Job Description by ID
     */
    async updateJd(req, res) {
        var _a;
        console.log('jdController.updateJd: START');
        try {
            const { id } = req.params;
            const { title, description, minExperience, maxExperience, languages, projectContext, } = req.body;
            const creatorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const existingJd = await prismaClient_1.prisma.jobDescription.findUnique({
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
            const updatedJd = await prismaClient_1.prisma.jobDescription.update({
                where: { id },
                data: {
                    title,
                    description,
                    minExperience: minExperience !== undefined
                        ? parseInt(minExperience, 10)
                        : undefined,
                    maxExperience: maxExperience !== undefined
                        ? parseInt(maxExperience, 10)
                        : undefined,
                    languages,
                    projectContext,
                },
            });
            console.log('jdController.updateJd: END - JD updated successfully');
            res.json(updatedJd);
        }
        catch (error) {
            console.error('jdController.updateJd: ERROR updating JD:', error);
            res.status(500).json({ error: 'Failed to update job description' });
        }
    },
    /**
     * Deletes a Job Description by ID
     */
    async deleteJd(req, res) {
        var _a;
        console.log('jdController.deleteJd: START');
        try {
            const { id } = req.params;
            const creatorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const existingJd = await prismaClient_1.prisma.jobDescription.findUnique({
                where: { id },
            });
            if (!existingJd) {
                return res.status(404).json({ error: 'Job description not found' });
            }
            if (existingJd.creatorId !== creatorId) {
                return res.status(403).json({ error: 'Forbidden: You can only delete your own job descriptions' });
            }
            await prismaClient_1.prisma.jobDescription.delete({
                where: { id },
            });
            console.log('jdController.deleteJd: END - JD deleted successfully');
            res.status(204).send();
        }
        catch (error) {
            console.error('jdController.deleteJd: ERROR deleting JD:', error);
            res.status(500).json({ error: 'Failed to delete job description' });
        }
    },
    /**
     * Uploads a resume for a specific Job Description
     */
    async uploadResumeForJd(req, res) {
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
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
                where: { id: jdId },
            });
            if (!jobDescription) {
                return res.status(404).json({ error: 'Job Description not found.' });
            }
            // Parse the resume PDF to extract text
            const fileBuffer = fs_1.default.readFileSync(file.path);
            const pdfData = await (0, pdf_parse_1.default)(fileBuffer);
            const resumeText = pdfData.text;
            // Analyze the resume against the JD using AI
            console.log('jdController.uploadResumeForJd: Starting AI analysis...');
            const analysis = await geminiService.analyzeResumeForJd(resumeText, jobDescription);
            console.log('jdController.uploadResumeForJd: AI analysis completed. Score:', analysis.suitabilityScore);
            // Create the resume record with analysis
            const resume = await prismaClient_1.prisma.resume.create({
                data: {
                    email: analysis.candidateEmail || email,
                    filename: file.originalname,
                    path: file.path || 'temporary-path',
                    size: file.size,
                    analysis: analysis,
                },
            });
            // Create the candidate record with suitability score
            const newCandidate = await prismaClient_1.prisma.candidate.create({
                data: {
                    status: 'PendingReview',
                    suitabilityScore: analysis.suitabilityScore,
                    suitabilityAnalysis: analysis.analysis,
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
        }
        catch (error) {
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
    async sendTestsToCandiidates(req, res) {
        var _a, _b, _c, _d, _e;
        console.log('jdController.sendTestsToCandiidates: START');
        try {
            const { id: jdId } = req.params;
            const { candidateIds } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
                return res.status(400).json({ error: 'Candidate IDs are required.' });
            }
            // Verify the JD exists and has a test
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
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
            // Create individual repositories with CI/CD workflows for each candidate
            console.log(`Creating individual repositories for ${candidates.length} candidates...`);
            // Generate fresh project template with CI/CD components
            const projectTemplate = await geminiService.generateProjectFromJd({
                title: jobDescription.title,
                description: jobDescription.description,
                minExperience: jobDescription.minExperience,
                maxExperience: jobDescription.maxExperience,
                languages: jobDescription.languages,
                projectContext: jobDescription.projectContext,
            });
            console.log(`Generated project with ${((_b = projectTemplate.githubWorkflows) === null || _b === void 0 ? void 0 : _b.length) || 0} workflows and ${((_c = projectTemplate.githubIssues) === null || _c === void 0 ? void 0 : _c.length) || 0} issues`);
            // Create individual repositories for each candidate
            const candidateResults = [];
            for (const candidate of candidates) {
                try {
                    console.log(`Creating repository for candidate: ${candidate.resume.email}`);
                    // Create individual repository with CI/CD and issues
                    const { repoUrl, cloneUrl } = await githubService.createCandidateRepo(jobDescription.test.id, candidate.id, projectTemplate.projectFiles, projectTemplate.githubWorkflows || [], projectTemplate.githubIssues || []);
                    candidateResults.push({
                        candidateId: candidate.id,
                        email: candidate.resume.email,
                        repoUrl,
                        success: true,
                    });
                    // Update candidate status to 'TestSent'
                    await prismaClient_1.prisma.candidate.update({
                        where: { id: candidate.id },
                        data: {
                            status: 'TestSent',
                        },
                    });
                    console.log(`✅ Repository created for ${candidate.resume.email}: ${repoUrl}`);
                }
                catch (candidateError) {
                    console.error(`❌ Failed to create repository for candidate ${candidate.id}:`, candidateError);
                    candidateResults.push({
                        candidateId: candidate.id,
                        email: candidate.resume.email,
                        repoUrl: '',
                        success: false,
                        error: candidateError.message,
                    });
                }
            }
            const successfulRepos = candidateResults.filter(r => r.success);
            const failedRepos = candidateResults.filter(r => !r.success);
            console.log(`jdController.sendTestsToCandiidates: END - ${successfulRepos.length} successful, ${failedRepos.length} failed`);
            // TODO: In a real application, you would send emails here with individual repository links
            console.log('Individual repository links would be sent to:');
            successfulRepos.forEach(result => {
                console.log(`- ${result.email}: ${result.repoUrl}`);
            });
            if (failedRepos.length > 0) {
                console.warn('Failed to create repositories for:');
                failedRepos.forEach(result => {
                    console.warn(`- ${result.email}: ${result.error}`);
                });
            }
            res.status(200).json({
                message: `Individual repositories created for ${successfulRepos.length}/${candidateResults.length} candidates`,
                successful: successfulRepos.length,
                failed: failedRepos.length,
                results: candidateResults.map(r => {
                    var _a;
                    return ({
                        candidateId: r.candidateId,
                        email: r.email,
                        testUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/test/${(_a = jobDescription.test) === null || _a === void 0 ? void 0 : _a.id}`,
                        githubRepository: r.repoUrl,
                        success: r.success,
                        error: r.error,
                    });
                }),
                projectInfo: {
                    title: projectTemplate.title,
                    difficulty: projectTemplate.difficulty,
                    cicdWorkflows: ((_d = projectTemplate.githubWorkflows) === null || _d === void 0 ? void 0 : _d.length) || 0,
                    githubIssues: ((_e = projectTemplate.githubIssues) === null || _e === void 0 ? void 0 : _e.length) || 0,
                },
            });
        }
        catch (error) {
            console.error('jdController.sendTestsToCandiidates: ERROR sending tests:', error);
            res.status(500).json({ error: 'Failed to create individual repositories for candidates' });
        }
    },
};
