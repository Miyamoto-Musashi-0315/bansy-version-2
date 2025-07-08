import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Title, TextInput, Textarea, Button, Paper, Group, NumberInput, TagsInput, Alert, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { getJdById, updateJd } from '../services/jdService';
import { logger } from '../utils/logger';

const JdEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      minExperience: 0,
      maxExperience: 5,
      languages: [] as string[],
      projectContext: '',
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
      description: (value) => (value.trim().length > 0 ? null : 'Description is required'),
      minExperience: (value, values) => (value >= 0 && value <= values.maxExperience ? null : 'Invalid min experience'),
      maxExperience: (value) => (value > 0 ? null : 'Max experience must be positive'),
      languages: (value) => (value.length > 0 ? null : 'At least one language is required'),
      projectContext: (value) => (value.trim().length > 0 ? null : 'Project context is required'),
    },
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Job Description ID is missing.');
      return;
    }

    const fetchJd = async () => {
      try {
        const jd = await getJdById(id);
        form.setValues({
          title: jd.title || '',
          description: jd.description || '',
          minExperience: jd.minExperience || 0,
          maxExperience: jd.maxExperience || 0,
          languages: jd.languages || [],
          projectContext: jd.projectContext || '',
        });
      } catch (err) {
        logger.error('Failed to fetch JD for editing', err);
        setError('Failed to load job description data.');
      } finally {
        setLoading(false);
      }
    };

    fetchJd();
  }, [id]);

  const handleSubmit = async (values: typeof form.values) => {
    if (!id) return;

    setLoading(true);
    setError('');

    try {
      await updateJd(id, {
        ...values,
        minExperience: Number(values.minExperience),
        maxExperience: Number(values.maxExperience),
      });
      navigate('/dashboard');
    } catch (err) {
      logger.error('Failed to update JD', err);
      setError('Failed to update job description. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} mb="lg">
          Edit Job Description
        </Title>

        {loading && <p>Loading...</p>}

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="lg">
            {error}
          </Alert>
        )}

        {!loading && (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Job Title"
                placeholder="e.g., Senior Frontend Developer"
                required
                {...form.getInputProps('title')}
              />
              <Textarea
                label="Job Description"
                placeholder="Describe the role, responsibilities, and what you're looking for."
                required
                minRows={4}
                {...form.getInputProps('description')}
              />
              <Group grow>
                <NumberInput
                  label="Min Years of Experience"
                  placeholder="e.g., 0"
                  required
                  min={0}
                  {...form.getInputProps('minExperience')}
                />
                <NumberInput
                  label="Max Years of Experience"
                  placeholder="e.g., 4"
                  required
                  min={form.values.minExperience || 0}
                  {...form.getInputProps('maxExperience')}
                />
              </Group>
              <TagsInput
                label="Languages"
                placeholder="e.g., Python, React, C++ (press Enter to add)"
                required
                {...form.getInputProps('languages')}
              />
              <Textarea
                label="Project Context"
                placeholder="What kind of project will the candidate work on?"
                required
                minRows={4}
                {...form.getInputProps('projectContext')}
              />

              <Group justify="flex-end" mt="xl">
                <Button variant="default" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
                <Button type="submit" loading={form.isDirty() && loading}>
                  Save Changes
                </Button>
              </Group>
            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default JdEdit;
