import { useState, useEffect } from 'react';
import { Container, Grid, Button, Group, Title, Text, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconPlus } from '@tabler/icons-react';
import { TestCard } from '../components/TestCard';
import { getTests } from '../services/api';
import type { Test } from '../types';

export function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const data = await getTests();
        setTests(data);
      } catch (err) {
        setError('Failed to load tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Group justify="center">
          <Loader />
        </Group>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Coding Tests</Title>
          <Text c="dimmed" size="sm">
            Manage your coding assessments
          </Text>
        </div>
        <Button
          component={Link}
          to="/dashboard/tests/new"
          leftSection={<IconPlus size={16} />}
        >
          Create Test
        </Button>
      </Group>

      {error && (
        <Text c="red" mb="xl">
          {error}
        </Text>
      )}

      <Grid>
        {tests.map((test) => (
          <Grid.Col key={test.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <TestCard test={test} />
          </Grid.Col>
        ))}

        {tests.length === 0 && !error && (
          <Grid.Col span={12}>
            <Text ta="center" c="dimmed">
              No tests found. Create your first test to get started!
            </Text>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
