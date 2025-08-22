import { api } from './api';
import { AxiosError } from 'axios';

/**
 * Get assessment details for a specific candidate
 */
export const getCandidateAssessment = async (candidateId: string) => {
  try {
    console.log(`🔍 DEBUG: Fetching assessment for candidate: ${candidateId}`);
    console.time(`candidate-assessment-${candidateId}`);
    const { data } = await api.get(`/jds/candidate/${candidateId}/assessment`);
    console.log('✅ DEBUG: Received candidate assessment data:', data);
    console.timeEnd(`candidate-assessment-${candidateId}`);
    return data;
  } catch (error: unknown) {
    console.error('❌ DEBUG: Error fetching candidate assessment:', error);
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('❌ DEBUG: Response data:', error.response.data);
        console.error('❌ DEBUG: Response status:', error.response.status);
        console.error('❌ DEBUG: Response headers:', error.response.headers);
        throw new Error(`Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        console.error('❌ DEBUG: No response received:', error.request);
        throw new Error('No response received from server. Please check your network connection.');
      }
    }
    throw error;
  }
};

/**
 * Get final assessment results for all candidates of a job description
 */
export const getJdAssessmentResults = async (jdId: string) => {
  try {
    console.log(`🔍 DEBUG: Fetching assessment results for JD: ${jdId}`);
    console.time(`jd-assessment-${jdId}`);
    
    // Log request details
    console.log(`🔍 DEBUG: Making GET request to: /jds/${jdId}/results`);
    console.log(`🔍 DEBUG: API base URL: ${api.defaults.baseURL}`);
    console.log(`🔍 DEBUG: Headers:`, api.defaults.headers);
    
    const { data } = await api.get(`/jds/${jdId}/results`);
    
    console.log(`✅ DEBUG: Received JD assessment data (${typeof data}):`, data);
    console.log(`✅ DEBUG: Data has candidates: ${Boolean(data?.candidates)}, count: ${data?.candidates?.length || 0}`);
    console.log(`✅ DEBUG: Data has overview: ${Boolean(data?.overview)}`);
    console.timeEnd(`jd-assessment-${jdId}`);
    
    return data;
  } catch (error: unknown) {
    console.error(`❌ DEBUG: Error fetching JD assessment results for ID ${jdId}:`, error);
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('❌ DEBUG: Response data:', error.response.data);
        console.error('❌ DEBUG: Response status:', error.response.status);
        console.error('❌ DEBUG: Response headers:', error.response.headers);
        throw new Error(`Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        console.error('❌ DEBUG: No response received:', error.request);
        throw new Error('No response received from server. Please check your network connection.');
      }
    }
    throw error;
  }
};

/**
 * Manually trigger LLM evaluation for a candidate
 */
export const triggerLlmEvaluation = async (candidateId: string, repoUrl: string) => {
  try {
    console.log(`🔍 DEBUG: Manually triggering LLM evaluation for candidate: ${candidateId}`);
    console.time(`llm-evaluation-${candidateId}`);
    const { data } = await api.post(`/jds/candidate/${candidateId}/evaluate`, { 
      repoUrl 
    });
    console.log('✅ DEBUG: LLM evaluation triggered:', data);
    console.timeEnd(`llm-evaluation-${candidateId}`);
    return data;
  } catch (error: unknown) {
    console.error('❌ DEBUG: Error triggering LLM evaluation:', error);
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('❌ DEBUG: Response data:', error.response.data);
        console.error('❌ DEBUG: Response status:', error.response.status);
        throw new Error(`Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        console.error('❌ DEBUG: No response received:', error.request);
        throw new Error('No response received from server. Please check your network connection.');
      }
    }
    throw error;
  }
};

const assessmentService = {
  getCandidateAssessment,
  getJdAssessmentResults,
  triggerLlmEvaluation
};

export default assessmentService; 