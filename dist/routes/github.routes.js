"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const githubService_1 = __importDefault(require("../services/githubService"));
const config_1 = require("../config");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// List installations
router.get('/installations', async (req, res) => {
    try {
        const installations = await githubService.listInstallations();
        console.log('Installations:', installations);
        res.json(installations);
    }
    catch (error) {
        console.error('Error listing installations:', error);
        res.status(500).json({ error: 'Failed to list installations' });
    }
});
// Test endpoint to debug GitHub permissions
router.get('/test-permissions', async (req, res) => {
    var _a;
    console.log('=== GitHub Permissions Debug Test ===');
    const results = {
        timestamp: new Date().toISOString(),
        config: {
            appId: config_1.config.github.appId,
            orgName: config_1.config.github.orgName,
            installationId: config_1.config.github.installationId,
            privateKeyFingerprint: config_1.config.github.privateKey ?
                require('crypto').createHash('sha256').update(config_1.config.github.privateKey).digest('hex').slice(0, 12) :
                'not-configured'
        },
        tests: {}
    };
    try {
        // Test 1: Health check
        results.tests.healthCheck = await githubService.healthCheck();
        // Test 2: Get detailed permission information
        results.tests.permissions = await githubService.getPermissionDetails();
        // Test 3: Try to create a test repository
        try {
            const testRepo = await githubService.createTemporaryRepo('permission-test', 'debug-user', []);
            results.tests.createRepo = {
                success: true,
                repoUrl: testRepo.repoUrl
            };
            // If successful, try to clean it up
            const repoName = testRepo.repoUrl.split('/').pop();
            if (repoName) {
                await githubService.cleanupRepository(repoName);
                results.tests.cleanupRepo = { success: true };
            }
        }
        catch (error) {
            results.tests.createRepo = {
                success: false,
                error: error.message,
                details: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error
            };
        }
        console.log('Permission test results:', JSON.stringify(results, null, 2));
        res.json(results);
    }
    catch (error) {
        console.error('Permission test error:', error);
        results.error = error.message;
        res.status(500).json(results);
    }
});
const githubService = new githubService_1.default({
    appId: config_1.config.github.appId,
    privateKey: config_1.config.github.privateKey,
    clientId: config_1.config.github.clientId,
    clientSecret: config_1.config.github.clientSecret,
    webhookSecret: config_1.config.github.webhookSecret,
    organizationName: config_1.config.github.orgName,
    installationId: config_1.config.github.installationId,
});
// Middleware to verify GitHub webhook signature
const verifyGithubWebhook = (req, res, next) => {
    const signature = req.headers['x-hub-signature-256'];
    const payload = JSON.stringify(req.body);
    if (!githubService.verifyWebhookSignature(payload, signature)) {
        return res.status(401).json({ error: 'Invalid webhook signature' });
    }
    next();
};
// Create temporary repository for a test
router.post('/repository/create', async (req, res) => {
    try {
        const { testId, userId, projectFiles } = req.body;
        if (!testId || !userId) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        const repo = await githubService.createTemporaryRepo(testId, userId, projectFiles || {});
        res.json(repo);
    }
    catch (error) {
        console.error('Error creating repository:', error);
        res.status(500).json({ error: 'Failed to create repository' });
    }
});
// Handle webhook events from GitHub
router.post('/webhook', verifyGithubWebhook, async (req, res) => {
    var _a;
    const event = req.headers['x-github-event'];
    const payload = req.body;
    console.log(`[Webhook] Received ${event} event from ${((_a = payload.repository) === null || _a === void 0 ? void 0 : _a.name) || 'unknown repo'}`);
    try {
        switch (event) {
            case 'push':
                // Handle push event - candidate committed new code
                await handlePushEvent(payload);
                break;
            case 'workflow_run':
                // Handle GitHub Actions workflow completion
                await handleWorkflowEvent(payload);
                break;
            case 'issues':
                // Handle issue events (e.g., when CI/CD updates issue status)
                await handleIssueEvent(payload);
                break;
            case 'repository':
                if (payload.action === 'deleted') {
                    await handleRepositoryDeletedEvent(payload);
                }
                break;
            default:
                console.log(`[Webhook] Unhandled event: ${event}`);
        }
        res.json({ status: 'success', event, processed: true });
    }
    catch (error) {
        console.error('[Webhook] Error processing webhook:', error);
        res.status(500).json({ error: 'Failed to process webhook' });
    }
});
/**
 * Handle push events - when candidates commit code to their repository
 */
