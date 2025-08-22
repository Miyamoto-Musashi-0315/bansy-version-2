import { Router } from 'express';
import { createHmac } from 'crypto';
import GithubService from '../services/githubService';
import { config } from '../config';
import { PrismaClient } from '@prisma/client';
import { triggerLLMEvaluation } from '../services/ai/evaluationService';

const router = Router();
const prisma = new PrismaClient();

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

  console.log(`[Webhook] Received ${event} event from ${payload.repository?.name || 'unknown repo'}`);

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
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});

/**
 * Handle push events - when candidates commit code to their repository
 */
async function handlePushEvent(payload: any) {
  const repoName = payload.repository.name;
  const commitSha = payload.head_commit?.id;
  const branch = payload.ref?.replace('refs/heads/', '');
  const pusher = payload.pusher?.name || 'unknown';

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
        testId = candidate.jobDescription.test?.id || null;
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
  } catch (error) {
    console.error('[Webhook] Error handling push event:', error);
  }
}

/**
 * Handle GitHub Actions workflow completion events
 */
async function handleWorkflowEvent(payload: any) {
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
          testId = candidate.jobDescription.test?.id || null;
        }
      }

      // Create submission event for workflow completion
      await prisma.submissionEvent.create({
        data: {
          repoName,
          commitSha: workflowRun.head_sha,
          branch: workflowRun.head_branch || 'main',
          pusher: workflowRun.triggering_actor?.login || 'system',
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

          // Try to fetch per-test results from workflow artifacts
          let detailedResults: Array<{ testCase: number; passed: boolean; title?: string; error?: string }> = [];
          try {
            detailedResults = await githubService.getLatestWorkflowTestResults(repoName);
            console.log(`[Webhook] Collected ${detailedResults.length} per-test results from artifacts`);
          } catch (artifactErr: any) {
            console.warn('[Webhook] Failed to fetch artifact results:', artifactErr?.message || artifactErr);
          }

          await prisma.submission.update({
            where: { id: pendingSubmission.id },
            data: {
              status: finalStatus,
              // Store minimal result object so the frontend can differentiate pass/fail
              result: {
                status: finalStatus,
                ciCdScore: finalStatus === 'success' ? 40 : 0,
                results: detailedResults
              } as any,
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
    } catch (error) {
      console.error('[Webhook] Error handling workflow event:', error);
    }
  }
}

/**
 * Handle GitHub Issues events (when CI/CD updates issue status)
 */
async function handleIssueEvent(payload: any) {
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
        pusher: issue.user?.login || 'system',
        eventType: `issue_${action}`,
        candidateId,
        testId: null, // Issues don't directly relate to test ID
      },
    });

    console.log(`[Webhook] Recorded issue event for ${repoName}: ${action}`);
  } catch (error) {
    console.error('[Webhook] Error handling issue event:', error);
  }
}

/**
 * Handle repository deletion events
 */
async function handleRepositoryDeletedEvent(payload: any) {
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
  } catch (error) {
    console.error('[Webhook] Error handling repository deletion:', error);
  }
}

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
