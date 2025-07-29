import express from 'express';
import cors from 'cors';
import { prisma } from './prismaClient';
import authRoutes from './routes/auth';
import testRoutes from './routes/tests';
import resumeRoutes from './routes/resume';
import aiRoutes from './routes/aiRoutes';
import githubRoutes from './routes/github.routes';
import jdRoutes from './routes/jdRoutes';
import submissionRoutes from './routes/submission.routes';
import imageRoutes from './routes/image';

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow requests from any origin in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/jds', jdRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api', imageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
