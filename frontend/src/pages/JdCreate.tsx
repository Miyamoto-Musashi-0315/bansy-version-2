import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, TextInput, Textarea, Button, Paper, Group, NumberInput, TagsInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createJd } from '../services/jdService';
import { logger } from '../utils/logger';

const JdCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await createJd({
        ...values,
        minExperience: Number(values.minExperience),
        maxExperience: Number(values.maxExperience),
      });

      navigate('/dashboard');
    } catch (error) {
      logger.error('Failed to create JD', error);
      // You might want to show an error notification to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} mb="lg">Create New Job Description</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            mt="md"
            minRows={4}
            {...form.getInputProps('description')}
          />
          <Group grow mt="md">
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
            mt="md"
            {...form.getInputProps('languages')}
          />
          <Textarea
            label="Project Context"
            placeholder="What kind of project will the candidate work on? e.g., 'Build an ML model to detect vessels and clouds from satellite imagery.'"
            required
            mt="md"
            minRows={4}
            {...form.getInputProps('projectContext')}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Create JD
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default JdCreate;
