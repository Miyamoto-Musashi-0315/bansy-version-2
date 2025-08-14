import axios from 'axios';

export interface Test {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  language: string;
  requirements: { requirements: string[] };
  gitRepoUrl?: string;
  testCases: Array<{
    input: string | null;
    expectedOutput: string;
    description: string;
  }>;
}

interface SubmissionResult {
  submissionId?: string;
  id?: string;
  status: 'success' | 'failure' | 'pending' | 'completed' | 'failed';
  results?: Array<{
    testCase: number;
    passed: boolean;
    output?: string;
    error?: string;
  }>;
  llmScore?: number;
  ciCdScore?: number;
}

type SubmissionDetails = SubmissionResult & {
  llmEvaluation?: unknown;
};

export const testService = {
  // Fetch a specific test by ID
  async getTest(testId: string): Promise<Test> {
    const response = await axios.get(`/api/tests/${testId}`);
    return response.data;
  },

  // NEW: Get latest submission for a test (normalized)
  async getLatestSubmissionForTest(testId: string): Promise<SubmissionDetails | null> {
    const response = await axios.get(`/api/tests/${testId}/latest-submission`);
    return response.data;
  },

  // Submit a solution for testing
  async submitSolution(testId: string, files: Record<string, string>): Promise<SubmissionResult> {
    const response = await axios.post(`/api/tests/${testId}/submit`, { files });
    return response.data;
  },

  // Run tests using the GitHub repository code
  async runTests(testId: string): Promise<SubmissionResult> {
    const response = await axios.post(`/api/tests/${testId}/run`);
    return response.data;
  },

  // Fetch a submission by ID (CI + LLM results)
  async getSubmission(submissionId: string): Promise<SubmissionDetails> {
    const response = await axios.get(`/api/submissions/${submissionId}`);
    return response.data;
  }
};
