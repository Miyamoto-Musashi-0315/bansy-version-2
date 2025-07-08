import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Title, Button, Table, Group, ActionIcon, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { getJds, deleteJd } from '../services/jdService';
import { JobDescription } from '../types';
import { logger } from '../utils/logger';

const JdDashboard = () => {
  const [jds, setJds] = useState<JobDescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJds = async () => {
      try {
        setLoading(true);
        const data = await getJds();
        setJds(data);
        setError(null);
      } catch (err) {
        logger.error('Failed to fetch JDs', err);
        setError('Failed to load job descriptions.');
      } finally {
        setLoading(false);
      }
    };

    fetchJds();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job description? This action cannot be undone.')) {
      try {
        await deleteJd(id);
        setJds(jds.filter((jd) => jd.id !== id));
      } catch (err) {
        logger.error('Failed to delete JD', err);
        setError('Failed to delete job description.');
      }
    }
  };

  const rows = jds.map((jd) => (
    <tr key={jd.id}>
      <td>
        <Text component={Link} to={`jds/${jd.id}`} fw={500}>
          {jd.title}
        </Text>
      </td>
      <td>{jd._count?.candidates || 0}</td>
      <td>{new Date(jd.createdAt).toLocaleDateString()}</td>
      <td>
        <Group gap="xs" wrap="nowrap">
          <ActionIcon component={Link} to={`jds/${jd.id}/edit`} color="blue" title="Edit JD">
            <IconPencil size={16} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDelete(jd.id)} title="Delete JD">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Container>
      <Group justify="space-between" mb="md">
        <Title order={2}>Job Descriptions</Title>
        <Button component={Link} to="jds/new">
          Create New JD
        </Button>
      </Group>
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red">{error}</Text>}
      {!loading && !error && (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Candidates</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows.length > 0 ? rows : (<tr><td colSpan={4}><Text ta="center" my="md">No job descriptions found. Create one to get started.</Text></td></tr>)}</tbody>
        </Table>
      )}
    </Container>
  );
};

export default JdDashboard;
