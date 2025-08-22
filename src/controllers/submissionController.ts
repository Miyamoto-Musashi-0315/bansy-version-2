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

			// Normalize fields for frontend consumption
			const result: any = submission.result || {};
			const normalized = {
				id: submission.id,
				status: submission.status as any,
				results: Array.isArray(result?.results) ? result.results.map((item: any) => ({
          testCase: item.testCase,
          passed: item.passed,
          output: item.output,
          error: item.error,
          title: item.title,
          expected: item.expected,
          actual: item.actual
        })) : [],
				ciCdScore: result?.ciCdScore ?? result?.cicdScore ?? null,
				llmScore: result?.llmScore ?? null,
			};

			return res.json(normalized);
    } catch (error) {
      console.error('Error fetching submission:', error);
      return res.status(500).json({ error: 'Failed to fetch submission' });
    }
  }
}; 