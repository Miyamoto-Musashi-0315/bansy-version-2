import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Grid,
  Card,
  Text,
  Badge,
  Progress,
  Timeline,
  Group,
  Stack,
  Center,
  Loader,
  Alert,
  ActionIcon,
  Tooltip,
  Table,
  ScrollArea,
  RingProgress,
} from '@mantine/core';
import { 
  IconRefresh, 
  IconActivity, 
  IconEye,
  IconCode,
  IconGitBranch,
  IconGitCommit
} from '@tabler/icons-react';
import { assessmentTracking } from '../services/api';

interface AssessmentTrackingProps {
  jdId: string;
}

interface TrackingData {
  overview: {
    totalCandidates: number;
    testsSent: number;
    inProgress: number;
    completed: number;
    avgSuitabilityScore: number;
  };
  candidates: Array<{
    id: string;
    email: string;
    status: string;
    suitabilityScore: number;
    progressPercentage: number;
    activity: {
      totalEvents: number;
      pushEvents: number;
      workflowEvents: number;
      lastActivityAt: string;
      timeElapsed: number | null;
    };
    timeline: Array<{
      type: string;
      timestamp: string;
      details: {
        repoName: string;
        branch: string;
        pusher: string;
      };
    }>;
  }>;
  recentActivity: Array<{
    type: string;
    timestamp: string;
    candidate: {
      id: string;
      email: string;
    } | null;
    details: {
      repoName: string;
      branch: string;
      pusher: string;
      commitSha: string;
    };
  }>;
}