async function handlePushEvent(payload) {
    var _a, _b, _c, _d;
    const repoName = payload.repository.name;
    const commitSha = (_a = payload.head_commit) === null || _a === void 0 ? void 0 : _a.id;
    const branch = (_b = payload.ref) === null || _b === void 0 ? void 0 : _b.replace('refs/heads/', '');
    const pusher = ((_c = payload.pusher) === null || _c === void 0 ? void 0 : _c.name) || 'unknown';
    console.log(`[Webhook] Processing push to ${repoName} on branch ${branch} by ${pusher}`);
    try {
        // Extract candidate and test info from repository name
        // Format: candidate-{candidateId}-test-{testId}-{timestamp}
        const repoMatch = repoName.match(/candidate-([^-]+)-test-([^-]+)-/);
        let candidateId = null;
        let testId = null;
        if (repoMatch) {
            candidateId = repoMatch[1];
            testId = repoMatch[2];
            // Find the full candidate ID and test ID from database
            const candidate = await prisma.candidate.findFirst({
                where: { id: { startsWith: candidateId } },
                include: { jobDescription: { include: { test: true } } }
            });
            if (candidate) {
                candidateId = candidate.id;
                testId = ((_d = candidate.jobDescription.test) === null || _d === void 0 ? void 0 : _d.id) || null;
            }
        }
        // Create submission event record
        await prisma.submissionEvent.create({
            data: {
                repoName,
                commitSha: commitSha || 'unknown',
                branch: branch || 'main',
                pusher,
                eventType: 'push',
                candidateId,
                testId,
            },
        });
        // Update candidate status if this is their first push
        if (candidateId) {
            const candidate = await prisma.candidate.findUnique({
                where: { id: candidateId }
            });
            if (candidate && candidate.status === 'TestSent') {
                await prisma.candidate.update({
                    where: { id: candidateId },
                    data: { status: 'InProgress' }
                });
                console.log(`[Webhook] Updated candidate ${candidateId} status to InProgress`);
            }
        }
        console.log(`[Webhook] Recorded push event for repo ${repoName}`);
    }
    catch (error) {
        console.error('[Webhook] Error handling push event:', error);
    }
}
/**
 * Handle GitHub Actions workflow completion events
 */
async function handleWorkflowEvent(payload) {
    var _a, _b;
    const repoName = payload.repository.name;
    const workflowRun = payload.workflow_run;
    const conclusion = workflowRun.conclusion; // success, failure, cancelled, etc.
    const status = workflowRun.status; // completed, in_progress, etc.
    console.log(`[Webhook] Workflow ${workflowRun.name} in ${repoName}: ${status} - ${conclusion}`);
    if (status === 'completed') {
        try {
            // Extract candidate info from repository name
            const repoMatch = repoName.match(/candidate-([^-]+)-test-([^-]+)-/);
            let candidateId = null;
            let testId = null;
            if (repoMatch) {
                candidateId = repoMatch[1];
                testId = repoMatch[2];
                // Find the full candidate ID and test ID from database
                const candidate = await prisma.candidate.findFirst({
                    where: { id: { startsWith: candidateId } },
                    include: { jobDescription: { include: { test: true } } }
                });
                if (candidate) {
                    candidateId = candidate.id;
                    testId = ((_a = candidate.jobDescription.test) === null || _a === void 0 ? void 0 : _a.id) || null;
                }
            }
            // Create submission event for workflow completion
            await prisma.submissionEvent.create({
                data: {
                    repoName,
                    commitSha: workflowRun.head_sha,
                    branch: workflowRun.head_branch || 'main',
                    pusher: ((_b = workflowRun.triggering_actor) === null || _b === void 0 ? void 0 : _b.login) || 'system',
                    eventType: `workflow_${conclusion}`,
                    candidateId,
                    testId,
                },
            });
            // NEW: Update latest pending submission record so the UI polling can reflect CI/CD completion
            if (testId) {
                const pendingSubmission = await prisma.submission.findFirst({
                    where: {
                        testId,
                        status: 'pending',
                    },
                    orderBy: { createdAt: 'desc' },
                });
                if (pendingSubmission) {
                    const finalStatus = conclusion === 'success' ? 'success' : 'failure';
                    await prisma.submission.update({
                        where: { id: pendingSubmission.id },
                        data: {
                            status: finalStatus,
                            // Store minimal result object so the frontend can differentiate pass/fail
                            result: {
                                status: finalStatus,
                                cicdScore: finalStatus === 'success' ? 40 : 0,
                            },
                        },
                    });
                    console.log(`[Webhook] Updated pending submission ${pendingSubmission.id} → ${finalStatus}`);
                }
            }
            // Run LLM evaluation for every completed workflow (pass or fail)
            if (testId && candidateId) {
                await triggerLLMEvaluation(candidateId, testId, repoName);
            }
            console.log(`[Webhook] Recorded workflow completion for ${repoName}: ${conclusion}`);
        }
        catch (error) {
            console.error('[Webhook] Error handling workflow event:', error);
        }
    }
}
/**
 * Handle GitHub Issues events (when CI/CD updates issue status)
 */
