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
} from '@mantine/core';
import {
  IconLogout,
  IconClipboard,
} from '@tabler/icons-react';
import { auth } from '../services/auth';

export function DashboardLayout() {
  console.log('DashboardLayout: Component rendering - DEBUG');

  const navigate = useNavigate();
  const user = auth.getUser();

  console.log('DashboardLayout: User data:', user);

  const handleLogout = () => {
    console.log('Logging out user');
    auth.logout();
    navigate('/login');
  };

  console.log('About to render AppShell with user:', user?.email);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="lg">
          <Group justify="space-between" h="100%">
            <Title order={3}>Bansy</Title>
            <Button variant="subtle" color="gray" onClick={handleLogout}>
              <IconLogout size={16} />
            </Button>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Stack>
            <Group>
              <Avatar color="blue" radius="xl">
                {user?.name?.[0] || 'U'}
              </Avatar>
              <div>
                <Text fw={500}>{user?.name || 'Unknown User'}</Text>
                <Text size="sm" c="dimmed">
                  {user?.email || 'No email'}
                </Text>
              </div>
            </Group>

            <Stack gap="xs">
              <NavLink
                component={Link}
                to="/dashboard"
                label="Job Descriptions"
                leftSection={<IconClipboard size={16} />}
                active={window.location.pathname === '/dashboard'}
              />
            </Stack>
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