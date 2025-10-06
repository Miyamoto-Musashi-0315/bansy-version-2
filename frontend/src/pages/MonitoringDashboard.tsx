import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Grid,
  Group,
  Badge,
  Stack,
  Card,
  Table,
  Button,
  Alert,
  Loader,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCpu,
  IconDatabase,
  IconServer,
  IconRefresh,
  IconChartLine,
  IconAlertTriangle,
  IconCheck,
} from '@tabler/icons-react';
import { api } from '../services/api';

// Types for metrics data
interface Metrics {
  general: {
    uptime: number;
    requestCount: number;
    errorCount: number;
    errorRate: number;
    avgResponseTime: number;
  };
  statusCodes: Record<number, number>;
  performance: {
    topPaths: Array<{
      path: string;
      count: number;
      avgResponseTime: number;
      maxResponseTime: number;
    }>;
  };
  system: {
    cpuUsage: number[];
    memoryUsage: number[];
    platform: string;
    cpuCores: number;
    totalMemory: number;
    freeMemory: number;
  };
  errors: Array<{
    path: string;
    method: string;
    statusCode: number;
    message: string;
    timestamp: Date;
  }>;
}

// Simple line chart component
const LineChart = ({ data, label, color }: { data: number[], label: string, color: string }) => {
  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const height = 100;

  return (
    <div>
      <Text size="sm" mb={5}>{label}</Text>
      <div style={{ height: `${height}px`, position: 'relative', border: '1px solid #eee', padding: '5px' }}>
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length} ${height}`} preserveAspectRatio="none">
          <path
            d={data.map((value, index) => {
              const x = index;
              const y = height - ((value - min) / (range || 1)) * height;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Format uptime in human-readable format
const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
};

// Format bytes to human-readable string
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<number>(30); // seconds
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Fetch metrics data
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/monitoring/metrics');
      setMetrics(data);
      setLastRefresh(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch monitoring data');
    } finally {
      setLoading(false);
    }
  };

  // Set up auto-refresh
  useEffect(() => {
    fetchMetrics();

    const intervalId = setInterval(() => {
      fetchMetrics();
    }, refreshInterval * 1000);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  if (loading && !metrics) {
    return (
      <Container size="lg" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Loading monitoring data...</Text>
        </Stack>
      </Container>
    );
  }

  if (error && !metrics) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
          {error}
          <Button mt="md" onClick={fetchMetrics}>Retry</Button>
        </Alert>
      </Container>
    );
  }

  // Determine system health status
  const getHealthStatus = () => {
    if (!metrics) return { color: 'gray', label: 'Unknown', icon: <IconAlertCircle size={16} /> };

    const errorRate = metrics.general.errorRate;
    const avgResponseTime = metrics.general.avgResponseTime;
    const cpuUsage = metrics.system.cpuUsage[metrics.system.cpuUsage.length - 1] || 0;
    const memoryUsage = metrics.system.memoryUsage[metrics.system.memoryUsage.length - 1] || 0;

    if (errorRate > 10 || avgResponseTime > 1000 || cpuUsage > 0.8 || memoryUsage > 0.9) {
      return { color: 'red', label: 'Critical', icon: <IconAlertCircle size={16} /> };
    }

    if (errorRate > 5 || avgResponseTime > 500 || cpuUsage > 0.6 || memoryUsage > 0.7) {
      return { color: 'orange', label: 'Warning', icon: <IconAlertTriangle size={16} /> };
    }

    return { color: 'green', label: 'Healthy', icon: <IconCheck size={16} /> };
  };

  const healthStatus = getHealthStatus();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={1} fw={700} c="blue">System Monitoring</Title>
            <Text size="lg" c="dimmed">Performance metrics and system health</Text>
          </div>
          <Group>
            <Text size="sm">Auto-refresh: {refreshInterval}s</Text>
            <Button
              leftSection={<IconRefresh size={18} />}
              onClick={fetchMetrics}
              variant="light"
            >
              Refresh
            </Button>
          </Group>
        </Group>

        {/* System Health Overview */}
        <Paper p="md" withBorder>
          <Group justify="space-between">
            <Group>
              <ThemeIcon color={healthStatus.color} size="lg" variant="light">
                {healthStatus.icon}
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">System Status</Text>
                <Group gap={8}>
                  <Badge color={healthStatus.color}>{healthStatus.label}</Badge>
                  <Text size="sm">Uptime: {metrics ? formatUptime(metrics.general.uptime) : 'N/A'}</Text>
                </Group>
              </div>
            </Group>
            <Text size="sm" c="dimmed">Last updated: {lastRefresh.toLocaleTimeString()}</Text>
          </Group>
        </Paper>

        {/* Key Metrics */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder padding="lg">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Request Count</Text>
                <ThemeIcon color="blue" variant="light">
                  <IconServer size={18} />
                </ThemeIcon>
              </Group>
              <Text size="xl" fw={700}>{metrics?.general.requestCount.toLocaleString() || 0}</Text>
              <Text size="xs" c="dimmed" mt={5}>Total API requests processed</Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder padding="lg">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Error Rate</Text>
                <ThemeIcon color={metrics && metrics.general.errorRate > 5 ? "red" : "green"} variant="light">
                  <IconAlertTriangle size={18} />
                </ThemeIcon>
              </Group>
              <Text size="xl" fw={700}>{metrics ? `${metrics.general.errorRate.toFixed(2)}%` : '0%'}</Text>
              <Text size="xs" c="dimmed" mt={5}>Percentage of requests resulting in errors</Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder padding="lg">
              <Group justify="space-between" mb="md">
                <Text fw={500}>Avg Response Time</Text>
                <ThemeIcon color={metrics && metrics.general.avgResponseTime > 500 ? "orange" : "green"} variant="light">
                  <IconChartLine size={18} />
                </ThemeIcon>
              </Group>
              <Text size="xl" fw={700}>{metrics ? `${metrics.general.avgResponseTime.toFixed(2)}ms` : '0ms'}</Text>
              <Text size="xs" c="dimmed" mt={5}>Average API response time</Text>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder padding="lg">
              <Group justify="space-between" mb="md">
                <Text fw={500}>CPU Usage</Text>
                <ThemeIcon color={metrics && metrics.system.cpuUsage[metrics.system.cpuUsage.length - 1] > 0.7 ? "orange" : "green"} variant="light">
                  <IconCpu size={18} />
                </ThemeIcon>
              </Group>
              <Text size="xl" fw={700}>
                {metrics && metrics.system.cpuUsage.length > 0
                  ? `${(metrics.system.cpuUsage[metrics.system.cpuUsage.length - 1] * 100).toFixed(1)}%`
                  : '0%'}
              </Text>
              <Text size="xs" c="dimmed" mt={5}>Current CPU utilization</Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Charts */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="md" withBorder>
              <Text fw={500} mb="md">CPU Usage Over Time</Text>
              {metrics && (
                <LineChart 
                  data={metrics.system.cpuUsage.map(v => v * 100)} 
                  label="CPU Usage (%)" 
                  color="#228be6" 
                />
              )}
            </Paper>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper p="md" withBorder>
              <Text fw={500} mb="md">Memory Usage Over Time</Text>
              {metrics && (
                <LineChart 
                  data={metrics.system.memoryUsage.map(v => v * 100)} 
                  label="Memory Usage (%)" 
                  color="#40c057" 
                />
              )}
            </Paper>
          </Grid.Col>
        </Grid>

        {/* System Info */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">System Information</Title>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Group>
                  <Text fw={500}>Platform:</Text>
                  <Text>{metrics?.system.platform || 'Unknown'}</Text>
                </Group>
                <Group>
                  <Text fw={500}>CPU Cores:</Text>
                  <Text>{metrics?.system.cpuCores || 'N/A'}</Text>
                </Group>
              </Stack>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Group>
                  <Text fw={500}>Total Memory:</Text>
                  <Text>{metrics ? formatBytes(metrics.system.totalMemory) : 'N/A'}</Text>
                </Group>
                <Group>
                  <Text fw={500}>Free Memory:</Text>
                  <Text>{metrics ? formatBytes(metrics.system.freeMemory) : 'N/A'}</Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Top Endpoints */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">Top Endpoints</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Path</Table.Th>
                <Table.Th>Requests</Table.Th>
                <Table.Th>Avg Response Time</Table.Th>
                <Table.Th>Max Response Time</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {metrics?.performance.topPaths.map((path, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{path.path}</Table.Td>
                  <Table.Td>{path.count}</Table.Td>
                  <Table.Td>{path.avgResponseTime.toFixed(2)}ms</Table.Td>
                  <Table.Td>{path.maxResponseTime.toFixed(2)}ms</Table.Td>
                </Table.Tr>
              ))}
              {(!metrics || metrics.performance.topPaths.length === 0) && (
                <Table.Tr>
                  <Table.Td colSpan={4} style={{ textAlign: 'center' }}>No data available</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* Recent Errors */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">Recent Errors</Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Time</Table.Th>
                <Table.Th>Method</Table.Th>
                <Table.Th>Path</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Message</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {metrics?.errors.map((error, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{new Date(error.timestamp).toLocaleString()}</Table.Td>
                  <Table.Td>{error.method}</Table.Td>
                  <Table.Td>{error.path}</Table.Td>
                  <Table.Td>
                    <Badge color={error.statusCode >= 500 ? 'red' : 'orange'}>
                      {error.statusCode}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{error.message}</Table.Td>
                </Table.Tr>
              ))}
              {(!metrics || metrics.errors.length === 0) && (
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ textAlign: 'center' }}>No errors recorded</Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* Status Codes */}
        <Paper p="md" withBorder>
          <Title order={3} mb="md">Status Code Distribution</Title>
          <Grid>
            {metrics && Object.entries(metrics.statusCodes).map(([code, count]) => (
              <Grid.Col key={code} span={{ base: 6, md: 4, lg: 3 }}>
                <Card withBorder>
                  <Group justify="space-between">
                    <Badge
                      color={
                        parseInt(code) < 300 ? 'green' :
                        parseInt(code) < 400 ? 'blue' :
                        parseInt(code) < 500 ? 'orange' : 'red'
                      }
                      size="lg"
                    >
                      {code}
                    </Badge>
                    <Text fw={500}>{count}</Text>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
            {(!metrics || Object.keys(metrics.statusCodes).length === 0) && (
              <Grid.Col span={12}>
                <Text ta="center">No status code data available</Text>
              </Grid.Col>
            )}
          </Grid>
        </Paper>
      </Stack>
    </Container>
  );
}

export default MonitoringDashboard;

