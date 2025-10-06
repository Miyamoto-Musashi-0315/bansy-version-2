import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Group,
  Button,
  Title,
  Stack,
  Avatar,
  Text,
  Container,
  NavLink,
  Badge,
  Divider,
} from '@mantine/core';
import {
  IconLogout,
  IconGauge,
  IconServer,
  IconAlertTriangle,
  IconTerminal2,
  IconChartBar,
  IconSettings,
  IconDatabase,
  IconBrandGithub,
} from '@tabler/icons-react';

export function DevPortalLayout() {
  const navigate = useNavigate();
  
  // Get developer user from localStorage
  const devUserString = localStorage.getItem('devUser');
  const devUser = devUserString ? JSON.parse(devUserString) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('devToken');
    localStorage.removeItem('devUser');
    window.location.href = '/dev/login';
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
      styles={{
        main: {
          background: '#f8f9fa',
        },
      }}
    >
      <AppShell.Header bg="dark">
        <Container size="lg">
          <Group justify="space-between" h="100%">
            <Group>
              <IconTerminal2 size={24} color="white" />
              <Title order={3} c="white">Developer Portal</Title>
              <Badge color="blue" variant="filled">v1.0</Badge>
            </Group>
            <Button variant="subtle" color="gray" onClick={handleLogout}>
              <IconLogout size={16} color="white" />
            </Button>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Stack>
            <Group>
              <Avatar color="blue" radius="xl">
                {devUser?.username?.[0] || 'D'}
              </Avatar>
              <div>
                <Text fw={500}>{devUser?.username || 'Developer'}</Text>
                <Badge color="red">Developer Access</Badge>
              </div>
            </Group>

            <Divider my="sm" />
            
            <Text size="xs" fw={500} c="dimmed">MONITORING</Text>
            <Stack gap="xs">
              <NavLink
                component={Link}
                to="/dev/monitoring"
                label="System Dashboard"
                leftSection={<IconGauge size={16} />}
                active={window.location.pathname === '/dev/monitoring'}
              />
              
              <NavLink
                component={Link}
                to="/dev/monitoring/performance"
                label="Performance Metrics"
                leftSection={<IconChartBar size={16} />}
                active={window.location.pathname === '/dev/monitoring/performance'}
              />
              
              <NavLink
                component={Link}
                to="/dev/monitoring/errors"
                label="Error Logs"
                leftSection={<IconAlertTriangle size={16} />}
                active={window.location.pathname === '/dev/monitoring/errors'}
              />
            </Stack>
            
            <Divider my="sm" />
            
            <Text size="xs" fw={500} c="dimmed">ADMINISTRATION</Text>
            <Stack gap="xs">
              <NavLink
                component={Link}
                to="/dev/admin/servers"
                label="Server Management"
                leftSection={<IconServer size={16} />}
                active={window.location.pathname === '/dev/admin/servers'}
              />
              
              <NavLink
                component={Link}
                to="/dev/admin/database"
                label="Database"
                leftSection={<IconDatabase size={16} />}
                active={window.location.pathname === '/dev/admin/database'}
              />
              
              <NavLink
                component={Link}
                to="/dev/admin/github"
                label="GitHub Integration"
                leftSection={<IconBrandGithub size={16} />}
                active={window.location.pathname === '/dev/admin/github'}
              />
              
              <NavLink
                component={Link}
                to="/dev/admin/settings"
                label="System Settings"
                leftSection={<IconSettings size={16} />}
                active={window.location.pathname === '/dev/admin/settings'}
              />
            </Stack>
          </Stack>
          
          <Stack gap="xs">
            <Text size="xs" ta="center" c="dimmed">
              Developer Portal v1.0
            </Text>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}