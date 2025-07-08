export type UserRole = 'HR' | 'CANDIDATE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  difficulty: string;
  gitRepoUrl?: string;
  language: string;
  requirements: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  jobDescriptionId: string;
  jobDescription?: JobDescription;
  testCases?: any[];
  files?: any[];
  submissions?: Submission[];
}

export interface Submission {
  id: string;
  testId: string;
  test?: Test;
  code: Record<string, any>;
  results?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  company?: string;
}

export interface JobDescription {
  id: string;
  title: string;
  description: string;
  minExperience: number;
  maxExperience: number;
  languages: string[];
  projectContext: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  creator?: User;
  test?: Test;
  candidates?: Candidate[];
  _count?: {
    candidates: number;
  };
}

export interface Candidate {
  id: string;
  status: string;
  suitabilityScore?: number;
  suitabilityAnalysis?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  jobDescriptionId: string;
  jobDescription?: JobDescription;
  resumeId: string;
  resume?: Resume;
  analysis?: {
    suitabilityScore: number;
    summary: string;
  };
}

export interface Resume {
  id: string;
  email: string;
  filename: string;
  path: string;
  size: number;
  uploadedAt: string;
  updatedAt: string;
  candidates?: Candidate[];
}