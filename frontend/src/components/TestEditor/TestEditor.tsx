import { useState } from 'react';
import { Box, Button, Group, Paper, Tabs, Alert, Text, Code, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { IconCode, IconTestPipe, IconPlayerPlay, IconAlertCircle, IconDownload, IconCopy, IconUpload } from '@tabler/icons-react';
import { testService } from '../../services/testService';

interface TestCase {
  id: string;
  description: string;
  input?: string;
  expectedOutput: string;
}

interface TestFile {
  id: string;
  path: string;
  content: string;
}

interface TestEditorProps {
  testCases: TestCase[];
  testId?: string;
  code?: string;
  files?: TestFile[];
}

export function TestEditor({
  testCases = [],
  testId,
  code = ''
}: TestEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('code');
  const [runningTests, setRunningTests] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{
    success: boolean;
    error?: string;
    results?: {
      passed: number;
      failed: number;
      tests: Array<{
        name: string;
        passed: boolean;
        output: string;
      }>;
    };
  } | null>(null);
  // NEW STATE FOR SUBMITTING
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Handle code copy
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Handle file download
  const handleDownload = async () => {
    if (!testId) {
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch(`/api/tests/${testId}/download`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-${testId}-files.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading files:', error);
    } finally {
      setDownloading(false);
    }
  };
  
  // Handle running tests
  const runTests = async () => {
    if (!testId) {
      setTestResults({
        success: false,
        error: 'No test ID provided'
      });
      return;
    }
    
    setRunningTests(true);
    
    try {
      const response = await fetch(`/api/tests/${testId}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      
      const data = await response.json();
      setTestResults({
        success: true,
        results: {
          passed: data.results.filter((r: { passed: boolean }) => r.passed).length,
          failed: data.results.filter((r: { passed: boolean }) => !r.passed).length,
          tests: data.results.map((r: { passed: boolean; output: string }, i: number) => ({
            name: testCases[i]?.description || `Test ${i + 1}`,
            passed: r.passed,
            output: r.output
          }))
        }
      });
    } catch (error) {
      console.error('Error running tests:', error);
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to run tests'
      });
    } finally {
      setRunningTests(false);
      setActiveTab('results');
    }
  };
  
  // NEW: Handle final submission (uses latest commit on GitHub)
  const submitSolution = async () => {
    if (!testId) {
      setTestResults({ success: false, error: 'No test ID provided' });
      return;
    }

    setSubmitting(true);
    try {
      const result = await testService.submitSolution(testId, {});
      setTestResults({
        success: result.status === 'success',
        results: {
          passed: result.results?.filter(r => r.passed).length ?? 0,
          failed: result.results?.filter(r => !r.passed).length ?? 0,
          tests: (result.results ?? []).map((r, i) => ({
            name: testCases[i]?.description || `Test ${i + 1}`,
            passed: r.passed,
            output: r.output || r.error || ''
          }))
        }
      });
    } catch (error) {
      console.error('Error submitting solution:', error);
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit solution'
      });
    } finally {
      setSubmitting(false);
      setActiveTab('results');
    }
  };
  
  return (
    <Box>
      <Group justify="space-between" mb="md">
        <Group>
          <Button
            variant="light"
            leftSection={<IconDownload size={16} />}
            onClick={handleDownload}
            loading={downloading}
          >
            Download Files
          </Button>
        </Group>
        <Group>
          <Button
            leftSection={<IconUpload size={16} />}
            color="blue"
            onClick={submitSolution}
            loading={submitting}
          >
            Submit Solution
          </Button>
        <Button
          leftSection={<IconPlayerPlay size={16} />}
          color="green"
          onClick={runTests}
          loading={runningTests}
        >
          Run Tests
        </Button>
        </Group>
      </Group>
      
      <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
        <Tabs.List>
          <Tabs.Tab value="code" leftSection={<IconCode size={14} />}>Code</Tabs.Tab>
          <Tabs.Tab value="tests" leftSection={<IconTestPipe size={14} />}>Tests</Tabs.Tab>
          <Tabs.Tab value="results" leftSection={<IconTestPipe size={14} />}>Results</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="code">
          <Paper withBorder p="md" style={{ height: '70vh', overflow: 'auto' }}>
            <Group justify="space-between" mb="xs">
              <Text size="sm" fw={500}>main.py</Text>
              <Tooltip label="Copy code">
                <ActionIcon variant="subtle" onClick={handleCopyCode}>
                  <IconCopy size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <Code block style={{ height: 'calc(100% - 40px)', backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
              {code}
            </Code>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="tests">
          <Paper withBorder p="md" style={{ height: '70vh', overflow: 'auto' }}>
            {testCases.map((test, index) => (
              <Paper key={test.id} withBorder p="md" mb="md">
                <Text fw={500} mb="xs">Test Case {index + 1}</Text>
                <Text size="sm" c="dimmed" mb="xs">{test.description}</Text>
                
                {test.input && (
                  <Box mb="xs">
                    <Text size="sm" fw={500}>Input:</Text>
                    <Code block>{test.input}</Code>
                  </Box>
                )}
                
                <Text size="sm" fw={500}>Expected Output:</Text>
                <Code block>{test.expectedOutput}</Code>
              </Paper>
            ))}
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="results">
          <Paper withBorder p="md" style={{ height: '70vh', overflow: 'auto' }}>
            {testResults ? (
              testResults.error ? (
                <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
                  {testResults.error}
                </Alert>
              ) : (
                <>
                  <Group mb="md">
                    <Text>
                      Passed: <Text span c="green" fw={500}>{testResults.results?.passed || 0}</Text>
                    </Text>
                    <Text>
                      Failed: <Text span c="red" fw={500}>{testResults.results?.failed || 0}</Text>
                    </Text>
                  </Group>
                  
                  {testResults.results?.tests.map((result, index) => (
                    <Paper key={index} withBorder p="md" mb="md">
                      <Group mb="xs">
                        <Text fw={500}>{result.name}</Text>
                        <Badge color={result.passed ? 'green' : 'red'}>
                          {result.passed ? 'PASSED' : 'FAILED'}
                        </Badge>
                      </Group>
                      <Code block>{result.output}</Code>
                    </Paper>
                  ))}
                </>
              )
            ) : (
              <Text c="dimmed" ta="center">Run tests to see results</Text>
            )}
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
