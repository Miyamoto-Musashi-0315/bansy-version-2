import express from 'express';
import { aiController } from '../controllers/aiController';
import { authenticateUser } from '../middleware/auth';
import { upload } from '../middleware/multer';

const router = express.Router();

// All AI routes are protected
router.use(authenticateUser);

// Analyze a resume for a given Job Description
router.post(
  '/jds/:jdId/analyze-resume',
  upload.single('file'),
  aiController.analyzeResumeForJd
);

// Generate a coding project from a Job Description
router.post('/jds/:jdId/generate-project', aiController.generateProjectForJd);

/*
// Test case generation endpoint - This functionality is not yet implemented in the JD-centric workflow
router.post('/project/:projectId/generate-tests', aiController.generateTestCases);
*/

export default router;
