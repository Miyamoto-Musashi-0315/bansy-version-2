import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MantineProvider, createTheme, Title, Button } from '@mantine/core';
import '@mantine/core/styles.css';
import { lazy, Suspense } from 'react';
import { Container, Loader, Box, Text } from '@mantine/core';
import React from 'react'; // Added missing import for React

// Lazy load heavy components to reduce initial bundle size
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
// const JdDashboard = lazy(() => import('./pages/JdDashboard'));
// const DashboardLayout = lazy(() => import('./layouts/DashboardLayout').then(module => ({ default: module.DashboardLayout })));
const JdCreate = lazy(() => import('./pages/JdCreate'));
const JdDetailsPage = lazy(() => import('./pages/JdDetailsPage'));
const JdResumeUpload = lazy(() => import('./pages/JdResumeUpload'));
const JdEdit = lazy(() => import('./pages/JdEdit'));
const TestPage = lazy(() => import('./pages/TestPage').then(module => ({ default: module.TestPage })));
const CandidateAssessmentPage = lazy(() => import('./pages/CandidateAssessmentPage').then(module => ({ default: module.CandidateAssessmentPage })));
const JdAssessmentResultsPage = lazy(() => import('./pages/JdAssessmentResultsPage').then(module => ({ default: module.JdAssessmentResultsPage })));

// Eagerly import critical layout and default dashboard to avoid Suspense hang on first render
import JdDashboard from './pages/JdDashboard';
import { DashboardLayout } from './layouts/DashboardLayout';

// Keep ProtectedRoute non-lazy as it's needed for route protection
import { ProtectedRoute } from './components/ProtectedRoute';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

// Loading fallback component
const LoadingFallback = () => {
  console.log('LoadingFallback: Rendering suspense fallback');
  
  // Send log to backend
  React.useEffect(() => {
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'LOADING_FALLBACK',
        message: 'Suspense fallback is showing (lazy loading component)',
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  }, []);
  
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Loader size="lg" />
        <Text mt="md">Loading component...</Text>
      </Box>
    </Container>
  );
};

// Create a NotFound component
const NotFound = () => (
  <Container style={{ textAlign: 'center', marginTop: '50px' }}>
    <Title order={2} mb="md">Page Not Found</Title>
    <Text mb="xl">The page you're looking for doesn't exist or has been moved.</Text>
    <Button component={Link} to="/dashboard">
      Return to Dashboard
    </Button>
  </Container>
);

function App() {
  console.log('App: Component rendering');
  
  // Send log to backend
  React.useEffect(() => {
    fetch('/api/debug-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'APP_RENDER',
        message: 'App component mounted and rendering',
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected HR routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireHR>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<JdDashboard />} />
              <Route path="jds/new" element={<JdCreate />} />
              <Route path="jds/:id" element={<JdDetailsPage />} />
              <Route path="jds/:id/upload-resume" element={<JdResumeUpload />} />
              <Route path="jds/:id/edit" element={<JdEdit />} />
              <Route path="jds/:id/results" element={<JdAssessmentResultsPage />} />
              <Route path="candidates/:candidateId/assessment" element={<CandidateAssessmentPage />} />
            </Route>

            {/* Candidate Test Page Route */}
            <Route path="/test/:testId" element={<TestPage />} />

            {/* Redirect root to dashboard or login */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
            
            {/* Redirect old /jds paths to /dashboard */}
            <Route path="/jds" element={<Navigate to="/dashboard" replace />} />
            <Route path="/jds/:id" element={<Navigate to="/dashboard/jds/:id" replace />} />

            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
