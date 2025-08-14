import { Router } from 'express';
import { jdController } from '../controllers/jdController';
import { authenticateUser } from '../middleware/auth';
import { upload } from '../middleware/multer';

const router = Router();

// All routes are protected
router.use(authenticateUser);

// POST /api/jds - Create a new Job Description
router.post('/', jdController.createJd);

// GET /api/jds - Get all Job Descriptions
router.get('/', jdController.getJds);

// GET /api/jds/:id - Get a single Job Description by ID
router.get('/:id', jdController.getJdById);

// PUT /api/jds/:id - Update a Job Description by ID
router.put('/:id', jdController.updateJd);

// DELETE /api/jds/:id - Delete a Job Description by ID
router.delete('/:id', jdController.deleteJd);

// POST /api/jds/:id/resumes - Upload a resume for a specific JD
router.post('/:id/resumes', upload.single('file'), jdController.uploadResumeForJd);

// POST /api/jds/:id/send-tests - Send test links to selected candidates
router.post('/:id/send-tests', jdController.sendTestsToCandiidates);

// Real-time assessment tracking routes
router.get('/:id/tracking', authenticateUser, jdController.getAssessmentTracking);
router.get('/candidate/:candidateId/assessment', authenticateUser, jdController.getCandidateAssessmentDetails);

// Final assessment results route
router.get('/:id/results', authenticateUser, jdController.getFinalAssessmentResults);

// Repository management routes
router.get('/:id/repositories', jdController.getCandidateRepositories);
router.post('/:id/repositories/archive', jdController.archiveRepositories);
router.get('/candidate/:candidateId/repository-status', jdController.getCandidateRepositoryStatus);

export default router;
