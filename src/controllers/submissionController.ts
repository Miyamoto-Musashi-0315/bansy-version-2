import { Request, Response } from 'express';
import { prisma } from '../prismaClient';

export const submissionController = {
  async getSubmissionById(req: Request, res: Response) {
    try {
      const { submissionId } = req.params;
      const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      return res.json(submission);
    } catch (error) {
      console.error('Error fetching submission:', error);
      return res.status(500).json({ error: 'Failed to fetch submission' });
    }
  }
}; 