import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Title, Paper, Alert, LoadingOverlay, Text, Badge, Group, Button } from '@mantine/core';
import { IconAlertCircle, IconPlayerPlay, IconUpload, IconRefresh } from '@tabler/icons-react';
import { testService, Test } from '../../services/testService';

interface SubmissionState {
  submissionId: string;
  status: 'pending' | 'success' | 'failure' | 'completed' | 'failed';
  ciCdScore?: number;
  llmScore?: number;
  results?: Array<{
    testCase: number;
    passed: boolean;
    output?: string;
    error?: string;
    title?: string;
    expected?: string;
    actual?: string;
  }>;
}

function normalizeStatus(input: unknown): SubmissionState['status'] {
  const allowed: SubmissionState['status'][] = ['pending', 'success', 'failure', 'completed', 'failed'];
  if (typeof input === 'string' && (allowed as string[]).includes(input)) {
    return input as SubmissionState['status'];
  }
  return 'pending';
}

export function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        if (!testId) return;
        setLoading(true);
        console.log('[TestPage] Fetching test', testId);
        const data = await testService.getTest(testId);
        console.log('[TestPage] getTest result:', data);
        setTest(data);

        // NEW: fetch latest submission so page reflects CI state on reload
        console.log('[TestPage] Fetching latest submission for test', testId);
        const latest = await testService.getLatestSubmissionForTest(testId);
        console.log('[TestPage] latestSubmission:', latest);
        if (latest) {
          setSubmission({
            submissionId: latest.id ?? '',
            status: normalizeStatus(latest.status),
            ciCdScore: latest.ciCdScore,
            llmScore: latest.llmScore,
            results: latest.results,
          });
          setLastUpdated(new Date());
        }
      } catch (err) {
        setError('Failed to load test data. Please try again.');
        console.error('[TestPage] Error in fetchTest:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Poll submission when pending
  useEffect(() => {
    if (!submission || submission.status !== 'pending') return;

    console.log('[TestPage] Starting polling for submission', submission.submissionId);
    const id = setInterval(async () => {
      try {
        console.log('[TestPage] Polling submission', submission.submissionId);
        const latest = await testService.getSubmission(submission.submissionId);
        console.log('[TestPage] Polled submission result:', latest);
        const latestStatus = normalizeStatus(latest.status);
        if (latestStatus !== 'pending') {
          setSubmission({
            submissionId: latest.id ?? submission.submissionId,
            status: latestStatus,
            ciCdScore: latest.ciCdScore,
            llmScore: latest.llmScore,
            results: latest.results,
          });
          setLastUpdated(new Date());
          clearInterval(id);
        }
      } catch (e) {
        console.error('[TestPage] Polling submission failed', e);
      }
    }, 5000); // Reduced from 15000 to 5000 ms for more responsive updates

    return () => clearInterval(id);
  }, [submission]);

  // Function to handle running tests
  const handleRunTests = async () => {
    if (!testId) {
      setError('Test ID is missing');
      return;
    }

    try {
      setTestRunning(true);
      setError(null);
      console.log('[TestPage] Running tests for', testId);

      // Run the tests using the GitHub repository
      const results = await testService.runTests(testId);
      console.log('[TestPage] runTests result:', results);
      setSubmission({
        submissionId: 'local',
        status: normalizeStatus(results.status),
        results: results.results,
      });
      setLastUpdated(new Date());
    } catch (err: unknown) {
      console.error('[TestPage] Error running tests:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to run tests: ${message}`);
    } finally {
      setTestRunning(false);
    }
  };

  // Handle final submission
  const handleSubmitSolution = async () => {
    if (!testId) {
      setError('Test ID is missing');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      console.log('[TestPage] Submitting solution for', testId);
      const res = await testService.submitSolution(testId, {});
      console.log('[TestPage] submitSolution response:', res);
      setSubmission({
        submissionId: (res.submissionId || res.id || ''),
        status: normalizeStatus(res.status),
      });
    } catch (err: unknown) {
      console.error('[TestPage] Error submitting solution:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to submit solution: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to manually refresh the test and submission status
  const handleRefresh = async () => {
    if (!testId) return;
    
    setRefreshing(true);
    try {
      // Refresh test data
      const data = await testService.getTest(testId);
      setTest(data);
      
      // Refresh submission data if available
      if (submission?.submissionId) {
        const latest = await testService.getSubmission(submission.submissionId);
        const latestStatus = normalizeStatus(latest.status);
        setSubmission({
          submissionId: latest.id ?? submission.submissionId,
          status: latestStatus,
          ciCdScore: latest.ciCdScore,
          llmScore: latest.llmScore,
          results: latest.results,
        });
      } else {
        // Check if there's a latest submission
        const latest = await testService.getLatestSubmissionForTest(testId);
        if (latest) {
          setSubmission({
            submissionId: latest.id ?? '',
            status: normalizeStatus(latest.status),
            ciCdScore: latest.ciCdScore,
            llmScore: latest.llmScore,
            results: latest.results,
          });
        }
      }
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('[TestPage] Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  if (!test) {
    return null; // Or loading spinner
  }

  return (
    <Container size="xl" py="xl" pos="relative">
      <LoadingOverlay visible={loading || refreshing} zIndex={1000} overlayProps={{ blur: 2 }} />
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="lg">
          {error}
        </Alert>
      )}
      {submission && (
        <Alert 
          color={submission.status === 'success' || submission.status === 'completed' ? 'green' : submission.status === 'pending' ? 'blue' : 'yellow'}
          mb="lg"
        >
          <Title order={4} mb="xs">
            {submission.status === 'pending' && 'Tests are running…'}
            {(submission.status === 'success' || submission.status === 'completed') && 'All Tests Passed!'}
            {(submission.status === 'failure' || submission.status === 'failed') && 'Some Tests Failed'}
          </Title>
          {submission.status === 'pending' && (
            <>
              <Group mb="md">
                <LoadingOverlay visible={true} zIndex={1} overlayProps={{ blur: 2 }} />
                <Text size="sm">
                  Please wait while CI/CD completes. This may take up to 2 minutes.
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                The system is running your tests in a GitHub workflow. Results will appear automatically when completed.
                You can also refresh this page to check for updates.
              </Text>
            </>
          )}
          {Array.isArray(submission.results) && submission.results.length > 0 && (
            <>
              <Group mb="md">
                <Badge color="green" size="lg">
                  {submission.results.filter(r => r.passed).length} Passed
                </Badge>
                <Badge color="red" size="lg">
                  {submission.results.filter(r => !r.passed).length} Failed
                </Badge>
                <Badge color="blue" size="lg">
                  {submission.results.length} Total
                </Badge>
              </Group>
              
              <Paper withBorder p="md" mb="md" bg="rgba(0,0,0,0.03)">
                <Title order={5} mb="sm">Test Results Summary</Title>
                <Text size="sm">
                  {submission.results.filter(r => r.passed).length === submission.results.length ? 
                    'All tests passed successfully! Your code meets all the requirements.' : 
                    `${submission.results.filter(r => !r.passed).length} out of ${submission.results.length} tests failed. See details below.`
                  }
                </Text>
              </Paper>
              
              <Title order={5} mb="sm">Test Details</Title>
              {submission.results.map((result, index) => (
                <Paper key={index} withBorder p="xs" mb="xs">
                  <Group justify="space-between">
                    <Text>Test Case {result.testCase + 1}</Text>
                    <Badge color={result.passed ? 'green' : 'red'}>
                      {result.passed ? 'PASSED' : 'FAILED'}
                    </Badge>
                  </Group>
                  {result.title && (
                    <Text size="sm" fw={500} mt="xs">{result.title}</Text>
                  )}
                  {!result.passed && (
                    <>
                      {result.expected && result.actual && (
                        <Paper withBorder p="xs" mt="xs" style={{ backgroundColor: '#fff5f5' }}>
                          <Group gap="xs">
                            <Text size="sm" fw={500}>Expected:</Text>
                            <Text size="sm" style={{ fontFamily: 'monospace', backgroundColor: '#f8f8f8', padding: '2px 4px' }}>
                              {result.expected}
                            </Text>
                          </Group>
                          <Group gap="xs" mt="xs">
                            <Text size="sm" fw={500}>Actual:</Text>
                            <Text size="sm" style={{ fontFamily: 'monospace', backgroundColor: '#f8f8f8', padding: '2px 4px' }}>
                              {result.actual}
                            </Text>
                          </Group>
                        </Paper>
                      )}
                      {result.error && (
                        <Text c="red" size="sm" mt="xs" style={{ whiteSpace: 'pre-wrap' }}>
                          {result.error.length > 300 ? `${result.error.substring(0, 300)}...` : result.error}
                        </Text>
                      )}
                    </>
                  )}
                  {result.output && (
                    <Text size="sm" mt="xs" style={{ fontFamily: 'monospace' }}>
                      Output: {result.output}
                    </Text>
                  )}
                </Paper>
              ))}
            </>
          )}
        </Alert>
      )}

      <Paper withBorder p="md" mb="lg">
        <Group justify="space-between" mb="md">
          <Title order={2}>{test.title}</Title>
          <Group>
            <Button
              leftSection={<IconUpload size={18} />}
              color="blue"
              onClick={handleSubmitSolution}
              loading={submitting}
              disabled={!test.gitRepoUrl}
            >
              Submit Solution
            </Button>
            <Button
              leftSection={<IconPlayerPlay size={18} />}
              color="green"
              onClick={handleRunTests}
              loading={testRunning}
              disabled={!test.gitRepoUrl}
            >
              Run Tests
            </Button>
            <Button
              leftSection={<IconRefresh size={18} />}
              color="gray"
              onClick={handleRefresh}
              loading={refreshing}
              disabled={!testId}
            >
              Refresh
            </Button>
          </Group>
        </Group>
        {lastUpdated && (
          <Text size="xs" c="dimmed" mb="md" ta="right">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
        <Text mb="lg">{test.description}</Text>

        <Title order={4} mb="xs">Requirements</Title>
        <ul>
          {test.requirements?.requirements?.map((req, index) => (
            <li key={index}><Text>{req}</Text></li>
          )) || <Text color="dimmed">No requirements specified</Text>}
        </ul>

        {test.gitRepoUrl ? (
          <>
            <Title order={4} mt="lg" mb="xs">Git Repository</Title>
            <Paper withBorder p="md" mb="lg" style={{ backgroundColor: '#f8f9fa' }}>
              <Group justify="space-between" mb="xs">
                <Text fw={500}>Clone this repository to get started:</Text>
                <Badge color="blue">Git</Badge>
              </Group>
              <Text component="pre" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', margin: 0 }}>
                git clone {test.gitRepoUrl}
              </Text>
            </Paper>
          </>
        ) : (
          <Alert icon={<IconAlertCircle size="1rem" />} color="yellow" mt="lg">
            Git repository is being created. Please refresh the page in a few moments.
          </Alert>
        )}

        <Title order={4} mt="lg" mb="xs">Test Cases</Title>
        {test.testCases.map((testCase, index) => (
          <Paper key={index} withBorder p="sm" mb="xs">
            <Text fw={500}>Test {index + 1}: {testCase.description}</Text>
            {testCase.input && (
              <Text size="sm" mt="xs">Input: {testCase.input}</Text>
            )}
            <Text size="sm" mt="xs">Expected Output: {testCase.expectedOutput}</Text>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
