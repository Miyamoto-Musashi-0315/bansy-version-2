import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Button,
  Grid,
  Card,
  Text,
  Group,
  ActionIcon,
  Badge,
  Stack,
  Alert,
  Paper,
  SimpleGrid,
  Tooltip,
  ThemeIcon,
} from '@mantine/core';
import {
  IconPencil,
  IconTrash,
  IconPlus,
  IconUsers,
  IconBriefcase,
  IconCalendar,
  IconTrendingUp,
  IconEye,
  IconUpload,
  IconChartBar,
  IconSparkles
} from '@tabler/icons-react';
import { getJds, deleteJd } from '../services/jdService';
import { JobDescription } from '../types';
import { logger } from '../utils/logger';
import React from 'react';

const JdDashboard = () => {
  console.log('JdDashboard: Component rendering');
  
  // Send log to backend
  React.useEffect(() => {
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'JD_DASHBOARD',
        message: 'JdDashboard component mounted',
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  }, []);
  
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJds = async () => {
      try {
        console.log('JdDashboard: Starting to fetch JDs');
        
        // Send log to backend
        fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'API_FETCH_START',
            message: 'Starting to fetch JDs from API',
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
        
        setLoading(true);
        
        // Add a timeout mechanism
        const timeoutId = setTimeout(() => {
          console.error('JdDashboard: API call timed out after 10 seconds');
          fetch('/api/debug-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'API_TIMEOUT',
              message: 'API call timed out after 10 seconds',
              timestamp: new Date().toISOString()
            })
          }).catch(console.error);
          setError('Request timed out. Please check your connection and try again.');
          setLoading(false);
        }, 10000); // 10 second timeout
        
        const data = await getJds();
        clearTimeout(timeoutId); // Clear timeout if request succeeds
        
        console.log('JdDashboard: Successfully fetched JDs:', data);
        
        // Send success log to backend
        fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'API_FETCH_SUCCESS',
            message: `Successfully fetched ${data.length} JDs`,
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
        
        setJds(data);
        setError(null);
      } catch (err) {
        console.error('JdDashboard: Failed to fetch JDs:', err);
        
        // Send error log to backend
        const error = err as Error;
        fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'API_FETCH_ERROR',
            message: `Failed to fetch JDs: ${error.message}`,
            stack: error.stack,
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
        
        logger.error('Failed to fetch JDs', err);
        setError('Failed to load job descriptions. Please try refreshing the page.');
      } finally {
        console.log('JdDashboard: Setting loading to false');
        
        // Send final log to backend
        fetch('/api/debug-log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'API_FETCH_COMPLETE',
            message: 'API fetch process completed',
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
        
        setLoading(false);
      }
    };

    fetchJds();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job description?')) {
      try {
        await deleteJd(id);
        setJds(jds.filter((jd) => jd.id !== id));
      } catch (err) {
        logger.error('Failed to delete JD', err);
        setError('Failed to delete job description.');
      }
    }
  };

  // Simple statistics
  const totalJobs = jds.length;
  const totalCandidates = jds.reduce((sum, jd) => sum + (jd._count?.candidates || 0), 0);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Stack align="center" gap="md">
          <Text>Loading dashboard...</Text>
          <Text size="sm" c="dimmed">
            Fetching your job descriptions from the server...
          </Text>
          <Button 
            variant="light" 
            onClick={() => window.location.reload()}
            size="sm"
          >
            Refresh Page
          </Button>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert color="red" title="Error loading dashboard">
          <Stack gap="md">
            <Text>{error}</Text>
            <Button 
              variant="light" 
              onClick={() => window.location.reload()}
              size="sm"
            >
              Refresh Page
            </Button>
          </Stack>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={1} fw={700} c="blue">
              Hiring Dashboard
            </Title>
            <Text size="lg" c="dimmed">
              Manage your job descriptions and candidates
            </Text>
          </div>
          <Button
            component={Link}
            to="jds/new"
            leftSection={<IconPlus size={18} />}
            size="lg"
          >
            Create New Job
          </Button>
        </Group>

        {/* Simple Stats */}
        <SimpleGrid cols={{ base: 2, sm: 4 }}>
          <Paper p="md" withBorder radius="md" bg="blue.0">
            <Group>
              <ThemeIcon size="lg" color="blue" variant="light">
                <IconBriefcase size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">Total Jobs</Text>
                <Text size="xl" fw={700}>{totalJobs}</Text>
              </div>
            </Group>
          </Paper>

          <Paper p="md" withBorder radius="md" bg="green.0">
            <Group>
              <ThemeIcon size="lg" color="green" variant="light">
                <IconUsers size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">Candidates</Text>
                <Text size="xl" fw={700}>{totalCandidates}</Text>
              </div>
            </Group>
          </Paper>

          <Paper p="md" withBorder radius="md" bg="orange.0">
            <Group>
              <ThemeIcon size="lg" color="orange" variant="light">
                <IconChartBar size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">Avg per Job</Text>
                <Text size="xl" fw={700}>{totalJobs > 0 ? Math.round(totalCandidates / totalJobs) : 0}</Text>
              </div>
            </Group>
          </Paper>

          <Paper p="md" withBorder radius="md" bg="purple.0">
            <Group>
              <ThemeIcon size="lg" color="purple" variant="light">
                <IconTrendingUp size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">Active</Text>
                <Text size="xl" fw={700}>{jds.filter(jd => (jd._count?.candidates || 0) > 0).length}</Text>
              </div>
            </Group>
          </Paper>
        </SimpleGrid>

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {/* Job Cards */}
        {jds.length === 0 ? (
          <Paper p="xl" withBorder radius="md" ta="center">
            <ThemeIcon size={60} mx="auto" mb="md" color="gray" variant="light">
              <IconSparkles size={30} />
            </ThemeIcon>
            <Title order={3} c="dimmed" mb="sm">No Jobs Yet</Title>
            <Text c="dimmed" mb="lg">
              Create your first job description to get started!
            </Text>
            <Button
              component={Link}
              to="jds/new"
              leftSection={<IconPlus size={16} />}
            >
              Create First Job
            </Button>
          </Paper>
        ) : (
          <Grid>
            {jds.map((jd) => (
              <Grid.Col key={jd.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card withBorder padding="lg" radius="md">
                  <Stack gap="md">
                    <div>
                      <Group justify="space-between" align="flex-start">
                        <Text
                          component={Link}
                          to={`jds/${jd.id}`}
                          fw={600}
                          size="lg"
                          style={{ textDecoration: 'none' }}
                          lineClamp={2}
                        >
                          {jd.title}
                        </Text>
                      </Group>
                      
                      <Text size="sm" c="dimmed" lineClamp={3} mt="xs">
                        {jd.description}
                      </Text>
                    </div>

                    <Group gap="xs">
                      <Badge variant="light" size="sm">
                        {jd.minExperience}-{jd.maxExperience}y exp
                      </Badge>
                      <Badge variant="dot" color="blue" size="sm">
                        {jd.languages[0] || 'Programming'}
                      </Badge>
                    </Group>

                    <Group justify="space-between">
                      <Group gap={4}>
                        <IconUsers size={14} />
                        <Text size="sm">
                          {jd._count?.candidates || 0} candidates
                        </Text>
                      </Group>
                      <Group gap={4}>
                        <IconCalendar size={14} />
                        <Text size="sm" c="dimmed">
                          {new Date(jd.createdAt).toLocaleDateString()}
                        </Text>
                      </Group>
                    </Group>

                    <Group justify="space-between" pt="sm">
                      <Group gap="xs">
                        <Tooltip label="View Details">
                          <ActionIcon
                            component={Link}
                            to={`jds/${jd.id}`}
                            variant="light"
                            color="blue"
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Upload Resume">
                          <ActionIcon
                            component={Link}
                            to={`jds/${jd.id}/upload-resume`}
                            variant="light"
                            color="green"
                          >
                            <IconUpload size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>

                      <Group gap="xs">
                        <Tooltip label="Edit">
                          <ActionIcon
                            component={Link}
                            to={`jds/${jd.id}/edit`}
                            variant="light"
                            color="orange"
                          >
                            <IconPencil size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <ActionIcon
                            onClick={() => handleDelete(jd.id)}
                            variant="light"
                            color="red"
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default JdDashboard;
