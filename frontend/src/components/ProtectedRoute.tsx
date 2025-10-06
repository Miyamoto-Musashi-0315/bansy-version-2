import { Navigate, useLocation } from 'react-router-dom';
import { Container, Title, Text } from '@mantine/core';
import { auth } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHR?: boolean;
}

export const ProtectedRoute = ({ children, requireHR = false }: ProtectedRouteProps) => {
  const location = useLocation();

  // Simple local authentication check - no server validation needed for fresh tokens
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check HR permission if required
  const isHR = auth.isHR();
  const user = auth.getUser();

  if (requireHR && !isHR) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Title order={2}>Unauthorized Access</Title>
        <Text c="dimmed">You do not have the required permissions to view this page.</Text>
        <Text size="sm" c="dimmed" mt="md">
          Current user role: {user?.role || 'Unknown'} | Required: HR
        </Text>
      </Container>
    );
  }

  return <>{children}</>;
};
