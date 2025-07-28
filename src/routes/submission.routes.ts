import { Router } from 'express';
import { submissionController } from '../controllers/submissionController';

const router = Router();

router.get('/:submissionId', submissionController.getSubmissionById);

export default router; 