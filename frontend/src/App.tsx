import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import JdDashboard from './pages/JdDashboard';
import JdCreate from './pages/JdCreate';
import JdDetailsPage from './pages/JdDetailsPage';
import JdResumeUpload from './pages/JdResumeUpload';
import JdEdit from './pages/JdEdit';
import { TestPage } from './pages/TestPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
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
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
