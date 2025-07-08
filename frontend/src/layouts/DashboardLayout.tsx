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
} from '@mantine/core';
import { IconLogout, IconClipboard } from '@tabler/icons-react';
import { auth } from '../services/auth';
import { logger } from '../utils/logger';

export function DashboardLayout() {
  const navigate = useNavigate();
  const user = auth.getUser();

  const handleLogout = () => {
    logger.info('User initiated logout');
    auth.logout();
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Container size="lg">
          <Group justify="space-between" h="100%">
            <Title order={3}>AI Coding Platform</Title>
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
                <Text fw={500}>{user?.name}</Text>
                <Text size="sm" c="dimmed">
                  {user?.email}
                </Text>
              </div>
            </Group>

            <Stack gap="xs">
              <Button
                component={Link}
                to="/dashboard"
                variant="subtle"
                fullWidth
                leftSection={<IconClipboard size={16} />}
              >
                Tests
              </Button>
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