async function handleIssueEvent(payload) {
    var _a;
    const repoName = payload.repository.name;
    const action = payload.action; // opened, closed, edited, etc.
    const issue = payload.issue;
    console.log(`[Webhook] Issue ${action} in ${repoName}: ${issue.title}`);
    try {
        // Extract candidate info from repository name
        const repoMatch = repoName.match(/candidate-([^-]+)-test-([^-]+)-/);
        let candidateId = null;
        if (repoMatch) {
            candidateId = repoMatch[1];
            // Find the full candidate ID from database
            const candidate = await prisma.candidate.findFirst({
                where: { id: { startsWith: candidateId } }
            });
            if (candidate) {
                candidateId = candidate.id;
            }
        }
        // Create submission event for issue updates
        await prisma.submissionEvent.create({
            data: {
                repoName,
                commitSha: 'issue-event',
                branch: 'main',
                pusher: ((_a = issue.user) === null || _a === void 0 ? void 0 : _a.login) || 'system',
                eventType: `issue_${action}`,
                candidateId,
                testId: null, // Issues don't directly relate to test ID
            },
        });
        console.log(`[Webhook] Recorded issue event for ${repoName}: ${action}`);
    }
    catch (error) {
        console.error('[Webhook] Error handling issue event:', error);
    }
}
/**
 * Handle repository deletion events
 */
async function handleRepositoryDeletedEvent(payload) {
    const repoName = payload.repository.name;
    console.log(`[Webhook] Repository ${repoName} was deleted`);
    try {
        // Update test record to mark repository as archived/deleted
        const test = await prisma.test.findFirst({
            where: { gitRepoUrl: { contains: repoName } }
        });
        if (test) {
            await prisma.test.update({
                where: { id: test.id },
                data: {
                    repoArchived: true,
                    repoArchivedAt: new Date(),
                },
            });
            console.log(`[Webhook] Marked test ${test.id} repository as archived`);
        }
    }
    catch (error) {
        console.error('[Webhook] Error handling repository deletion:', error);
    }
}
/**
 * Trigger LLM evaluation for completed CI/CD assessment (60% scoring component)
 */
