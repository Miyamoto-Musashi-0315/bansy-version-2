import { Card, Text, Button, Group, Stack, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Test } from '../types';

interface TestCardProps {
  test: Test;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card withBorder shadow="sm" radius="md" p="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={500} size="lg">
            {test.title}
          </Text>
          <Badge>{test.language}</Badge>
        </Group>

        <Text c="dimmed" size="sm" lineClamp={2}>
          {test.description || 'No description provided'}
        </Text>

        <Text size="xs" c="dimmed">
          Created: {new Date(test.createdAt).toLocaleDateString()}
        </Text>

        <Group justify="flex-end" mt="md">
          <Button
            component={Link}
            to={`/test/${test.id}`}
            variant="light"
            size="sm"
          >
            View Test
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
