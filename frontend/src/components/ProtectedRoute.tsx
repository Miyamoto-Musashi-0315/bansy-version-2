import { Navigate, useLocation } from 'react-router-dom';
import { Container, Title, Text, Loader, Box } from '@mantine/core';
import { auth } from '../services/auth';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireHR?: boolean;
}

// Cache validation result for 5 minutes to avoid repeated API calls
let validationCache = {
  isValid: false,
  timestamp: 0,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

export const ProtectedRoute = ({ children, requireHR = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      // Quick local check first
      if (!auth.isAuthenticated()) {
        setIsValidating(false);
        setIsValid(false);
        return;
      }

      // Check cache first to avoid repeated API calls
      const now = Date.now();
      if (validationCache.timestamp + validationCache.CACHE_DURATION > now) {
        setIsValid(validationCache.isValid);
        setIsValidating(false);
        return;
      }

      try {
        // Validate the token with the backend only if cache is expired
        const tokenIsValid = await auth.validateToken();
        
        // Update cache
        validationCache = {
          isValid: tokenIsValid,
          timestamp: now,
          CACHE_DURATION: validationCache.CACHE_DURATION
        };
        
        setIsValid(tokenIsValid);
      } catch (error) {
        console.warn('Token validation failed:', error);
        setIsValid(false);
        validationCache.isValid = false;
      } finally {
        setIsValidating(false);
      }
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