async function triggerLLMEvaluation(candidateId, testId, repoName) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    console.log(`[Webhook] Triggering LLM evaluation for candidate ${candidateId}, test ${testId}`);
    try {
        // Import required services
        const { GeminiService } = require('../services/ai/geminiService');
        const geminiService = new GeminiService();
        // Get candidate and test data
        const candidate = await prisma.candidate.findUnique({
            where: { id: candidateId },
            include: {
                resume: true,
                jobDescription: {
                    include: {
                        test: {
                            include: {
                                testCases: true
                            }
                        }
                    }
                }
            }
        });
        if (!candidate || !candidate.jobDescription.test) {
            console.log(`[Webhook] No candidate or test found for ID: ${candidateId}`);
            return;
        }
        console.log(`[Webhook] Starting LLM evaluation for ${candidate.resume.email}`);
        // Fetch repository contents using GitHub API
        const repoContents = await fetchRepositoryContents(repoName);
        // Get CI/CD results from latest submission
        const latestSubmission = await prisma.submission.findFirst({
            where: { testId },
            orderBy: { createdAt: 'desc' }
        });
        const cicdResults = latestSubmission === null || latestSubmission === void 0 ? void 0 : latestSubmission.result;
        // Derive CI/CD score (0 or 40) based on whether ALL test cases passed
        let cicdScore = 0;
        if (cicdResults) {
            const passedCount = ((_c = (_a = cicdResults.passed) !== null && _a !== void 0 ? _a : (_b = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _b === void 0 ? void 0 : _b.passed) !== null && _c !== void 0 ? _c : (Array.isArray((_d = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _d === void 0 ? void 0 : _d.results)
                ? cicdResults.testResults.results.filter((r) => r.passed).length
                : 0));
            const totalCount = ((_g = (_e = cicdResults.total) !== null && _e !== void 0 ? _e : (_f = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _f === void 0 ? void 0 : _f.total) !== null && _g !== void 0 ? _g : (Array.isArray((_h = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _h === void 0 ? void 0 : _h.results)
                ? cicdResults.testResults.results.length
                : 0));
            if (totalCount && passedCount === totalCount) {
                cicdScore = 40; // All tests passed
            }
            // Persist the computed score back onto the results object for reference
            cicdResults.cicdScore = cicdScore;
        }
        // Prepare data for LLM evaluation
        const repoData = {
            repoUrl: candidate.jobDescription.test.gitRepoUrl || '',
            repoName,
            files: repoContents,
            cicdResults: {
                passed: ((_k = (_j = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _j === void 0 ? void 0 : _j.results) === null || _k === void 0 ? void 0 : _k.filter((r) => r.passed).length) || 0,
                total: ((_m = (_l = cicdResults === null || cicdResults === void 0 ? void 0 : cicdResults.testResults) === null || _l === void 0 ? void 0 : _l.results) === null || _m === void 0 ? void 0 : _m.length) || 0,
                details: cicdResults
            }
        };
        const jobDescription = {
            title: candidate.jobDescription.title,
            description: candidate.jobDescription.description,
            languages: candidate.jobDescription.languages,
            minExperience: candidate.jobDescription.minExperience,
            maxExperience: candidate.jobDescription.maxExperience,
            projectContext: candidate.jobDescription.projectContext
        };
        // Run comprehensive LLM evaluation (60% component)
        console.log(`[Webhook] Running LLM code evaluation...`);
        const llmEvaluation = await geminiService.evaluateCodeRepository(repoData, jobDescription, candidate.jobDescription.test.testCases);
        console.log(`[Webhook] LLM evaluation completed. Score: ${llmEvaluation.totalScore}/60`);
        // Generate final hybrid assessment report (40% CI/CD + 60% LLM)
        console.log(`[Webhook] Generating final assessment report...`);
        const finalAssessment = await geminiService.generateFinalAssessment(cicdScore, llmEvaluation, {
            email: candidate.resume.email,
            suitabilityScore: candidate.suitabilityScore || 0,
            position: candidate.jobDescription.title
        });
        console.log(`[Webhook] Final assessment completed. Total score: ${finalAssessment.finalScore}/100, Grade: ${finalAssessment.grade}`);
        // Save comprehensive results to database
        await prisma.submission.create({
            data: {
                status: 'completed',
                result: {
                    // Hybrid scoring system (40% + 60%)
                    cicdScore,
                    llmScore: llmEvaluation.totalScore,
                    totalScore: finalAssessment.finalScore,
                    grade: finalAssessment.grade,
                    recommendation: finalAssessment.recommendation,
                    // Detailed breakdown
                    llmEvaluation,
                    finalAssessment,
                    // Metadata
                    timestamp: new Date().toISOString(),
                    repoName,
                    evaluationMethod: 'hybrid_cicd_llm'
                },
                testId,
                userId: null,
                aiScore: finalAssessment.finalScore,
                feedback: {
                    summary: finalAssessment.summary,
                    strengths: llmEvaluation.strengths,
                    improvements: llmEvaluation.improvements,
                    breakdown: llmEvaluation.breakdown
                }
            },
        });
        // Update candidate status to completed with final scores
        await prisma.candidate.update({
            where: { id: candidateId },
            data: {
                status: 'Completed',
                // Store assessment metadata in suitabilityAnalysis
                suitabilityAnalysis: {
                    ...candidate.suitabilityAnalysis,
                    technicalAssessment: {
                        finalScore: finalAssessment.finalScore,
                        grade: finalAssessment.grade,
                        recommendation: finalAssessment.recommendation,
                        completedAt: new Date().toISOString()
                    }
                }
            }
        });
        console.log(`[Webhook] ✅ Complete hybrid evaluation finished for ${candidate.resume.email}: ${finalAssessment.finalScore}/100 (${finalAssessment.grade})`);
    }
    catch (error) {
        console.error('[Webhook] Error in LLM evaluation:', error);
        // Create error submission record
        await prisma.submission.create({
            data: {
                status: 'failed',
                result: {
                    error: error instanceof Error ? error.message : 'Unknown error',
                    timestamp: new Date().toISOString(),
                    repoName,
                    evaluationMethod: 'hybrid_cicd_llm_failed'
                },
                testId,
                userId: null,
            },
        });
    }
}
/**
 * Fetch repository contents from GitHub
 */
async function fetchRepositoryContents(repoName) {
    try {
        console.log(`[Webhook] Fetching repository contents for: ${repoName}`);
        // We'll use the GitHub service to fetch repository contents
        const githubService = new (require('../services/githubService')).default({
            appId: process.env.GITHUB_APP_ID,
            privateKey: process.env.GITHUB_PRIVATE_KEY,
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
            organizationName: process.env.GITHUB_ORG_NAME,
            installationId: process.env.GITHUB_INSTALLATION_ID,
        });
        // Get repository contents (simplified - in production you'd want to recursively fetch all files)
        const contents = await githubService.getRepositoryContents(repoName);
        return contents;
    }
    catch (error) {
        console.error('[Webhook] Error fetching repository contents:', error);
        return []; // Return empty array if we can't fetch contents
    }
}
// Cleanup repository after test submission
router.post('/repository/:repoName/cleanup', async (req, res) => {
    try {
        const { repoName } = req.params;
        await githubService.cleanupRepository(repoName);
        res.json({ status: 'success' });
    }
    catch (error) {
        console.error('Error cleaning up repository:', error);
        res.status(500).json({ error: 'Failed to cleanup repository' });
    }
});
exports.default = router;
