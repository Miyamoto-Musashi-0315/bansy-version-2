import { useState, useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Alert,
  Stack,
  Group,
  Box,
  Code,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { devLogin } from '../services/api';
import { IconAlertCircle, IconTerminal2 } from '@tabler/icons-react';

interface DevLoginFormValues {
  username: string;
  password: string;
}

export function DevLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const devUser = localStorage.getItem('devUser');
    const devToken = localStorage.getItem('devToken');
    
    if (devUser && devToken) {
      navigate('/dev/monitoring');
    }
  }, [navigate]);

  const form = useForm<DevLoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.trim().length > 0 ? null : 'Username is required'),
      password: (value) => (value.trim().length > 0 ? null : 'Password is required'),
    },
  });

  const handleSubmit = async (values: DevLoginFormValues) => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo(null);

      console.log('Submitting developer login with:', { username: values.username });

      const response = await devLogin({
        username: values.username,
        password: values.password,
      });

      console.log('Developer login successful:', response.user);
      
      // Store developer user info and token
      localStorage.setItem('devUser', JSON.stringify(response.user));
      localStorage.setItem('devToken', response.token);
      
      console.log('Token stored:', response.token);

      // Force page reload to ensure clean state
      window.location.href = '/dev/monitoring';
    } catch (err: any) {
      console.error('Developer login error:', err);
      
      const errorMessage = err.response?.data?.error || 'Failed to log in. Please check your credentials.';
      setError(errorMessage);
      
      // Capture debug info
      setDebugInfo({
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Developer Portal
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Monitoring and system administration
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group mb="md" justify="center">
          <IconTerminal2 size={40} color="#228be6" />
        </Group>
        
        {error && (
          <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mb="md">
            {error}
            {debugInfo && (
              <Box mt="sm">
                <Text size="xs" fw={500}>Debug Info:</Text>
                <Code block>{JSON.stringify(debugInfo, null, 2)}</Code>
              </Box>
            )}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Your developer username"
              required
              {...form.getInputProps('username')}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps('password')}
            />
          </Stack>

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in to Developer Portal
          </Button>
        </form>
        
        <Box mt="md">
          <Text size="xs" ta="center" c="dimmed">
            This portal is for authorized developers only.
            <br />
            Unauthorized access attempts will be logged.
          </Text>
          
          <Text size="xs" ta="center" c="dimmed" mt="md">
            Default credentials: vinayak / 123456
          </Text>
        </Box>
      </Paper>
    </Container>
  );
}

export default DevLogin;