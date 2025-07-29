import axios from 'axios';
import type { LoginCredentials, RegisterData, User, Test, Submission } from '../types';
import { logger } from '../utils/logger';

// Resolve the base API URL. If the environment variable already includes the
// `/api` segment we use it as-is, otherwise we append it so that relative paths
// like `/jds` correctly resolve to `/api/jds` on the backend.  If the env var is
// not provided we fall back to `window.location.origin`, which automatically
// matches the current protocol (http vs https) and host, eliminating cross-
// scheme issues that cause long connection delays when the page is served over
// HTTPS but the API URL points to plain HTTP.

const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
const rawBaseUrl = (import.meta.env.VITE_API_URL as string | undefined) || fallbackOrigin;

const baseURL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  logger.debug('API Request', { 
    method: config.method?.toUpperCase(),
    url: config.url,
    headers: config.headers
  });
  return config;
});

// Add response logging and handle auth errors
api.interceptors.response.use(
  (response) => {
    logger.debug('API Response', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    logger.error('API Error', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data
    });

    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      logger.warn('Authentication error detected, clearing session');
      // Clear invalid session data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page if not already there
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  logger.info('Attempting login', { email: credentials.email });
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    logger.error('Login failed', error);
    throw error;
  }
};

export const register = async (userData: RegisterData): Promise<{ user: User; token: string }> => {
  logger.info('Attempting registration', { email: userData.email });
  try {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    logger.error('Registration failed', error);
    throw error;
  }
};

// Test endpoints
export const createTest = async (testData: Partial<Test>): Promise<Test> => {
  logger.info('Creating test', testData);
  try {
    const { data } = await api.post('/tests', testData);
    return data;
  } catch (error) {
    logger.error('Failed to create test', error);
    throw error;
  }
};

export const getTests = async (): Promise<Test[]> => {
  logger.info('Fetching tests');
  try {
    const { data } = await api.get('/tests');
    return data;
  } catch (error) {
    logger.error('Failed to fetch tests', error);
    throw error;
  }
};

export const getTest = async (id: string): Promise<Test> => {
  logger.info('Fetching test', { id });
  try {
    const { data } = await api.get(`/tests/${id}`);
    return data;
  } catch (error) {
    logger.error('Failed to fetch test', error);
    throw error;
  }
};

// Submission endpoints
export const submitTest = async (testId: string, code: Record<string, unknown>): Promise<Submission> => {
  logger.info('Submitting test', { testId });
  try {
    const { data } = await api.post(`/tests/${testId}/submit`, { code });
    return data;
  } catch (error) {
    logger.error('Failed to submit test', error);
    throw error;
  }
};

export const getSubmission = async (id: string): Promise<Submission> => {
  logger.info('Fetching submission', { id });
  try {
    const { data } = await api.get(`/submissions/${id}`);
    return data;
  } catch (error) {
    logger.error('Failed to fetch submission', error);
    throw error;
  }
};

// Resume and AI endpoints
export const generateProject = async (resumeId: string): Promise<unknown> => {
  logger.info('Generating project', { resumeId });
  try {
    const response = await api.post(`/ai/resume/${resumeId}/generate-project`);
    logger.info('Generate project response:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response.data;
  } catch (error) {
    logger.error('Failed to generate project', error);
    throw error;
  }
};

export const analyzeResume = async (resumeId: string): Promise<unknown> => {
  logger.info('Analyzing resume', { resumeId });
  try {
    const { data } = await api.post(`/ai/resume/${resumeId}/analyze`);
    return data;
  } catch (error) {
    logger.error('Failed to analyze resume', error);
    throw error;
  }
};
export const uploadResume = async (formData: FormData): Promise<{ message: string; resume: { id: string; filename: string; path: string; size: number }; email: string }> => {
  logger.info('Uploading resume', { email: formData.get('email') });
  try {
    // Remove default Content-Type header for file uploads
  delete api.defaults.headers['Content-Type'];

  const { data } = await api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  // Restore default Content-Type header
  api.defaults.headers['Content-Type'] = 'application/json';
    return data;
  } catch (error) {
    logger.error('Failed to upload resume', error);
    throw error;
  }
};

// Assessment Tracking API
export const assessmentTracking = {
  // Get real-time tracking data for a Job Description
  async getTrackingData(jdId: string) {
    const response = await api.get(`/api/jds/${jdId}/tracking`);
    return response.data;
  },

  // Get detailed assessment data for a specific candidate
  async getCandidateAssessment(candidateId: string) {
    const response = await api.get(`/api/jds/candidate/${candidateId}/assessment`);
    return response.data;
  }
};