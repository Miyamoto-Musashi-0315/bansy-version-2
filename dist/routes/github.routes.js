"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const githubService_1 = __importDefault(require("../services/githubService"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
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
    const event = req.headers['x-github-event'];
    const payload = req.body;
    try {
        switch (event) {
            case 'push':
                // Handle push event
                const repoName = payload.repository.name;
                const commitSha = await githubService.getLatestCommit(repoName);
                // TODO: Trigger test execution with the latest commit
                console.log(`New push to ${repoName}, commit: ${commitSha}`);
                break;
            case 'repository':
                if (payload.action === 'deleted') {
                    // Handle repository deletion
                    console.log(`Repository ${payload.repository.name} was deleted`);
                }
                break;
            default:
                console.log(`Received unhandled event: ${event}`);
        }
        res.json({ status: 'success' });
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Failed to process webhook' });
    }
});
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
