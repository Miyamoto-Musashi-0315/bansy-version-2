import { api } from './api';
import type { Candidate } from '../types';

interface ResumeUploadResponse {
  message: string;
  candidate: Candidate;
  analysis: {
    suitabilityScore: number;
    summary: string;
  };
}

export const uploadResumeForJd = async (jdId: string, formData: FormData): Promise<ResumeUploadResponse> => {
  console.log('resumeService: Starting upload for JD:', jdId);
  console.log('resumeService: FormData contents:');
  for (const [key, value] of formData.entries()) {
    console.log(`  ${key}:`, value);
  }
  
  try {
    // Remove default Content-Type header for file uploads
    delete api.defaults.headers['Content-Type'];
    
    const { data } = await api.post(`/jds/${jdId}/resumes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Restore default Content-Type header
    api.defaults.headers['Content-Type'] = 'application/json';
    
    console.log('resumeService: Upload successful, response:', data);
    return data;
  } catch (error) {
    // Restore default Content-Type header even if upload fails
    api.defaults.headers['Content-Type'] = 'application/json';
    throw error;
  }
};