const AssessmentTrackingDashboard: React.FC<AssessmentTrackingProps> = ({ jdId }) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      const data = await assessmentTracking.getTrackingData(jdId);
      setTrackingData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching tracking data:', err);
      setError('Failed to fetch assessment tracking data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [jdId]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrackingData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [jdId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TestSent': return 'blue';
      case 'InProgress': return 'yellow';
      case 'Completed': return 'green';
      default: return 'gray';
    }
  };

  const getEventIcon = (eventType: string) => {
    if (eventType === 'push') return <IconGitCommit size={16} />;
    if (eventType.startsWith('workflow_')) return <IconCode size={16} />;
    if (eventType.startsWith('issue_')) return <IconActivity size={16} />;
    return <IconGitBranch size={16} />;
  };

  const formatTimeElapsed = (milliseconds: number | null) => {
    if (!milliseconds) return 'N/A';
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h ago`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  if (loading && !trackingData) {
    return (
      <Container>
        <Center style={{ height: 400 }}>
          <Stack align="center" spacing="md">
            <Loader size="lg" />
            <Text>Loading assessment tracking data...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error && !trackingData) {
    return (
      <Container>
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!trackingData) return null;

  return (
    <Container size="xl">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Assessment Tracking Dashboard</Title>
        <Group>
          <Text size="sm" c="dimmed">
            Last updated: {lastUpdated?.toLocaleTimeString() || 'Never'}
          </Text>
          <Tooltip label="Refresh data">
            <ActionIcon 
              variant="outline" 
              onClick={fetchTrackingData}
              loading={loading}
            >
              <IconRefresh size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {/* Overview Cards */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder padding="md">
            <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
              Total Candidates
            </Text>
            <Text fw={700} size="xl">
              {trackingData.overview.totalCandidates}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder padding="md">
            <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
              Tests Sent
            </Text>
            <Text fw={700} size="xl" c="blue">
              {trackingData.overview.testsSent}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder padding="md">
            <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
              In Progress
            </Text>
            <Text fw={700} size="xl" c="yellow">
              {trackingData.overview.inProgress}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card withBorder padding="md">
            <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
              Completed
            </Text>
            <Text fw={700} size="xl" c="green">
              {trackingData.overview.completed}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        {/* Candidate Progress Table */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder padding="md">
            <Title order={3} mb="md">Candidate Progress</Title>
            <ScrollArea style={{ height: 400 }}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Candidate</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Progress</Table.Th>
                    <Table.Th>Activity</Table.Th>
                    <Table.Th>Last Seen</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {trackingData.candidates.map((candidate) => (
                    <Table.Tr key={candidate.id}>
                      <Table.Td>
                        <Stack spacing={2}>
                          <Text fw={500}>{candidate.email}</Text>
                          <Text size="xs" c="dimmed">
                            Score: {candidate.suitabilityScore?.toFixed(1) || 'N/A'}
                          </Text>
                        </Stack>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getStatusColor(candidate.status)} variant="light">
                          {candidate.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Stack spacing={4}>
                          <Progress 
                            value={candidate.progressPercentage} 
                            size="sm" 
                            color={getStatusColor(candidate.status)}
                          />
                          <Text size="xs">{candidate.progressPercentage}%</Text>
                        </Stack>
                      </Table.Td>
                      <Table.Td>
                        <Group spacing={8}>
                          <Tooltip label="Total Events">
                            <Badge variant="outline" size="xs">
                              {candidate.activity.totalEvents}
                            </Badge>
                          </Tooltip>
                          <Tooltip label="Code Pushes">
                            <Badge variant="outline" size="xs" color="blue">
                              {candidate.activity.pushEvents} pushes
                            </Badge>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {formatTimeElapsed(candidate.activity.timeElapsed)}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Tooltip label="View Details">
                          <ActionIcon 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // TODO: Open candidate details modal
                              console.log('View candidate details:', candidate.id);
                            }}
                          >
                            <IconEye size={14} />
                          </ActionIcon>
                        </Tooltip>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Grid.Col>

        {/* Recent Activity Timeline */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card withBorder padding="md">
            <Title order={3} mb="md">Recent Activity</Title>
            <ScrollArea style={{ height: 400 }}>
              <Timeline>
                {trackingData.recentActivity.map((activity, index) => (
                  <Timeline.Item
                    key={index}
                    bullet={getEventIcon(activity.type)}
                    title={activity.type.replace('_', ' ').toUpperCase()}
                  >
                    <Text size="sm" c="dimmed">
                      {activity.candidate?.email || 'System'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {activity.details.branch} • {activity.details.commitSha}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {new Date(activity.timestamp).toLocaleString()}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </ScrollArea>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Assessment Progress Overview */}
      <Card withBorder padding="md" mt="xl">
        <Title order={3} mb="md">Assessment Progress Overview</Title>
        <Group justify="center">
          <RingProgress
            size={120}
            thickness={12}
            sections={[
              { value: (trackingData.overview.completed / trackingData.overview.totalCandidates) * 100, color: 'green' },
              { value: (trackingData.overview.inProgress / trackingData.overview.totalCandidates) * 100, color: 'yellow' },
              { value: ((trackingData.overview.testsSent - trackingData.overview.inProgress - trackingData.overview.completed) / trackingData.overview.totalCandidates) * 100, color: 'blue' },
            ]}
            label={
              <Center>
                <Text size="xs" ta="center">
                  {Math.round((trackingData.overview.completed / trackingData.overview.totalCandidates) * 100)}%<br/>
                  Complete
                </Text>
              </Center>
            }
          />
          <Stack spacing={8}>
            <Group spacing={8}>
              <Badge color="green" variant="light">Completed</Badge>
              <Text size="sm">{trackingData.overview.completed} candidates</Text>
            </Group>
            <Group spacing={8}>
              <Badge color="yellow" variant="light">In Progress</Badge>
              <Text size="sm">{trackingData.overview.inProgress} candidates</Text>
            </Group>
            <Group spacing={8}>
              <Badge color="blue" variant="light">Test Sent</Badge>
              <Text size="sm">{trackingData.overview.testsSent - trackingData.overview.inProgress - trackingData.overview.completed} candidates</Text>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Container>
  );
};

export default AssessmentTrackingDashboard; 