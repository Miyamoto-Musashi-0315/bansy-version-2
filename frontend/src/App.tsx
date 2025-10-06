import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MantineProvider, createTheme, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { lazy, Suspense } from 'react';
import { Container, Loader, Box, Text, Button } from '@mantine/core';

// Import critical components directly to avoid lazy loading issues
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import JdDashboard from './pages/JdDashboard';
import { DashboardLayout } from './layouts/DashboardLayout';

// Lazy load less critical components
const JdCreate = lazy(() => import('./pages/JdCreate'));
const JdDetailsPage = lazy(() => import('./pages/JdDetailsPage'));
const JdResumeUpload = lazy(() => import('./pages/JdResumeUpload'));
const JdEdit = lazy(() => import('./pages/JdEdit'));
const TestPage = lazy(() => import('./pages/TestPage').then(module => ({ default: module.TestPage })));
const CandidateAssessmentPage = lazy(() => import('./pages/CandidateAssessmentPage').then(module => ({ default: module.CandidateAssessmentPage })));
const JdAssessmentResultsPage = lazy(() => import('./pages/JdAssessmentResultsPage').then(module => ({ default: module.JdAssessmentResultsPage })));

// Keep ProtectedRoute non-lazy as it's needed for route protection
import { ProtectedRoute } from './components/ProtectedRoute';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

// Loading fallback component
const LoadingFallback = () => {
  console.log('LoadingFallback component rendered - DEBUG');
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Loader size="lg" />
        <Text mt="md">Loading component...</Text>
        <Text size="sm" mt="sm" c="dimmed">This may take a few seconds</Text>
        <Button
          onClick={() => window.location.reload()}
          variant="light"
          size="xs"
          mt="md"
        >
          Refresh Page
        </Button>
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
  console.log('App component rendering - DEBUG');

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <Routes>
          {/* Public routes - no suspense for critical paths */}
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
            <Route path="jds/new" element={
              <Suspense fallback={<LoadingFallback />}>
                <JdCreate />
              </Suspense>
            } />
            <Route path="jds/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <JdDetailsPage />
              </Suspense>
            } />
            <Route path="jds/:id/upload-resume" element={
              <Suspense fallback={<LoadingFallback />}>
                <JdResumeUpload />
              </Suspense>
            } />
            <Route path="jds/:id/edit" element={
              <Suspense fallback={<LoadingFallback />}>
                <JdEdit />
              </Suspense>
            } />
            <Route path="jds/:id/results" element={
              <Suspense fallback={<LoadingFallback />}>
                <JdAssessmentResultsPage />
              </Suspense>
            } />
            <Route path="candidates/:candidateId/assessment" element={
              <Suspense fallback={<LoadingFallback />}>
                <CandidateAssessmentPage />
              </Suspense>
            } />
          </Route>

          {/* Candidate Test Page Route */}
          <Route path="/test/:testId" element={
            <Suspense fallback={<LoadingFallback />}>
              <TestPage />
            </Suspense>
          } />

          {/* Redirect root to dashboard or login */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Redirect old /jds paths to /dashboard */}
          <Route path="/jds" element={<Navigate to="/dashboard" replace />} />
          <Route path="/jds/:id" element={<Navigate to="/dashboard/jds/:id" replace />} />
          
          {/* Redirect any developer portal routes to login */}
          <Route path="/dev/*" element={<Navigate to="/login" replace />} />

          {/* Catch-all route for 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;