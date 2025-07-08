import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { auth } from '../services/auth';
import type { RegisterData } from '../types';

export function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const form = useForm<RegisterData>({
    initialValues: {
      email: '',
      password: '',
      name: '',
      company: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      name: (value) => (value.length >= 2 ? null : 'Name must be at least 2 characters'),
    },
  });

  const handleSubmit = async (values: RegisterData) => {
    try {
      setError('');
      await auth.register(values);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container size={420} my={40}>
      <Box ta="center">
        <Title>Create your account</Title>
        <Text c="dimmed" size="sm" mt={5}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--mantine-color-blue-6)' }}>
            Sign in
          </Link>
        </Text>
      </Box>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="you@company.com"
            required
            mt="md"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Company"
            placeholder="Your company name"
            mt="md"
            {...form.getInputProps('company')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />

          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <Button fullWidth mt="xl" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
