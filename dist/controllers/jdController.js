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
const emailService_1 = require("../services/emailService");
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
        var _a;
        console.log('jdController.getJds: START');
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const jds = await prismaClient_1.prisma.jobDescription.findMany({
                where: {
                    creatorId: userId
                },
                include: {
                    _count: {
                        select: { candidates: true },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            console.log(`jdController.getJds: END - Fetched ${jds.length} JDs for user ${userId}`);
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
        var _a;
        console.log('jdController.getJdById: START');
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            const jd = await prismaClient_1.prisma.jobDescription.findUnique({
                where: {
                    id,
                    creatorId: userId // Ensure user can only access their own JDs
                },
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
            const { email } = req.body; // Email is now optional since we extract it from resume
            const file = req.file;
            if (!jdId) {
                return res.status(400).json({ error: 'Job Description ID is required.' });
            }
            if (!file) {
                return res.status(400).json({ error: 'Resume file is required.' });
            }
            // Removed email validation since we extract it from the resume
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
            // Ensure we have an email from the analysis
            if (!analysis.candidateEmail && !email) {
                return res.status(400).json({
                    error: 'Unable to extract candidate email from resume. Please ensure the resume contains a valid email address.'
                });
            }
            // Create the resume record with analysis
            const resume = await prismaClient_1.prisma.resume.create({
                data: {
                    email: analysis.candidateEmail || email, // Prefer extracted email, fallback to provided email
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
        var _a, _b, _c;
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
            // Get the selected candidates – we need their resume + repo info
            const candidates = await prismaClient_1.prisma.candidate.findMany({
                where: {
                    id: { in: candidateIds },
                    jobDescriptionId: jdId,
                },
                include: {
                    resume: true,
                },
            });
            // Split into already-processed vs yet-to-process
            const candidatesToProcess = candidates.filter(c => !c.individualRepoUrl && c.status !== 'TestSent');
            const candidatesAlreadyProcessed = candidates.filter(c => c.individualRepoUrl || c.status === 'TestSent');
            console.log('Candidates list:', candidates.map(c => ({ id: c.id, email: c.resume.email, status: c.status, repo: c.individualRepoUrl })));
            console.log(`Total selected: ${candidates.length}. To process: ${candidatesToProcess.length}. Already have repos: ${candidatesAlreadyProcessed.length}`);
            if (candidatesToProcess.length === 0) {
                console.log('All selected candidates already have repositories – nothing to create.');
                return res.status(200).json({
                    message: 'All selected candidates already have repositories',
                    successful: 0,
                    failed: 0,
                    skipped: candidatesAlreadyProcessed.map(c => ({ candidateId: c.id, email: c.resume.email, reason: 'Repository already exists' }))
                });
            }
            // Generate fresh project template only once
            console.log('Getting existing project template from test record...');
            // Use the stored project template instead of regenerating
            let projectTemplate;
            try {
                // Reconstruct project template from stored data
                const testWithFiles = await prismaClient_1.prisma.test.findUnique({
                    where: { id: jobDescription.test.id },
                    include: {
                        testCases: true,
                        files: true,
                    },
                });
                if (testWithFiles && testWithFiles.files.length > 0) {
                    // Reconstruct the project template from database
                    projectTemplate = {
                        title: testWithFiles.title,
                        description: testWithFiles.description || '',
                        difficulty: testWithFiles.difficulty,
                        language: testWithFiles.language,
                        languages: testWithFiles.language.split(', ').filter(Boolean),
                        requirements: Array.isArray(testWithFiles.requirements) ? testWithFiles.requirements : [],
                        testCases: testWithFiles.testCases.map(tc => ({
                            input: tc.input,
                            expectedOutput: tc.expectedOutput,
                            description: tc.description,
                            category: tc.category,
                            difficulty: tc.difficulty,
                            points: tc.points,
                            verificationMethod: tc.verificationMethod,
                        })),
                        projectFiles: testWithFiles.files.map(file => ({
                            path: file.path,
                            content: file.content,
                        })),
                        githubWorkflows: [], // These are not stored separately in DB, will be empty
                        githubIssues: [], // These are not stored separately in DB, will be empty
                    };
                    console.log(`Using stored project template: ${projectTemplate.projectFiles.length} files, ${projectTemplate.testCases.length} test cases.`);
                }
                else {
                    throw new Error('No stored project template found');
                }
            }
            catch (error) {
                console.log('No stored project template found or error reconstructing, generating new one...', error);
                projectTemplate = await geminiService.generateProjectFromJd({
                    title: jobDescription.title,
                    description: jobDescription.description,
                    minExperience: jobDescription.minExperience,
                    maxExperience: jobDescription.maxExperience,
                    languages: jobDescription.languages,
                    projectContext: jobDescription.projectContext,
                });
                console.log(`Project generated: ${projectTemplate.projectFiles.length} files, ${((_b = projectTemplate.githubWorkflows) === null || _b === void 0 ? void 0 : _b.length) || 0} workflows, ${((_c = projectTemplate.githubIssues) === null || _c === void 0 ? void 0 : _c.length) || 0} issues.`);
            }
            // Results containers
            const candidateResults = [];
            // Loop only over candidates that need repos
            for (const candidate of candidatesToProcess) {
                try {
                    // Check if another candidate with the same email already has a repo for this JD (idempotency guard)
                    const existingRepoHolder = await prismaClient_1.prisma.candidate.findFirst({
                        where: {
                            jobDescriptionId: jdId,
                            individualRepoUrl: { not: null },
                            resume: {
                                email: candidate.resume.email,
                            },
                        },
                        select: {
                            individualRepoUrl: true,
                            id: true,
                        },
                    });
                    if (existingRepoHolder && existingRepoHolder.individualRepoUrl) {
                        console.log(`ℹ️  Re-using existing repository for ${candidate.resume.email} (created for candidate ${existingRepoHolder.id}).`);
                        await prismaClient_1.prisma.candidate.update({
                            where: { id: candidate.id },
                            data: {
                                status: 'TestSent',
                                individualRepoUrl: existingRepoHolder.individualRepoUrl,
                                repoCreatedAt: new Date(),
                            },
                        });
                        candidateResults.push({
                            candidateId: candidate.id,
                            email: candidate.resume.email,
                            repoUrl: existingRepoHolder.individualRepoUrl,
                            success: true,
                            error: 'Re-used existing repository',
                        });
                        continue; // Skip new repo creation
                    }
                    console.log(`Creating repository for candidate ${candidate.id} – ${candidate.resume.email}`);
                    const { repoUrl } = await githubService.createCandidateRepo(jobDescription.test.id, candidate.id, projectTemplate.projectFiles, projectTemplate.githubWorkflows || [], projectTemplate.githubIssues || []);
                    // Persist repo URL & status in DB
                    await prismaClient_1.prisma.candidate.update({
                        where: { id: candidate.id },
                        data: {
                            status: 'TestSent',
                            individualRepoUrl: repoUrl,
                            repoCreatedAt: new Date(),
                        },
                    });
                    candidateResults.push({
                        candidateId: candidate.id,
                        email: candidate.resume.email,
                        repoUrl,
                        success: true,
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
            // Combine skipped candidates into candidateResults
            for (const skipped of candidatesAlreadyProcessed) {
                candidateResults.push({
                    candidateId: skipped.id,
                    email: skipped.resume.email,
                    repoUrl: skipped.individualRepoUrl || '',
                    success: true,
                    error: 'Repository already existed – skipped creation',
                });
            }
            const successfulRepos = candidateResults.filter(r => r.success && r.repoUrl);
            const failedRepos = candidateResults.filter(r => !r.success);
            console.log(`Repo creation: ${successfulRepos.length} successful, ${failedRepos.length} failed, ${candidatesAlreadyProcessed.length} skipped.`);
            // Send emails only for newly-created repos and if email is enabled
            if (successfulRepos.length > 0) {
                console.log('Sending repository links via email…');
                const emailData = successfulRepos.map(result => {
                    var _a;
                    return ({
                        email: result.email,
                        candidateName: result.email.split('@')[0],
                        jobTitle: jobDescription.title,
                        repositoryUrl: result.repoUrl,
                        companyName: process.env.COMPANY_NAME || undefined,
                        testUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/test/${(_a = jobDescription.test) === null || _a === void 0 ? void 0 : _a.id}`,
                    });
                });
                try {
                    const emailResults = await emailService_1.emailService.sendBulkRepositoryLinks(emailData);
                    console.log(`Email dispatch finished: ${emailResults.successful} successful, ${emailResults.failed} failed.`);
                }
                catch (emailError) {
                    console.error('Bulk email sending failed:', emailError);
                }
            }
            else {
                console.log('No new repositories created – skipping email dispatch.');
            }
            return res.status(200).json({
                message: `Repositories processed – ${successfulRepos.length} created, ${candidatesAlreadyProcessed.length} skipped, ${failedRepos.length} failed`,
                successful: successfulRepos.length,
                failed: failedRepos.length,
                skipped: candidatesAlreadyProcessed.length,
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
            });
        }
        catch (error) {
            console.error('jdController.sendTestsToCandiidates: ERROR sending tests:', error);
            res.status(500).json({ error: 'Failed to create individual repositories for candidates' });
        }
    },
    /**
     * Get real-time assessment tracking data for a Job Description
     */
    async getAssessmentTracking(req, res) {
        var _a;
        const { id: jdId } = req.params;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            console.log(`[Assessment Tracking] Fetching tracking data for JD: ${jdId}`);
            // Get the Job Description with all related data
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
                where: { id: jdId },
                include: {
                    test: {
                        include: {
                            submissions: {
                                include: {
                                    user: true
                                }
                            },
                            submissionEvents: {
                                include: {
                                    candidate: {
                                        include: {
                                            resume: true
                                        }
                                    }
                                },
                                orderBy: {
                                    receivedAt: 'desc'
                                }
                            }
                        }
                    },
                    candidates: {
                        include: {
                            resume: true,
                            submissionEvents: {
                                orderBy: {
                                    receivedAt: 'desc'
                                }
                            }
                        }
                    }
                }
            });
            if (!jobDescription) {
                return res.status(404).json({ error: 'Job Description not found.' });
            }
            // Calculate real-time tracking metrics
            const trackingData = {
                overview: {
                    totalCandidates: jobDescription.candidates.length,
                    testsSent: jobDescription.candidates.filter(c => c.status === 'TestSent' || c.status === 'InProgress' || c.status === 'Completed').length,
                    inProgress: jobDescription.candidates.filter(c => c.status === 'InProgress').length,
                    completed: jobDescription.candidates.filter(c => c.status === 'Completed').length,
                    avgSuitabilityScore: jobDescription.candidates.reduce((sum, c) => sum + (c.suitabilityScore || 0), 0) / jobDescription.candidates.length || 0
                },
                candidates: jobDescription.candidates.map(candidate => {
                    // Get latest activity from submission events
                    const latestEvent = candidate.submissionEvents[0];
                    const totalEvents = candidate.submissionEvents.length;
                    const pushEvents = candidate.submissionEvents.filter(e => e.eventType === 'push').length;
                    const workflowEvents = candidate.submissionEvents.filter(e => e.eventType.startsWith('workflow_')).length;
                    const lastActivityAt = (latestEvent === null || latestEvent === void 0 ? void 0 : latestEvent.receivedAt) || candidate.updatedAt;
                    // Calculate progress percentage based on activity
                    let progressPercentage = 0;
                    if (candidate.status === 'TestSent') {
                        progressPercentage = 10; // Just sent
                    }
                    else if (candidate.status === 'InProgress') {
                        // Base progress of 25% for starting, plus additional based on activity
                        progressPercentage = 25 + Math.min(50, pushEvents * 10); // Up to 75% for activity
                    }
                    else if (candidate.status === 'Completed') {
                        progressPercentage = 100;
                    }
                    return {
                        id: candidate.id,
                        email: candidate.resume.email,
                        status: candidate.status,
                        suitabilityScore: candidate.suitabilityScore,
                        progressPercentage,
                        activity: {
                            totalEvents,
                            pushEvents,
                            workflowEvents,
                            lastActivityAt,
                            timeElapsed: lastActivityAt ? Date.now() - new Date(lastActivityAt).getTime() : null
                        },
                        timeline: candidate.submissionEvents.slice(0, 10).map(event => ({
                            type: event.eventType,
                            timestamp: event.receivedAt,
                            details: {
                                repoName: event.repoName,
                                branch: event.branch,
                                pusher: event.pusher
                            }
                        }))
                    };
                }),
                recentActivity: ((_a = jobDescription.test) === null || _a === void 0 ? void 0 : _a.submissionEvents.slice(0, 20).map(event => {
                    var _a, _b;
                    return ({
                        type: event.eventType,
                        timestamp: event.receivedAt,
                        candidate: event.candidate ? {
                            id: event.candidate.id,
                            email: ((_a = event.candidate.resume) === null || _a === void 0 ? void 0 : _a.email) || 'Unknown'
                        } : null,
                        details: {
                            repoName: event.repoName,
                            branch: event.branch,
                            pusher: event.pusher,
                            commitSha: ((_b = event.commitSha) === null || _b === void 0 ? void 0 : _b.substring(0, 7)) || 'N/A'
                        }
                    });
                })) || []
            };
            console.log(`[Assessment Tracking] Returning tracking data for ${trackingData.overview.totalCandidates} candidates`);
            res.json(trackingData);
        }
        catch (error) {
            console.error('[Assessment Tracking] Error fetching tracking data:', error);
            res.status(500).json({ error: 'Failed to fetch assessment tracking data' });
        }
    },
    /**
     * Get detailed candidate assessment data
     */
    async getCandidateAssessmentDetails(req, res) {
        var _a, _b, _c;
        const { candidateId } = req.params;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            console.log(`[Candidate Assessment] Fetching details for candidate: ${candidateId}`);
            const candidate = await prismaClient_1.prisma.candidate.findUnique({
                where: { id: candidateId },
                include: {
                    resume: true,
                    jobDescription: {
                        include: {
                            test: {
                                include: {
                                    submissions: {
                                        where: {
                                        // Find submissions that might be related to this candidate
                                        // Since submissions don't directly link to candidates, we'll get all and filter
                                        },
                                        orderBy: {
                                            createdAt: 'desc'
                                        }
                                    },
                                    testCases: true
                                }
                            }
                        }
                    },
                    submissionEvents: {
                        orderBy: {
                            receivedAt: 'desc'
                        }
                    }
                }
            });
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }
            // Find repository name pattern for this candidate
            const candidateIdPrefix = candidate.id.split('-')[0];
            const testIdPrefix = ((_a = candidate.jobDescription.test) === null || _a === void 0 ? void 0 : _a.id.substring(0, 8)) || '';
            // Get CI/CD results from submissions (40% component)
            const cicdSubmission = (_b = candidate.jobDescription.test) === null || _b === void 0 ? void 0 : _b.submissions.find(s => s.result &&
                typeof s.result === 'object' &&
                'repoName' in s.result &&
                typeof s.result.repoName === 'string' &&
                s.result.repoName.includes(candidateIdPrefix));
            // Type-safe access to submission result
            const submissionResult = cicdSubmission === null || cicdSubmission === void 0 ? void 0 : cicdSubmission.result;
            // Calculate assessment metrics
            const assessmentDetails = {
                candidate: {
                    id: candidate.id,
                    email: candidate.resume.email,
                    status: candidate.status,
                    suitabilityScore: candidate.suitabilityScore,
                    suitabilityAnalysis: candidate.suitabilityAnalysis
                },
                progress: {
                    currentPhase: candidate.status,
                    timeElapsed: Date.now() - new Date(candidate.createdAt).getTime(),
                    lastActivity: ((_c = candidate.submissionEvents[0]) === null || _c === void 0 ? void 0 : _c.receivedAt) || candidate.updatedAt
                },
                scores: {
                    resumeScore: candidate.suitabilityScore || 0, // Initial resume score
                    cicdScore: (submissionResult === null || submissionResult === void 0 ? void 0 : submissionResult.cicdScore) || null, // 40% component
                    llmScore: (submissionResult === null || submissionResult === void 0 ? void 0 : submissionResult.llmScore) || null, // 60% component (to be implemented)
                    totalScore: (submissionResult === null || submissionResult === void 0 ? void 0 : submissionResult.totalScore) || null // Combined score
                },
                activity: {
                    totalEvents: candidate.submissionEvents.length,
                    eventBreakdown: candidate.submissionEvents.reduce((acc, event) => {
                        acc[event.eventType] = (acc[event.eventType] || 0) + 1;
                        return acc;
                    }, {}),
                    timeline: candidate.submissionEvents.map(event => {
                        var _a;
                        return ({
                            type: event.eventType,
                            timestamp: event.receivedAt,
                            details: {
                                repoName: event.repoName,
                                branch: event.branch,
                                pusher: event.pusher,
                                commitSha: ((_a = event.commitSha) === null || _a === void 0 ? void 0 : _a.substring(0, 7)) || 'N/A'
                            }
                        });
                    })
                },
                testResults: cicdSubmission ? {
                    status: cicdSubmission.status,
                    submittedAt: cicdSubmission.createdAt,
                    results: cicdSubmission.result
                } : null
            };
            console.log(`[Candidate Assessment] Returning details for candidate: ${candidate.resume.email}`);
            res.json(assessmentDetails);
        }
        catch (error) {
            console.error('[Candidate Assessment] Error fetching candidate details:', error);
            res.status(500).json({ error: 'Failed to fetch candidate assessment details' });
        }
    },
    /**
     * Get final assessment results for completed candidates (Milestone 9.7)
     */
    async getFinalAssessmentResults(req, res) {
        const { id: jdId } = req.params;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            console.log(`[Final Assessment] Fetching results for JD: ${jdId}`);
            const jobDescription = await prismaClient_1.prisma.jobDescription.findUnique({
                where: { id: jdId },
                include: {
                    test: {
                        include: {
                            submissions: {
                                where: {
                                    status: 'completed',
                                    aiScore: { not: null }
                                },
                                include: {
                                    user: true
                                },
                                orderBy: {
                                    aiScore: 'desc' // Order by highest score first
                                }
                            }
                        }
                    },
                    candidates: {
                        where: {
                            status: 'Completed'
                        },
                        include: {
                            resume: true
                        }
                    }
                }
            });
            if (!jobDescription) {
                return res.status(404).json({ error: 'Job Description not found.' });
            }
            // Process assessment results for each completed candidate
            const assessmentResults = await Promise.all(jobDescription.candidates.map(async (candidate) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                // Find the corresponding submission with AI evaluation
                const submission = (_a = jobDescription.test) === null || _a === void 0 ? void 0 : _a.submissions.find(s => {
                    var _a;
                    const submissionResult = s.result;
                    return (_a = submissionResult === null || submissionResult === void 0 ? void 0 : submissionResult.repoName) === null || _a === void 0 ? void 0 : _a.includes(candidate.id.split('-')[0]);
                });
                if (!submission || !submission.result) {
                    return {
                        candidate: {
                            id: candidate.id,
                            email: candidate.resume.email,
                            suitabilityScore: candidate.suitabilityScore
                        },
                        status: 'incomplete',
                        message: 'Assessment not completed'
                    };
                }
                const result = submission.result;
                const feedback = submission.feedback;
                return {
                    candidate: {
                        id: candidate.id,
                        email: candidate.resume.email,
                        suitabilityScore: candidate.suitabilityScore,
                        appliedAt: candidate.createdAt
                    },
                    assessment: {
                        finalScore: result.totalScore,
                        grade: result.grade,
                        recommendation: result.recommendation,
                        completedAt: submission.createdAt
                    },
                    scores: {
                        resume: candidate.suitabilityScore || 0,
                        cicd: result.cicdScore || 0,
                        llm: result.llmScore || 0,
                        total: result.totalScore || 0
                    },
                    breakdown: {
                        codeQuality: ((_c = (_b = result.llmEvaluation) === null || _b === void 0 ? void 0 : _b.breakdown) === null || _c === void 0 ? void 0 : _c.codeQuality) || null,
                        architecture: ((_e = (_d = result.llmEvaluation) === null || _d === void 0 ? void 0 : _d.breakdown) === null || _e === void 0 ? void 0 : _e.architecture) || null,
                        innovation: ((_g = (_f = result.llmEvaluation) === null || _f === void 0 ? void 0 : _f.breakdown) === null || _g === void 0 ? void 0 : _g.innovation) || null,
                        bestPractices: ((_j = (_h = result.llmEvaluation) === null || _h === void 0 ? void 0 : _h.breakdown) === null || _j === void 0 ? void 0 : _j.bestPractices) || null,
                        performance: ((_l = (_k = result.llmEvaluation) === null || _k === void 0 ? void 0 : _k.breakdown) === null || _l === void 0 ? void 0 : _l.performance) || null,
                        security: ((_o = (_m = result.llmEvaluation) === null || _m === void 0 ? void 0 : _m.breakdown) === null || _o === void 0 ? void 0 : _o.security) || null
                    },
                    feedback: {
                        summary: (feedback === null || feedback === void 0 ? void 0 : feedback.summary) || ((_p = result.finalAssessment) === null || _p === void 0 ? void 0 : _p.summary),
                        strengths: (feedback === null || feedback === void 0 ? void 0 : feedback.strengths) || ((_q = result.llmEvaluation) === null || _q === void 0 ? void 0 : _q.strengths) || [],
                        improvements: (feedback === null || feedback === void 0 ? void 0 : feedback.improvements) || ((_r = result.llmEvaluation) === null || _r === void 0 ? void 0 : _r.improvements) || []
                    },
                    status: 'completed'
                };
            }));
            // Calculate summary statistics
            const completedAssessments = assessmentResults.filter(r => r.status === 'completed' && r.scores && r.assessment);
            const avgScore = completedAssessments.reduce((sum, r) => { var _a; return sum + (((_a = r.scores) === null || _a === void 0 ? void 0 : _a.total) || 0); }, 0) / completedAssessments.length || 0;
            const gradeDistribution = completedAssessments.reduce((acc, r) => {
                var _a;
                const grade = (_a = r.assessment) === null || _a === void 0 ? void 0 : _a.grade;
                if (grade) {
                    acc[grade] = (acc[grade] || 0) + 1;
                }
                return acc;
            }, {});
            const results = {
                overview: {
                    position: jobDescription.title,
                    totalCandidates: jobDescription.candidates.length,
                    completedAssessments: completedAssessments.length,
                    averageScore: Math.round(avgScore * 10) / 10,
                    gradeDistribution,
                    assessmentDate: new Date().toISOString()
                },
                candidates: assessmentResults,
                topPerformers: completedAssessments
                    .filter(r => r.scores && r.assessment)
                    .sort((a, b) => { var _a, _b; return (((_a = b.scores) === null || _a === void 0 ? void 0 : _a.total) || 0) - (((_b = a.scores) === null || _b === void 0 ? void 0 : _b.total) || 0); })
                    .slice(0, 5), // Top 5 candidates
                insights: {
                    strongestArea: findStrongestArea(completedAssessments),
                    commonWeaknesses: findCommonWeaknesses(completedAssessments),
                    recommendedHires: completedAssessments.filter(r => { var _a, _b; return ((_a = r.assessment) === null || _a === void 0 ? void 0 : _a.recommendation) === 'Strong Hire' || ((_b = r.assessment) === null || _b === void 0 ? void 0 : _b.recommendation) === 'Hire'; }).length
                }
            };
            console.log(`[Final Assessment] Returning results for ${completedAssessments.length} completed assessments`);
            res.json(results);
        }
        catch (error) {
            console.error('[Final Assessment] Error fetching results:', error);
            res.status(500).json({ error: 'Failed to fetch final assessment results' });
        }
    },
    /**
     * Get all candidate repositories for a Job Description
     */
    async getCandidateRepositories(req, res) {
        var _a;
        console.log('jdController.getCandidateRepositories: START');
        try {
            const { id: jdId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // Get all candidates with repository information
            const candidates = await prismaClient_1.prisma.candidate.findMany({
                where: {
                    jobDescriptionId: jdId,
                    individualRepoUrl: { not: null }, // Only candidates with repositories
                },
                include: {
                    resume: true,
                    jobDescription: {
                        select: {
                            title: true,
                            test: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    repoCreatedAt: 'desc',
                },
            });
            const repositoryData = candidates.map(candidate => {
                var _a, _b, _c;
                return ({
                    candidateId: candidate.id,
                    email: candidate.resume.email,
                    repositoryUrl: candidate.individualRepoUrl,
                    repoCreatedAt: candidate.repoCreatedAt,
                    status: candidate.status,
                    suitabilityScore: candidate.suitabilityScore,
                    jobTitle: (_a = candidate.jobDescription) === null || _a === void 0 ? void 0 : _a.title,
                    testId: (_c = (_b = candidate.jobDescription) === null || _b === void 0 ? void 0 : _b.test) === null || _c === void 0 ? void 0 : _c.id,
                });
            });
            console.log(`Found ${repositoryData.length} candidate repositories for JD ${jdId}`);
            res.json({
                jobDescriptionId: jdId,
                repositories: repositoryData,
                total: repositoryData.length,
            });
        }
        catch (error) {
            console.error('jdController.getCandidateRepositories: ERROR:', error);
            res.status(500).json({ error: 'Failed to fetch candidate repositories' });
        }
    },
    /**
     * Archive repositories for completed assessments
     */
    async archiveRepositories(req, res) {
        var _a;
        console.log('jdController.archiveRepositories: START');
        try {
            const { id: jdId } = req.params;
            const { candidateIds } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (!candidateIds || !Array.isArray(candidateIds)) {
                return res.status(400).json({ error: 'Candidate IDs are required' });
            }
            // Get candidates with repository URLs
            const candidates = await prismaClient_1.prisma.candidate.findMany({
                where: {
                    id: { in: candidateIds },
                    jobDescriptionId: jdId,
                    individualRepoUrl: { not: null },
                },
            });
            const archivedRepos = [];
            const failedArchives = [];
            for (const candidate of candidates) {
                try {
                    // Update candidate status to indicate repository is archived
                    await prismaClient_1.prisma.candidate.update({
                        where: { id: candidate.id },
                        data: {
                            status: 'Archived',
                        },
                    });
                    archivedRepos.push({
                        candidateId: candidate.id,
                        repositoryUrl: candidate.individualRepoUrl,
                    });
                    console.log(`✅ Marked repository as archived for candidate ${candidate.id}`);
                }
                catch (archiveError) {
                    console.error(`❌ Failed to archive repository for candidate ${candidate.id}:`, archiveError);
                    failedArchives.push({
                        candidateId: candidate.id,
                        error: archiveError.message,
                    });
                }
            }
            res.json({
                message: `Archived ${archivedRepos.length}/${candidates.length} repositories`,
                archived: archivedRepos,
                failed: failedArchives,
            });
        }
        catch (error) {
            console.error('jdController.archiveRepositories: ERROR:', error);
            res.status(500).json({ error: 'Failed to archive repositories' });
        }
    },
    /**
     * Get repository status and metrics for a candidate
     */
    async getCandidateRepositoryStatus(req, res) {
        var _a;
        console.log('jdController.getCandidateRepositoryStatus: START');
        try {
            const { candidateId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // Get candidate with repository information and submission events
            const candidate = await prismaClient_1.prisma.candidate.findUnique({
                where: { id: candidateId },
                include: {
                    resume: true,
                    jobDescription: {
                        include: {
                            test: true,
                        },
                    },
                    submissionEvents: {
                        orderBy: {
                            receivedAt: 'desc',
                        },
                        take: 10, // Latest 10 events
                    },
                },
            });
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }
            if (!candidate.individualRepoUrl) {
                return res.status(404).json({ error: 'No repository found for this candidate' });
            }
            // Calculate metrics from submission events
            const totalEvents = candidate.submissionEvents.length;
            const pushEvents = candidate.submissionEvents.filter(e => e.eventType === 'push').length;
            const workflowEvents = candidate.submissionEvents.filter(e => e.eventType.includes('workflow')).length;
            const lastActivity = candidate.submissionEvents.length > 0
                ? candidate.submissionEvents[0].receivedAt
                : candidate.repoCreatedAt;
            const timeElapsed = lastActivity
                ? Math.floor((new Date().getTime() - new Date(lastActivity).getTime()) / (1000 * 60 * 60)) // hours
                : 0;
            res.json({
                candidateId: candidate.id,
                email: candidate.resume.email,
                repositoryUrl: candidate.individualRepoUrl,
                repoCreatedAt: candidate.repoCreatedAt,
                status: candidate.status,
                jobTitle: candidate.jobDescription.title,
                metrics: {
                    totalEvents,
                    pushEvents,
                    workflowEvents,
                    lastActivity,
                    hoursElapsed: timeElapsed,
                },
                recentActivity: candidate.submissionEvents.slice(0, 5), // Latest 5 events
            });
        }
        catch (error) {
            console.error('jdController.getCandidateRepositoryStatus: ERROR:', error);
            res.status(500).json({ error: 'Failed to fetch repository status' });
        }
    }
};
/**
 * Helper function to find the strongest technical area across candidates
 */
function findStrongestArea(assessments) {
    const areas = ['codeQuality', 'architecture', 'innovation', 'bestPractices', 'performance', 'security'];
    const areaAverages = areas.map(area => {
        const scores = assessments
            .map(a => { var _a; return ((_a = a.breakdown[area]) === null || _a === void 0 ? void 0 : _a.score) || 0; })
            .filter(score => score > 0);
        const average = scores.reduce((sum, score) => sum + score, 0) / scores.length || 0;
        return { area, average };
    });
    const strongest = areaAverages.reduce((max, current) => current.average > max.average ? current : max);
    return strongest.area;
}
/**
 * Helper function to find common weaknesses across candidates
 */
function findCommonWeaknesses(assessments) {
    const allImprovements = assessments.flatMap(a => a.feedback.improvements || []);
    const improvementCounts = {};
    allImprovements.forEach(improvement => {
        // Simple keyword matching for common themes
        const keywords = ['error handling', 'testing', 'documentation', 'security', 'performance', 'architecture'];
        keywords.forEach(keyword => {
            if (improvement.toLowerCase().includes(keyword)) {
                improvementCounts[keyword] = (improvementCounts[keyword] || 0) + 1;
            }
        });
    });
    return Object.entries(improvementCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([keyword]) => keyword);
}
