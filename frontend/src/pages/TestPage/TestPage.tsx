import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Title, Paper, Alert, LoadingOverlay, Text, Badge, Group, Button } from '@mantine/core';
import { IconAlertCircle, IconPlayerPlay, IconUpload } from '@tabler/icons-react';
import { testService, Test } from '../../services/testService';

interface SubmissionState {
  submissionId: string;
  status: 'pending' | 'success' | 'failure';
  ciCdScore?: number;
  llmScore?: number;
  results?: Array<{
    testCase: number;
    passed: boolean;
    output?: string;
    error?: string;
  }>;
}

export function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState | null>(null);


  useEffect(() => {
    const fetchTest = async () => {
      try {
        if (!testId) return;
        setLoading(true);
        
        const data = await testService.getTest(testId);
        console.log('Fetched test data in TestPage:', data);
        setTest(data);

      } catch (err) {
        setError('Failed to load test data. Please try again.');
        console.error('Error in fetchTest:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  // Poll submission when pending
  useEffect(() => {
    if (!submission || submission.status !== 'pending') return;

    const id = setInterval(async () => {
      try {
        const latest = await testService.getSubmission(submission.submissionId);
        if (latest.status !== 'pending') {
          setSubmission({
            submissionId: latest.id ?? '',
            status: latest.status as any,
            ciCdScore: latest.ciCdScore,
            llmScore: latest.llmScore,
            results: latest.results,
          });
          clearInterval(id);
        }
      } catch (e) {
        console.error('Polling submission failed', e);
      }
    }, 15000);

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

      // Run the tests using the GitHub repository
      const results = await testService.runTests(testId);
      setSubmission({
        submissionId: 'local',
        status: results.status as any,
        results: results.results,
      });
    } catch (err: unknown) {
      console.error('Error running tests:', err);
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
      const res = await testService.submitSolution(testId, {});
      setSubmission({
        submissionId: res.submissionId ?? '',
        status: res.status,
      });
    } catch (err: unknown) {
      console.error('Error submitting solution:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to submit solution: ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) {
    return null; // Or loading spinner
  }

  return (
    <Container size="xl" py="xl" pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 2 }} />
      
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="lg">
          {error}
        </Alert>
      )}

      {submission && (
        <Alert 
          color={submission.status === 'success' ? 'green' : submission.status === 'pending' ? 'blue' : 'yellow'}
          mb="lg"
        >
          <Title order={4} mb="xs">
            {submission.status === 'pending' && 'Tests are running…'}
            {submission.status === 'success' && 'All Tests Passed!'}
            {submission.status === 'failure' && 'Some Tests Failed'}
          </Title>
          {submission.status === 'pending' && (
            <Text size="sm">Please wait while CI/CD completes. Refresh this page in a minute.</Text>
          )}
          {Array.isArray(submission.results) && submission.results.length > 0 && (
            submission.results.map((result, index) => (
              <Paper key={index} withBorder p="xs" mb="xs">
                <Group justify="space-between">
                  <Text>Test Case {result.testCase + 1}</Text>
                  <Badge color={result.passed ? 'green' : 'red'}>
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </Badge>
                </Group>
                {!result.passed && result.error && (
                  <Text c="red" size="sm" mt="xs">{result.error}</Text>
                )}
                {result.output && (
                  <Text size="sm" mt="xs" style={{ fontFamily: 'monospace' }}>
                    Output: {result.output}
                  </Text>
                )}
              </Paper>
            ))
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
          </Group>
        </Group>
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
