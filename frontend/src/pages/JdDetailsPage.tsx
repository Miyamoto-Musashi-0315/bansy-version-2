import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Title, Text, Paper, Group, Button, Card, Badge, Alert, Modal, Stack, Checkbox, Tooltip } from '@mantine/core';
import { IconCode, IconCheck, IconSend, IconEye, IconChartBar, IconBrain } from '@tabler/icons-react';
import { getJdById, generateProjectForJd, sendTestsToCandiidates } from '../services/jdService';
import { JobDescription, Test } from '../types';
import { logger } from '../utils/logger';
import assessmentService from '../services/assessmentService';

const JdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [jd, setJd] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingProject, setGeneratingProject] = useState(false);
  const [projectGenerated, setProjectGenerated] = useState(false);
  const [sendingTests, setSendingTests] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [generatedProjectData, setGeneratedProjectData] = useState<{
    message: string;
    githubRepository: string;
    test: Test;
  } | null>(null);
  const [evaluatingCandidate, setEvaluatingCandidate] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchJd = async () => {
      try {
        setLoading(true);
        const data = await getJdById(id);
        setJd(data);
        setError(null);
      } catch (err) {
        logger.error('Failed to fetch JD details', err);
        setError('Failed to load job description details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJd();
  }, [id]);

  const handleGenerateProject = async () => {
    if (!id) return;

    setGeneratingProject(true);
    setError(null); // Clear any previous errors
    
    try {
      const result = await generateProjectForJd(id);
      setGeneratedProjectData(result);
      setProjectGenerated(true);
      logger.info('Project generated successfully', result);

      // Refresh JD details to include the newly generated test
      try {
        const updatedJd = await getJdById(id);
        setJd(updatedJd);
      } catch (refreshErr) {
        logger.error('Failed to refresh JD after project generation', refreshErr);
        // Don't show this error to the user since the project generation succeeded
      }
    } catch (err: unknown) {
      logger.error('Failed to generate project', err);
      
      // Check if it's a timeout error
      const error = err as { code?: string; message?: string };
      if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
        setError('Request timed out. The project may still be generating. Please refresh the page in a moment.');
        
        // Try to fetch the JD to see if the project was actually created
        try {
          const updatedJd = await getJdById(id);
          if (updatedJd.test) {
            // Project was actually created despite the timeout
            setJd(updatedJd);
            setGeneratedProjectData({
              message: 'Project created successfully!',
              test: updatedJd.test,
              githubRepository: updatedJd.test.gitRepoUrl || ''
            });
            setProjectGenerated(true);
            setError(null); // Clear the error since we recovered
          }
        } catch (fetchErr) {
          logger.error('Failed to check JD status after timeout', fetchErr);
        }
      } else {
        setError('Failed to generate project. Please try again.');
      }
    } finally {
      setGeneratingProject(false);
    }
  };

  const handleCandidateSelection = (candidateId: string, checked: boolean) => {
    const newSelection = new Set(selectedCandidates);
    if (checked) {
      newSelection.add(candidateId);
    } else {
      newSelection.delete(candidateId);
    }
    setSelectedCandidates(newSelection);
  };

  const handleSelectAll = () => {
    if (!jd?.candidates) return;
    
    const selectableCandidates = jd.candidates.filter(c => c.status !== 'TestSent');
    
    if (selectedCandidates.size === selectableCandidates.length && selectableCandidates.length > 0) {
      // Deselect all
      setSelectedCandidates(new Set());
    } else {
      // Select all selectable candidates
      setSelectedCandidates(new Set(selectableCandidates.map(c => c.id)));
    }
  };

  const handleSendTests = async () => {
    if (!jd?.test || selectedCandidates.size === 0) {
      setError('Please ensure a project is generated and candidates are selected.');
      return;
    }

    setSendingTests(true);
    try {
      const result = await sendTestsToCandiidates(jd.id, Array.from(selectedCandidates));
      
      logger.info('Tests sent successfully:', result);
      
      // Show success message with details
      alert(`${result.message}\n\nSent to:\n${result.sentTo.map(item => `• ${item.email}`).join('\n')}`);
      
      setSelectedCandidates(new Set()); // Clear selection
      
      // Refresh the JD data to show updated candidate statuses
      const refreshedJd = await getJdById(jd.id);
      setJd(refreshedJd);
      
    } catch (err) {
      logger.error('Failed to send tests', err);
      setError('Failed to send tests. Please try again.');
    } finally {
      setSendingTests(false);
    }
  };

  const handleTriggerEvaluation = async (candidateId: string, repoUrl: string) => {
    if (!repoUrl) {
      alert('No repository URL found for this candidate');
      return;
    }

    setEvaluatingCandidate(candidateId);
    try {
      await assessmentService.triggerLlmEvaluation(candidateId, repoUrl);
      alert('LLM evaluation triggered successfully. Check the assessment results page in a few minutes.');
    } catch (err) {
      logger.error('Failed to trigger LLM evaluation', err);
      alert('Failed to trigger LLM evaluation. Please try again later.');
    } finally {
      setEvaluatingCandidate(null);
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'gray';
    if (score >= 8) return 'teal';
    if (score >= 6) return 'yellow';
    return 'red';
  };

  if (loading) return <Container><Text>Loading...</Text></Container>;
  if (error) return <Container><Text color="red">{error}</Text></Container>;
  if (!jd) return <Container><Text>Job description not found.</Text></Container>;

  const selectableCandidates = jd.candidates?.filter(c => c.status !== 'TestSent') || [];

  return (
    <Container>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group justify="space-between" mb="lg">
          <Title order={2}>{jd.title}</Title>
          <Group>
            <Button
              leftSection={<IconCode size={16} />}
              onClick={handleGenerateProject}
              loading={generatingProject}
              disabled={generatingProject}
              color="blue"
            >
              {generatingProject ? 'Generating Project...' : jd.test ? 'Regenerate Project' : 'Generate Project'}
            </Button>
            
            {/* Show a note about long generation time */}
            {generatingProject && (
              <Text size="xs" c="dimmed" style={{ maxWidth: '300px' }}>
                Project generation may take up to 2 minutes. Please wait...
              </Text>
            )}
            <Button component={Link} to={`edit`}>
              Edit JD
            </Button>
          </Group>
        </Group>

        <Text size="sm" c="dimmed">Created on {new Date(jd.createdAt).toLocaleDateString()}</Text>

        <Card withBorder radius="md" mt="xl">
          <Title order={4}>Description</Title>
          <Text mt="sm">{jd.description}</Text>
        </Card>

        <Card withBorder radius="md" mt="md">
          <Title order={4}>Key Information</Title>
          <Group mt="sm">
            <Text fw={500}>Experience:</Text>
            <Text>{jd.minExperience} - {jd.maxExperience} years</Text>
          </Group>
          <Group mt="xs">
            <Text fw={500}>Languages:</Text>
            {jd.languages.map((lang) => (
              <Badge key={lang} variant="light">{lang}</Badge>
            ))}
          </Group>
          {jd.projectContext && (
            <>
              <Title order={5} mt="md">Project Context</Title>
              <Text mt="xs" style={{ whiteSpace: 'pre-wrap' }}>{jd.projectContext}</Text>
            </>
          )}
        </Card>

        {jd?.test && (
          <Paper withBorder p="md" radius="md" mb="lg">
            <Group justify="space-between">
              <div>
                <Title order={3}>Test Project</Title>
                <Text c="dimmed">Generated coding assessment for this job description</Text>
              </div>
              <Group>
                <Button
                  component={Link}
                  to={`/dashboard/jds/${id}/results`}
                  variant="outline"
                  leftSection={<IconChartBar size={16} />}
                >
                  View Assessment Results
                </Button>
                <Button
                  component={Link}
                  to={`/test/${jd.test.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  leftSection={<IconEye size={16} />}
                >
                  Test Page
                </Button>
              </Group>
            </Group>
            <Text mt="md">
              <strong>Title:</strong> {jd.test.title}
            </Text>
            {jd.test.description && (
              <Text mt="xs">
                <strong>Description:</strong> {jd.test.description}
              </Text>
            )}
            <Text mt="xs">
              <strong>Language:</strong> {jd.test.language}
            </Text>
            <Text mt="xs">
              <strong>Difficulty:</strong> {jd.test.difficulty}
            </Text>
          </Paper>
        )}

        <Card withBorder radius="md" mt="md">
          <Group justify="space-between" mb="md">
            <Title order={4}>Candidates ({jd.candidates?.length || 0})</Title>
            <Group>
              <Button size="xs" component={Link} to={`upload-resume`}>
                Upload Resume
              </Button>
              {selectableCandidates.length > 0 && jd.test && (
                <Button
                  size="sm"
                  color="green"
                  leftSection={<IconSend size={16} />}
                  onClick={handleSendTests}
                  loading={sendingTests}
                  disabled={selectedCandidates.size === 0}
                >
                  Send Test ({selectedCandidates.size})
                </Button>
              )}
            </Group>
          </Group>

          {jd.candidates && jd.candidates.length > 0 ? (
            <>
              {selectableCandidates.length > 0 && jd.test && (
                <Group mb="md">
                  <Checkbox
                    label="Select All"
                    checked={selectedCandidates.size === selectableCandidates.length && selectableCandidates.length > 0}
                    indeterminate={selectedCandidates.size > 0 && selectedCandidates.size < selectableCandidates.length}
                    onChange={handleSelectAll}
                  />
                  <Text size="sm" c="dimmed">
                    ({selectableCandidates.length} candidates available for test)
                  </Text>
                </Group>
              )}
              
              {jd.candidates.map(candidate => {
                const hasBeenSentTest = candidate.status === 'TestSent';
                const canSelect = jd.test && !hasBeenSentTest;
                
                return (
                  <Paper key={candidate.id} withBorder p="sm" mt="sm" radius="sm">
                    <Group justify="space-between">
                      <Group>
                        {canSelect && (
                          <Checkbox
                            checked={selectedCandidates.has(candidate.id)}
                            onChange={(event) => handleCandidateSelection(candidate.id, event.currentTarget.checked)}
                          />
                        )}
                        <div>
                          <Text fw={500}>{candidate.resume?.email}</Text>
                          <Text size="sm" c="dimmed">Applied on {new Date(candidate.createdAt).toLocaleDateString()}</Text>
                          {hasBeenSentTest && candidate.individualRepoUrl && (
                            <Group gap="xs" mt="xs">
                              <Text size="xs" c="dimmed">Repository:</Text>
                              <Button
                                size="xs"
                                variant="subtle"
                                component="a"
                                href={candidate.individualRepoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View GitHub Repo
                              </Button>
                              {candidate.repoCreatedAt && (
                                <Text size="xs" c="dimmed">
                                  Created: {new Date(candidate.repoCreatedAt).toLocaleDateString()}
                                </Text>
                              )}
                              <Tooltip label="Manually trigger LLM evaluation for this candidate">
                                <Button
                                  size="xs"
                                  variant="subtle"
                                  color="violet"
                                  leftSection={<IconBrain size={14} />}
                                  onClick={() => handleTriggerEvaluation(candidate.id, candidate.individualRepoUrl || '')}
                                  loading={evaluatingCandidate === candidate.id}
                                >
                                  Evaluate Code
                                </Button>
                              </Tooltip>
                            </Group>
                          )}
                        </div>
                      </Group>
                      <Group>
                        <Badge color={getScoreColor(candidate.suitabilityScore)}>
                          Score: {candidate.suitabilityScore?.toFixed(1) || 'N/A'}
                        </Badge>
                        {hasBeenSentTest && (
                          <Badge color="blue" variant="light">
                            Test Sent
                          </Badge>
                        )}
                        {candidate.status === 'Completed' && (
                          <Badge color="green" variant="light">
                            Completed
                          </Badge>
                        )}
                        {candidate.suitabilityScore && candidate.suitabilityScore < 5 && (
                          <Badge color="orange" variant="light">
                            Low Score
                          </Badge>
                        )}
                        {candidate.suitabilityScore && candidate.suitabilityScore >= 8 && (
                          <Badge color="teal" variant="light">
                            High Score
                          </Badge>
                        )}
                      </Group>
                    </Group>
                  </Paper>
                );
              })}
            </>
          ) : (
            <Text mt="sm">No candidates have applied for this job yet.</Text>
          )}
        </Card>

      </Paper>

      {/* Project Generation Success Modal */}
      <Modal 
        opened={projectGenerated} 
        onClose={() => setProjectGenerated(false)}
        title="Project Generated Successfully!"
        centered
      >
        <Stack>
          <Alert icon={<IconCheck size={16} />} title="Success" color="green">
            {generatedProjectData?.message}
          </Alert>
          
          {generatedProjectData && (
            <Card withBorder p="md">
              <Title order={5} mb="sm">Project Details</Title>
              <Text fw={500} mb="xs">{generatedProjectData.test.title}</Text>
              <Text size="sm" c="dimmed" mb="md">{generatedProjectData.test.description}</Text>
              
              <Group justify="space-between" mb="sm">
                <Text size="sm" fw={500}>GitHub Repository:</Text>
                <Button 
                  size="xs" 
                  variant="outline" 
                  component="a" 
                  href={generatedProjectData.githubRepository} 
                  target="_blank"
                >
                  View Repository
                </Button>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm" fw={500}>Test Page:</Text>
                <Button 
                  size="xs" 
                  leftSection={<IconEye size={14} />}
                  component={Link}
                  to={`/test/${generatedProjectData.test.id}`}
                  variant="filled"
                  color="blue"
                >
                  View Test Page
                </Button>
              </Group>
            </Card>
          )}
          
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default JdDetailsPage;
