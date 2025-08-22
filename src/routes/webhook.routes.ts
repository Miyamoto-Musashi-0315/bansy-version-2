import { Router } from 'express';
import { prisma } from '../prismaClient';
import GithubService from '../services/githubService';
import { config } from '../config';

const router = Router();
const githubConfig = { ...config.github, organizationName: config.github.orgName };
const githubService = new GithubService(githubConfig);

// GitHub webhook handler for workflow completion events
router.post('/github', async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    const payload = req.body;
    
    console.log(`[webhook] Received GitHub event: ${event}`);
    
    // Handle workflow completion events
    if (event === 'workflow_run' && payload.action === 'completed') {
      const { repository, workflow_run } = payload;
      
      if (!repository || !workflow_run) {
        console.warn('[webhook] Invalid workflow_run payload');
        return res.status(400).send('Invalid payload');
      }
      
      const repoName = repository.name;
      const conclusion = workflow_run.conclusion;
      const status = workflow_run.status;
      
      console.log(`[webhook] Workflow run completed for ${repoName}: ${status}/${conclusion}`);
      
      // Find the test associated with this repository
      const test = await prisma.test.findFirst({
        where: {
          gitRepoUrl: {
            contains: repoName
          }
        }
      });
      
      if (!test) {
        console.log(`[webhook] No test found for repository: ${repoName}`);
        return res.status(200).send('No matching test found');
      }
      
      // Find the latest pending submission for this test
      const pendingSubmission = await prisma.submission.findFirst({
        where: {
          testId: test.id,
          status: 'pending'
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      if (!pendingSubmission) {
        console.log(`[webhook] No pending submission found for test: ${test.id}`);
        return res.status(200).send('No pending submission found');
      }
      
      // Fetch detailed test results
      console.log(`[webhook] Fetching test results for ${repoName}`);
      const testResults = await githubService.getLatestWorkflowTestResults(repoName);
      console.log(`[webhook] Found ${testResults.length} test results`);
      
      // Calculate pass/fail counts for logging
      const passedCount = testResults.filter(t => t.passed).length;
      const failedCount = testResults.length - passedCount;
      console.log(`[webhook] Tests summary: ${passedCount} passed, ${failedCount} failed`);
      
      // If no test results were found, create a default result
      let resultsToUse = testResults;
      if (testResults.length === 0) {
        console.log('[webhook] No test results found, creating default result');
        resultsToUse = [
          {
            testCase: 0,
            passed: false,
            title: 'CI/CD Pipeline Test',
            error: 'No detailed test results were found. This could be because:\n' +
                  '1. The workflow did not produce test results in the expected format\n' +
                  '2. Tests failed to run or crashed\n' +
                  '3. The repository structure may need adjustments\n\n' +
                  'Check your code for syntax errors or missing dependencies.',
            expected: 'All tests to pass',
            actual: 'Pipeline failed or results unavailable'
          }
        ];
      }
      
      // Log details of failed tests for debugging
      const failedTests = resultsToUse.filter(t => !t.passed);
      if (failedTests.length > 0) {
        console.log('[webhook] Failed tests:');
        failedTests.forEach((test) => {
          console.log(`  Test #${test.testCase + 1}: ${test.title || 'Unnamed test'}`);
          if (test.expected && test.actual) {
            console.log(`    Expected: ${test.expected}`);
            console.log(`    Actual: ${test.actual}`);
          }
          if (test.error) {
            console.log(`    Error: ${test.error.substring(0, 100)}${test.error.length > 100 ? '...' : ''}`);
          }
        });
      }
      
      // Update the submission with the results
      const finalStatus = conclusion === 'success' ? 'success' : 'failure';
      await prisma.submission.update({
        where: { id: pendingSubmission.id },
        data: {
          status: finalStatus,
          result: {
            status: finalStatus,
            ciCdScore: finalStatus === 'success' ? 40 : 0,
            results: resultsToUse.length > 0 ? resultsToUse : []
          } as any
        }
      });
      
      console.log(`[webhook] Updated submission ${pendingSubmission.id} with ${resultsToUse.length} test results`);
      return res.status(200).send('Submission updated');
    }
    
    return res.status(200).send('Event processed');
  } catch (error) {
    console.error('[webhook] Error processing webhook:', error);
    return res.status(500).send('Error processing webhook');
  }
});

export default router; 