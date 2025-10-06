import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { auth } from '../services/auth';
import type { LoginCredentials } from '../types';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const form = useForm<LoginCredentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      setError('');
      await auth.login(values);
      
      // Get the page they were trying to visit or go to dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container size={420} my={40}>
      <Box ta="center">
        <Title>Welcome back to Bansy!</Title>
        <Text c="dimmed" size="sm" mt={5}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--mantine-color-blue-6)' }}>
            Create account
          </Link>
        </Text>
      </Box>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@company.com"
            required
            {...form.getInputProps('email')}
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
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
