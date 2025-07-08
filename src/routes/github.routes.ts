import { Router } from 'express';
import { createHmac } from 'crypto';
import GithubService from '../services/githubService';
import { config } from '../config';

const router = Router();

// List installations
router.get('/installations', async (req, res) => {
  try {
    const installations = await githubService.listInstallations();
    console.log('Installations:', installations);
    res.json(installations);
  } catch (error) {
    console.error('Error listing installations:', error);
    res.status(500).json({ error: 'Failed to list installations' });
  }
});

// Test endpoint to debug GitHub permissions
router.get('/test-permissions', async (req, res) => {
  console.log('=== GitHub Permissions Debug Test ===');
  
  const results: any = {
    timestamp: new Date().toISOString(),
    config: {
      appId: config.github.appId,
      orgName: config.github.orgName,
      installationId: config.github.installationId,
      privateKeyFingerprint: config.github.privateKey ? 
        require('crypto').createHash('sha256').update(config.github.privateKey).digest('hex').slice(0, 12) : 
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
      const testRepo = await githubService.createTemporaryRepo(
        'permission-test',
        'debug-user',
        []
      );
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
    } catch (error: any) {
      results.tests.createRepo = {
        success: false,
        error: error.message,
        details: error.response?.data || error
      };
    }
    
    console.log('Permission test results:', JSON.stringify(results, null, 2));
    res.json(results);
  } catch (error: any) {
    console.error('Permission test error:', error);
    results.error = error.message;
    res.status(500).json(results);
  }
});

const githubService = new GithubService({
  appId: config.github.appId,
  privateKey: config.github.privateKey,
  clientId: config.github.clientId,
  clientSecret: config.github.clientSecret,
  webhookSecret: config.github.webhookSecret,
  organizationName: config.github.orgName,
  installationId: config.github.installationId,
});

// Middleware to verify GitHub webhook signature
const verifyGithubWebhook = (req: any, res: any, next: any) => {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    console.error('Error cleaning up repository:', error);
    res.status(500).json({ error: 'Failed to cleanup repository' });
  }
});

export default router;
