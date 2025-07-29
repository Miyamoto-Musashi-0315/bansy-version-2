import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { lazy, Suspense } from 'react';
import { Container, Loader, Box } from '@mantine/core';

// Lazy load heavy components to reduce initial bundle size
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
const JdDashboard = lazy(() => import('./pages/JdDashboard'));
const JdCreate = lazy(() => import('./pages/JdCreate'));
const JdDetailsPage = lazy(() => import('./pages/JdDetailsPage'));
const JdResumeUpload = lazy(() => import('./pages/JdResumeUpload'));
const JdEdit = lazy(() => import('./pages/JdEdit'));
const TestPage = lazy(() => import('./pages/TestPage').then(module => ({ default: module.TestPage })));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout').then(module => ({ default: module.DashboardLayout })));

// Keep ProtectedRoute non-lazy as it's needed for route protection
import { ProtectedRoute } from './components/ProtectedRoute';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

// Loading fallback component
const LoadingFallback = () => (
  <Container style={{ textAlign: 'center', marginTop: '50px' }}>
    <Box>
      <Loader size="lg" />
    </Box>
  </Container>
);

function App() {
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
            </Route>

            {/* Candidate Test Page Route */}
            <Route path="/test/:testId" element={<TestPage />} />

            {/* Redirect root to dashboard or login */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
