import axios from 'axios';
import type { LoginCredentials, RegisterData, User, Test, Submission } from '../types';

// Resolve the base API URL. If the environment variable already includes the
// `/api` segment we use it as-is, otherwise we append it so that relative paths
// like `/jds` correctly resolve to `/api/jds` on the backend.  If the env var is
// not provided we fall back to `/api` which works with Vite's proxy configuration.

const isDevelopment = import.meta.env.DEV;
const rawBaseUrl = (import.meta.env.VITE_API_URL as string | undefined);

let baseURL: string;

if (rawBaseUrl) {
  // If VITE_API_URL is explicitly set, use it
  baseURL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;
} else if (isDevelopment) {
  // In development, use relative path which will be handled by Vite proxy
  baseURL = '/api';
} else {
  // In production, fall back to current origin + /api
  const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
  baseURL = `${fallbackOrigin.replace(/\/+$/, '')}/api`;
}

console.log('API baseURL:', baseURL);

export const api = axios.create({
  baseURL,
  timeout: 10000, // Reduced timeout for better performance
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple cache for API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
const getCachedData = (key: string) => {
  const cached = apiCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

// Helper function to set cached data
const setCachedData = (key: string, data: any) => {
  apiCache.set(key, { data, timestamp: Date.now() });
  // Limit cache size to prevent memory issues
  if (apiCache.size > 50) {
    const firstKey = apiCache.keys().next().value;
    if (firstKey) {
      apiCache.delete(firstKey);
    }
  }
};

// Check if the current page is part of the developer portal
const isDevPortal = () => {
  return window.location.pathname.startsWith('/dev');
};

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  // Use different tokens based on whether we're in the dev portal or not
  if (isDevPortal()) {
    const devToken = localStorage.getItem('devToken');
    if (devToken) {
      console.log('Adding developer token to request:', config.url);
      config.headers.Authorization = `Bearer ${devToken}`;
    } else {
      console.log('No developer token available for request:', config.url);
    }
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response logging and handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle authentication errors differently based on context
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (isDevPortal()) {
        // Clear invalid developer session data
        localStorage.removeItem('devToken');
        localStorage.removeItem('devUser');

        // Redirect to developer login page if not already there
        if (!window.location.pathname.includes('/dev/login')) {
          window.location.href = '/dev/login';
        }
      } else {
        // Clear invalid regular session data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to login page if not already there
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData: RegisterData): Promise<{ user: User; token: string }> => {
  try {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

// Developer auth endpoints
export const devLogin = async (credentials: { username: string; password: string }): Promise<{ user: any; token: string }> => {
  try {
    console.log('Attempting developer login with username:', credentials.username);
    const { data } = await api.post('/auth/dev-login', credentials);
    console.log('Developer login API response:', data);
    
    // Make sure we have a token before storing it
    if (!data.token) {
      console.error('No token received from dev-login endpoint');
      throw new Error('Authentication failed: No token received');
    }
    
    localStorage.setItem('devToken', data.token);
    console.log('Developer token stored in localStorage');
    return data;
  } catch (error) {
    console.error('Developer login error:', error);
    throw error;
  }
};

// Test endpoints
export const createTest = async (testData: Partial<Test>): Promise<Test> => {
  try {
    const { data } = await api.post('/tests', testData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTests = async (): Promise<Test[]> => {
  try {
    // Check cache first
    const cacheKey = 'tests_list';
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const { data } = await api.get('/tests');
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getTest = async (id: string): Promise<Test> => {
  try {
    const { data } = await api.get(`/tests/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Submission endpoints
export const submitTest = async (testId: string, code: Record<string, unknown>): Promise<Submission> => {
  try {
    const { data } = await api.post(`/tests/${testId}/submit`, { code });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubmission = async (id: string): Promise<Submission> => {
  try {
    const { data } = await api.get(`/submissions/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Resume and AI endpoints
export const generateProject = async (resumeId: string): Promise<unknown> => {
  try {
    const response = await api.post(`/ai/resume/${resumeId}/generate-project`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const analyzeResume = async (resumeId: string): Promise<unknown> => {
  try {
    const { data } = await api.post(`/ai/resume/${resumeId}/analyze`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const uploadResume = async (formData: FormData): Promise<{ message: string; resume: { id: string; filename: string; path: string; size: number }; email: string }> => {
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
    throw error;
  }
};

// Assessment Tracking API
export const assessmentTracking = {
  // Get real-time tracking data for a Job Description
  async getTrackingData(jdId: string) {
    const response = await api.get(`/jds/${jdId}/tracking`);
    return response.data;
  },

  // Get detailed assessment data for a specific candidate
  async getCandidateAssessment(candidateId: string) {
    const response = await api.get(`/jds/candidate/${candidateId}/assessment`);
    return response.data;
  }
};

// Monitoring API
export const monitoring = {
  // Get system metrics
  async getMetrics() {
    const response = await api.get('/monitoring/metrics');
    return response.data;
  },
  
  // Get system health status
  async getHealth() {
    const response = await api.get('/monitoring/health');
    return response.data;
  },
  
  // Get recent errors
  async getErrors() {
    const response = await api.get('/monitoring/errors');
    return response.data;
  }
};