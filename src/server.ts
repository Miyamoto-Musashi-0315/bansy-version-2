import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import codeServerRoutes from './routes/codeServer';
import authRoutes from './routes/auth';
import testsRoutes from './routes/tests';
import submissionRoutes from './routes/submission.routes';
import resumeRoutes from './routes/resume';
import jdRoutes from './routes/jdRoutes';
import webhookRoutes from './routes/webhook.routes';
import githubRoutes from './routes/github.routes';
import aiRoutes from './routes/aiRoutes';
import monitoringRoutes from './routes/monitoring.routes';
import { config } from './config';
import { monitoringMiddleware } from './middleware/monitoring';
import { checkAlerts } from './services/alertService';

const app = express();
const PORT = process.env.PORT || 3001;

// Set up CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Apply monitoring middleware to track performance metrics
app.use(monitoringMiddleware);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/code-server', codeServerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/jds', jdRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/monitoring', monitoringRoutes);

// Debug logging endpoint for frontend errors (temporarily disabled for performance)
app.post('/api/debug-log', (req, res) => {
  // Disabled for performance - can be re-enabled in development if needed
  res.status(200).json({ logged: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Create HTTP server
const server = createServer(app);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API base URL: ${config.apiBaseUrl}`);
  console.log(`JWT Secret available: ${Boolean(config.jwtSecret)}`);
});

// Set up alert checking interval (every 5 minutes)
setInterval(() => {
  checkAlerts().catch(err => {
    console.error('Error checking alerts:', err);
  });
}, 5 * 60 * 1000);

export default server;