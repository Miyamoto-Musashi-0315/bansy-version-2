import { Navigate, useLocation } from 'react-router-dom';
import { Container, Title, Text, Loader, Box } from '@mantine/core';
import { auth } from '../services/auth';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHR?: boolean;
}

export const ProtectedRoute = ({ children, requireHR = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      if (!auth.isAuthenticated()) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      // Validate the token with the backend
      const tokenIsValid = await auth.validateToken();
      setIsValid(tokenIsValid);
      setIsValidating(false);
    };

    validateSession();
  }, []);

  // Show loading spinner while validating
  if (isValidating) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Box>
          <Loader size="lg" />
          <Text mt="md" c="dimmed">Validating session...</Text>
        </Box>
      </Container>
    );
  }

  // Redirect to login if not authenticated or token is invalid
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireHR && !auth.isHR()) {
    // Show an unauthorized message instead of redirecting to prevent loops
    return (
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Title order={2}>Unauthorized Access</Title>
        <Text c="dimmed">You do not have the required permissions to view this page.</Text>
      </Container>
    );
  }

  return <>{children}</>;
};
