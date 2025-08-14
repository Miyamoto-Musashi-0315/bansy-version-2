import { Navigate, useLocation } from 'react-router-dom';
import { Container, Title, Text } from '@mantine/core';
import { auth } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHR?: boolean;
}

export const ProtectedRoute = ({ children, requireHR = false }: ProtectedRouteProps) => {
  const location = useLocation();
  
  console.log('ProtectedRoute: Checking authentication');
  console.log('ProtectedRoute: Current location:', location.pathname);
  console.log('ProtectedRoute: requireHR:', requireHR);
  
  // Send log to backend
  fetch('/api/debug-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'PROTECTED_ROUTE',
      message: `Checking auth for ${location.pathname}, requireHR: ${requireHR}`,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
  
  // Simple local authentication check - no server validation needed for fresh tokens
  const isAuthenticated = auth.isAuthenticated();
  console.log('ProtectedRoute: isAuthenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('ProtectedRoute: Not authenticated - redirecting to login');
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'AUTH_REDIRECT',
        message: 'User not authenticated, redirecting to login',
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check HR permission if required
  const isHR = auth.isHR();
  const user = auth.getUser();
  console.log('ProtectedRoute: User:', user);
  console.log('ProtectedRoute: isHR:', isHR);
  
  fetch('/api/debug-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'AUTH_CHECK',
      message: `User: ${user?.email}, Role: ${user?.role}, isHR: ${isHR}, requireHR: ${requireHR}`,
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
  
  if (requireHR && !isHR) {
    console.log('ProtectedRoute: HR access required but user is not HR');
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

  console.log('ProtectedRoute: Authentication successful - rendering dashboard');
  fetch('/api/debug-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'AUTH_SUCCESS',
      message: 'Authentication successful, rendering protected content',
      timestamp: new Date().toISOString()
    })
  }).catch(console.error);
  
  return <>{children}</>;
};
