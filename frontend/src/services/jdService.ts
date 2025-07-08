import { api } from './api';
import type { JobDescription, Test } from '../types';

export const getJds = async (): Promise<JobDescription[]> => {
  const { data } = await api.get('/jds');
  return data;
};

export const getJdById = async (id: string): Promise<JobDescription> => {
  const { data } = await api.get(`/jds/${id}`);
  return data;
};

export const createJd = async (jdData: Partial<JobDescription>): Promise<JobDescription> => {
  const { data } = await api.post('/jds', jdData);
  return data;
};

export const updateJd = async (id: string, jdData: Partial<JobDescription>): Promise<JobDescription> => {
  const { data } = await api.put(`/jds/${id}`, jdData);
  return data;
};

export const deleteJd = async (id: string): Promise<void> => {
  await api.delete(`/jds/${id}`);
};

export const generateProjectForJd = async (jdId: string): Promise<{ 
  message: string; 
  test: Test; 
  githubRepository: string 
}> => {
  const { data } = await api.post(`/ai/jds/${jdId}/generate-project`);
  return data;
};

export const sendTestsToCandiidates = async (jdId: string, candidateIds: string[]): Promise<{
  message: string;
  sentTo: Array<{
    candidateId: string;
    email: string;
    testUrl: string;
  }>;
}> => {
  const { data } = await api.post(`/jds/${jdId}/send-tests`, { candidateIds });
  return data;
};
