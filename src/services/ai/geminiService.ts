import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../../config';

// Initialize the Gemini API client
console.log('Initializing Gemini API with key:', config.geminiApiKey ? '***' + config.geminiApiKey.slice(-4) : 'MISSING API KEY!');
if (!config.geminiApiKey) {
  throw new Error("Missing Gemini API Key in configuration.");
}
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

// Primary and fallback models
const primaryModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Retry mechanism for API calls with exponential backoff
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // If it's a 503 (overloaded) error, retry with exponential backoff
      if (error?.status === 503 && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000; // Add jitter
        console.log(`API overloaded, retrying in ${Math.round(delay)}ms (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors or final attempt, throw the error
      throw error;
    }
  }
  
  throw lastError;
}

/**
 * Generate content with primary model and fallback
 */
async function generateContentWithFallback(prompt: string): Promise<string> {
  try {
    // Try primary model first
    return await withRetry(async () => {
      const result = await primaryModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    });
  } catch (primaryError: any) {
    console.warn('Primary model failed, trying fallback model:', primaryError?.message);
    
    // Try fallback model
    return await withRetry(async () => {
      const result = await fallbackModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    });
  }
}

// --- Interfaces ---

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  yearsOfExperience: number;
}

interface ResumeAnalysis {
  skills: Skill[];
  primaryLanguages: string[];
  overallExperience: string;
  recommendedDifficulty: 'easy' | 'medium' | 'hard';
  yearsOfExperience: string;
  keyProjects: string[];
  githubUsername?: string;
  suggestedRepo?: string;
}

export interface JdForProjectGen {
  title: string;
  description: string;
  minExperience: number;
  maxExperience: number;
  languages: string[];
  projectContext: string;
}

export interface ResumeJdAnalysis {
  suitabilityScore: number; // 0-10 scale
  analysis: {
    strengths: string[];
    weaknesses: string[];
    experienceMatch: string;
    skillMatch: string[];
    languageMatch: string[];
    recommendedRole: string;
    summary: string;
  };
  candidateName?: string;
  candidateEmail?: string;
}

export interface ProjectTemplate {
  title: string;
  description: string;
  difficulty: string;
  language?: string; // For backward compatibility
  languages?: string[]; // New field for multi-language projects
  requirements: string[];
  testCases: {
    input: string | null;
    expectedOutput: string;
    description: string;
    category?: string; // For enhanced test cases
    difficulty?: string; // For enhanced test cases
    points?: number; // For enhanced test cases
    verificationMethod?: string; // For enhanced test cases
  }[];
  projectFiles: Array<{
    path: string;
    content: string;
  }>;
  // New CI/CD and Issues components
  githubWorkflows: Array<{
    path: string; // e.g., '.github/workflows/test.yml'
    content: string; // YAML workflow content
  }>;
  githubIssues: Array<{
    title: string;
    description: string;
    labels: string[]; // e.g., ['feature', 'testing', 'enhancement']
    testCaseIds: number[]; // Maps to testCases array indices
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
  }>;
}

// Interface for GitHub API response (simplified)
interface GithubRepo {
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  size: number;
}

// --- Gemini Service Class ---
export class GeminiService {
  /**
   * Helper function to safely parse JSON from AI response
   */
  private safeParseJson<T>(jsonText: string, context: string): T {
    if (!jsonText || typeof jsonText !== 'string') {
      throw new Error(`Invalid input for ${context}: expected string, got ${typeof jsonText}`);
    }

    // Clean the text first
    let cleanedText = jsonText.trim();
    
    // Remove any markdown code block formatting
    cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    
    // Try direct parsing first
    try {
      return JSON.parse(cleanedText) as T;
    } catch (directError) {
      console.log(`Direct JSON parsing failed for ${context}, trying to extract JSON...`);
      
      try {
        // Find the first opening brace and last closing brace
        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');
        
        if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
          throw new Error('No valid JSON object boundaries found in response');
        }
        
        const extractedJson = cleanedText.substring(firstBrace, lastBrace + 1);
        
        // Try to fix common escape issues
        let fixedJson = extractedJson
          // Fix escaped quotes in strings
          .replace(/\\"/g, '"')
          // Fix escaped backslashes
          .replace(/\\\\/g, '\\')
          // Fix escaped newlines
          .replace(/\\n/g, '\\n')
          // Fix any trailing commas before closing braces/brackets
          .replace(/,(\s*[}\]])/g, '$1');
        
        return JSON.parse(fixedJson) as T;
      } catch (extractError) {
        console.error(`Failed to extract and parse ${context} JSON:`, extractError);
        console.error('Raw text that failed to parse:', cleanedText.substring(0, 500) + '...');
        
        // As a last resort, try to manually fix common JSON issues
        try {
          let lastResortJson = cleanedText
            .substring(cleanedText.indexOf('{'), cleanedText.lastIndexOf('}') + 1)
            // Remove any control characters that might cause issues
            .replace(/[\x00-\x1F\x7F]/g, '')
            // Fix unescaped quotes in string values (basic attempt)
            .replace(/"([^"]*)"([^":,}\]]*)"([^"]*)":/g, '"$1\\"$2\\"$3":')
            // Fix trailing commas
            .replace(/,(\s*[}\]])/g, '$1');
            
          return JSON.parse(lastResortJson) as T;
        } catch (finalError) {
          throw new Error(`Failed to parse ${context} response: ${extractError instanceof Error ? extractError.message : String(extractError)}`);
        }
      }
    }
  }

  /**
   * Analyzes a resume to extract relevant skills and experience
   * @param resumeText The text content of the resume
   * @returns Analysis of the resume including skills and recommended test level
   */
  public async analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
    console.log(`GeminiService: Starting resume analysis. Resume text length: ${resumeText.length}`);
    if (resumeText.length < 50) {
      console.warn(`GeminiService: Resume text is very short. First 100 chars: "${resumeText.substring(0, 100)}"`);
    }
    
    const prompt = `Analyze this resume text for a Software Engineer role and return ONLY a valid JSON object.
Do NOT include any explanatory text before or after the JSON object.
The JSON object must strictly follow this structure:
{
  "skills": [ {"name": "string", "level": "beginner|intermediate|advanced", "yearsOfExperience": number} ],
  "primaryLanguages": ["string", ...],
  "yearsOfExperience": "string (e.g., '5 years', 'Less than 1 year')",
  "keyProjects": ["string", ...],
  "githubUsername": "string | null",
  "overallExperience": "junior|mid|senior",
  "recommendedDifficulty": "easy|medium|hard"
}

Resume text:
---
${resumeText}
---`;

    try {
      const analysisText = await generateContentWithFallback(prompt);
      console.log('GeminiService: Raw analysis response received');

      // Parse the JSON response
      const analysis = this.safeParseJson<Omit<ResumeAnalysis, 'suggestedRepo'>>(analysisText, 'resume analysis');
      console.log('GeminiService: Parsed resume analysis:', JSON.stringify(analysis, null, 2));

      // Find relevant GitHub repository (optional)
      let suggestedRepo: string | undefined;
      try {
        suggestedRepo = await this.findRelevantRepository(
          analysis.skills.map((s) => s.name).concat(analysis.primaryLanguages),
          analysis.keyProjects
        );
      } catch (repoError) {
         console.warn('Could not find relevant repository, using fallback:', repoError);
         suggestedRepo = 'https://github.com/gothinkster/realworld'; // Fallback
      }

      return { ...analysis, suggestedRepo };
    } catch (error) {
      console.error('GeminiService: Error during resume analysis:', error);
      throw new Error(`Resume analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Attempts to find a relevant GitHub repository based on skills/projects.
   */
  private async findRelevantRepository(skills: string[], projects: string[]): Promise<string> {
    console.log('Attempting to find relevant repository...');
    const prompt = `Based on these technical skills and project descriptions, suggest ONE highly relevant, well-maintained open-source GitHub repository URL suitable for a learning/coding challenge.
Consider the primary languages implied by the skills. Return ONLY the single repository URL as a string, nothing else.

Skills: ${skills.join(', ')}
Projects: ${projects.join(', ')}
`;

    try {
      const repoUrl = (await generateContentWithFallback(prompt)).trim();
      
      // Basic URL validation
      if (repoUrl.startsWith('http://') || repoUrl.startsWith('https://')) {
        console.log('Suggested repository found:', repoUrl);
        return repoUrl;
      } else {
         console.warn(`Gemini returned non-URL for repository suggestion: "${repoUrl}". Using fallback.`);
         throw new Error('Invalid URL format from AI');
      }
    } catch (error) {
      console.error('Error finding repository via Gemini:', error);
      return 'https://github.com/gothinkster/realworld'; // Fallback
    }
  }

  /**
   * Generates a coding project from a structured Job Description.
   * @param jd The job description object
   * @returns A project template with requirements and test cases
   */
  public async generateProjectFromJd(jd: JdForProjectGen): Promise<ProjectTemplate> {
    console.log('GeminiService.generateProjectFromJd: Starting project generation for JD:', jd.title);

    const getDifficulty = () => {
      if (jd.maxExperience <= 2) return 'easy';
      if (jd.maxExperience <= 5) return 'medium';
      return 'hard';
    };

    const prompt = `
      Generate a comprehensive, real-world coding project for a technical evaluation based on the following Job Description.

      **JOB DESCRIPTION:**
      - **Job Title:** ${jd.title}
      - **Role Description:** ${jd.description}
      - **Required Languages:** ${jd.languages.join(', ')}
      - **Experience Level Required:** ${jd.minExperience} to ${jd.maxExperience} years.
      - **Project Context:** ${jd.projectContext}

      **PROJECT REQUIREMENTS:**

      **1. ALIGNMENT WITH JOB DESCRIPTION:**
      - The project's domain, complexity, and required skills must directly reflect the provided Job Description.
      - If the context is 'Build an ML model to detect vessels and clouds from satellite imagery,' the project should be exactly that, not a generic web app.

      **2. CODE STRUCTURE & ORGANIZATION:**
      - Generate a realistic project structure with 5-10 files organized into logical directories (e.g., 'src', 'tests', 'data').
      - The total codebase size should be appropriate for the experience level: ${jd.minExperience}-${jd.maxExperience} years -> Aim for 600-1200 lines of code.
      - Include necessary configuration files (e.g., 'package.json', 'requirements.txt'), a 'README.md' with setup instructions, and utility scripts.

      **3. TECHNICAL SPECIFICATIONS:**
      - **Languages:** The project must primarily use the following languages: ${jd.languages.join(', ')}.
      - **Dependencies:** Include a realistic set of 2-4 external libraries or frameworks commonly used for this type of project.
      - **Functionality:** The core logic should be non-trivial and implement the main features described in the "Project Context".

      **4. TESTING & VALIDATION:**
      - Provide a comprehensive test suite with 5-10 test cases.
      - Tests should cover unit tests, integration tests, and edge cases.
      - Include a test runner configuration and instructions on how to run the tests.

      **5. CI/CD AUTOMATION WITH GITHUB ACTIONS:**
      - Generate GitHub Actions workflows that automatically run tests on every push/pull request **AND** can be triggered manually.
      - Each workflow MUST include \`workflow_dispatch\` in its \`on:\` section, e.g. \`on: [push, pull_request, workflow_dispatch]\`, so the platform can dispatch it programmatically.
      - Create workflows that check code quality, run test suites, and validate functionality.
      - Include appropriate setup steps for the chosen languages and dependencies.
      - Configure workflows to report test results and update GitHub Issues based on test outcomes.
      - Use industry-standard CI/CD practices appropriate for the tech stack.

      **6. GITHUB ISSUES FOR FEATURE TRACKING:**
      - Create 3-5 GitHub Issues that represent key features or improvements candidates should implement.
      - Each issue should map to specific test cases that validate the feature.
      - Issues should progressively increase in difficulty (easy → medium → hard).
      - Include clear acceptance criteria and implementation hints.
      - Use appropriate labels (feature, bug, enhancement, testing, etc.).

      **7. INTENTIONAL BUGS & REFACTORING OPPORTUNITIES (Subtle):**
      - Introduce 2-3 subtle bugs or areas for improvement that a candidate at the specified experience level should be able to identify and fix.
      - Examples based on experience:
        - **Junior (0-2 years):** Simple logical errors, inefficient loops, missing error handling.
        - **Mid-level (3-5 years):** Poor data structure choices, non-optimal API calls, moderate design pattern violations.
        - **Senior (5+ years):** Subtle race conditions, potential security vulnerabilities (e.g., input sanitization), minor architectural flaws that hinder scalability.
      - These should not be obvious syntax errors but rather opportunities to demonstrate deeper understanding.

      **OUTPUT FORMAT:**
      Return ONLY a valid JSON object. Do NOT include any explanatory text, code comments, or markdown formatting before or after the JSON object.
      The JSON object must strictly follow this enhanced 'ProjectTemplate' interface:
      {
        "title": "string",
        "description": "string (A summary of the generated project)",
        "difficulty": "${getDifficulty()}",
        "languages": ["${jd.languages.join('", "')}"],
        "requirements": ["string", ... (A list of tasks for the candidate)],
        "projectFiles": [
          { "path": "string (e.g., 'src/main.py')", "content": "string (The full file content)" }
        ],
        "testCases": [
          { "description": "string", "input": "string | null", "expectedOutput": "string", "category": "string (e.g., 'Unit', 'Integration', 'Edge Case')", "difficulty": "string (e.g., 'Easy', 'Medium', 'Hard')", "points": "number", "verificationMethod": "string (e.g., 'Exact Match', 'Contains', 'Regex')" }
        ],
        "githubWorkflows": [
          { "path": "string (e.g., '.github/workflows/test.yml')", "content": "string (Complete YAML workflow content)" }
        ],
        "githubIssues": [
          { "title": "string", "description": "string (Detailed description with acceptance criteria)", "labels": ["string", ...], "testCaseIds": [number, ...], "difficulty": "easy|medium|hard", "points": number }
        ]
      }
      `;

    try {
      console.log('Sending project generation prompt to Gemini for JD:', jd.title);
      const projectText = await generateContentWithFallback(prompt);
      console.log('Raw project response from Gemini received.');

      const formattedProject = this.safeParseJson<ProjectTemplate>(projectText, 'project generation from JD');
      console.log('Project parsed successfully. Title:', formattedProject.title);

      // --- Post-Generation Validation ---
      console.log('Starting post-generation validation...');
      if (!formattedProject.languages || formattedProject.languages.length === 0) {
        console.warn('Generated project missing languages array.');
      }
      if (!formattedProject.projectFiles || formattedProject.projectFiles.length < 3) {
        console.warn(`Generated project has insufficient files: ${formattedProject.projectFiles?.length || 0}`);
      }
      if (!formattedProject.testCases || formattedProject.testCases.length < 3) {
        console.warn(`Generated project has insufficient test cases: ${formattedProject.testCases?.length || 0}`);
      }
      if (!formattedProject.githubWorkflows || formattedProject.githubWorkflows.length === 0) {
        console.warn('Generated project missing GitHub workflows.');
      }
      if (!formattedProject.githubIssues || formattedProject.githubIssues.length < 3) {
        console.warn(`Generated project has insufficient GitHub issues: ${formattedProject.githubIssues?.length || 0}`);
      }

      return formattedProject;
    } catch (error: any) {
      console.error('GeminiService.generateProjectFromJd: Error generating project:', error);
      throw new Error(`Failed to generate project from JD: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Generates additional test cases for a given project template.
   */
  public async generateTestCases(project: ProjectTemplate, count: number = 5): Promise<Array<{input: string | null; expectedOutput: string; description: string}>> {
    console.log(`GeminiService: Generating ${count} test cases for project: ${project.title}`);
    
    const prompt = `Based on this project description and requirements, generate exactly ${count} realistic test cases.

Project: ${project.title}
Description: ${project.description}
Requirements: ${project.requirements.join(', ')}

Return ONLY a valid JSON array of test case objects. Each object should have:
{
  "input": "string or null",
  "expectedOutput": "string", 
  "description": "string"
}

Focus on practical, executable test cases that validate the core functionality.`;

    try {
      const testCasesText = await generateContentWithFallback(prompt);
      const testCases = this.safeParseJson<Array<{input: string | null; expectedOutput: string; description: string}>>(testCasesText, 'test cases');
      
      console.log(`Generated ${testCases.length} test cases successfully`);
      return testCases;
    } catch (error) {
      console.error('Error generating test cases:', error);
      throw new Error(`Failed to generate additional test cases: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Analyzes a resume against a specific Job Description to determine suitability
   * @param resumeText The text content of the resume
   * @param jobDescription The job description object with all details
   * @returns Analysis with suitability score and detailed breakdown
   */
  public async analyzeResumeForJd(resumeText: string, jobDescription: any): Promise<ResumeJdAnalysis> {
    console.log('GeminiService: Starting resume analysis for JD compatibility');
    
    const prompt = `Analyze this resume against the job description and return ONLY a valid JSON object.

Job Description:
Title: ${jobDescription.title}
Description: ${jobDescription.description}
Required Languages: ${jobDescription.languages?.join(', ') || 'Not specified'}
Experience Range: ${jobDescription.minExperience}-${jobDescription.maxExperience} years

Resume Text:
---
${resumeText}
---

Return ONLY a JSON object with this exact structure:
{
  "suitabilityScore": number (0-10 scale),
  "analysis": {
    "strengths": ["string", ...],
    "weaknesses": ["string", ...], 
    "experienceMatch": "string",
    "skillMatch": ["string", ...],
    "languageMatch": ["string", ...],
    "recommendedRole": "string",
    "summary": "string"
  },
  "candidateName": "string or null",
  "candidateEmail": "string or null"
}`;

    try {
      const analysisText = await generateContentWithFallback(prompt);
      const analysis = this.safeParseJson<ResumeJdAnalysis>(analysisText, 'resume-JD analysis');
      
      console.log('Resume-JD analysis completed. Suitability score:', analysis.suitabilityScore);
      return analysis;
    } catch (error) {
      console.error('Error in resume-JD analysis:', error);
      throw new Error(`Resume analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Comprehensive LLM-based code evaluation for candidate repositories (60% scoring component)
   * This is the advanced intelligence layer that evaluates code quality, architecture, and innovation
   * @param repoData Repository information and code content
   * @param jobDescription The job description to evaluate against
   * @param testCases The test cases that should be implemented
   * @returns Detailed code evaluation with 60-point score breakdown
   */
  public async evaluateCodeRepository(repoData: {
    repoUrl: string;
    repoName: string;
    files: Array<{ path: string; content: string }>;
    commitHistory?: Array<{ sha: string; message: string; timestamp: string }>;
    cicdResults?: { passed: number; total: number; details: any };
  }, jobDescription: {
    title: string;
    description: string;
    languages: string[];
    minExperience: number;
    maxExperience: number;
    projectContext: string;
  }, testCases: Array<{
    description: string;
    expectedOutput: string;
    category?: string;
    difficulty?: string;
  }>): Promise<{
    totalScore: number; // 0-60 (out of 60% component)
    breakdown: {
      codeQuality: { score: number; max: 15; feedback: string };
      architecture: { score: number; max: 15; feedback: string };
      innovation: { score: number; max: 10; feedback: string };
      bestPractices: { score: number; max: 10; feedback: string };
      performance: { score: number; max: 5; feedback: string };
      security: { score: number; max: 5; feedback: string };
    };
    overallFeedback: string;
    strengths: string[];
    improvements: string[];
    expertRecommendation: 'hire' | 'strong_consider' | 'consider' | 'pass';
  }> {
    console.log('GeminiService: Starting comprehensive code evaluation for repo:', repoData.repoName);

    // Prepare file contents for analysis
    const fileContents = repoData.files.map(file => 
      `--- FILE: ${file.path} ---\n${file.content}\n`
    ).join('\n');

    const prompt = `You are a Senior Software Engineer conducting a comprehensive code review for a ${jobDescription.title} position. 

**CANDIDATE CONTEXT:**
- Position: ${jobDescription.title}
- Required Experience: ${jobDescription.minExperience}-${jobDescription.maxExperience} years
- Required Languages: ${jobDescription.languages.join(', ')}
- Project Context: ${jobDescription.projectContext}

**REPOSITORY ANALYSIS:**
Repository: ${repoData.repoName}
URL: ${repoData.repoUrl}

**CODE FILES TO ANALYZE:**
${fileContents}

**CI/CD TEST RESULTS:**
${repoData.cicdResults ? `Passed: ${repoData.cicdResults.passed}/${repoData.cicdResults.total} tests` : 'No CI/CD results available'}

**EVALUATION CRITERIA (60 POINTS TOTAL):**

1. **Code Quality (15 points)**: Clean code, readability, documentation, naming conventions, code organization
2. **Architecture & Design (15 points)**: Project structure, design patterns, modularity, scalability considerations
3. **Innovation & Problem Solving (10 points)**: Creative solutions, additional features beyond requirements, algorithmic thinking
4. **Best Practices (10 points)**: Error handling, testing approach, version control usage, dependency management
5. **Performance (5 points)**: Efficiency, optimization, resource usage
6. **Security (5 points)**: Input validation, secure coding practices, vulnerability avoidance

**ANALYSIS REQUIREMENTS:**
- Evaluate against the experience level (${jobDescription.minExperience}-${jobDescription.maxExperience} years)
- Consider the specific role requirements and tech stack
- Provide constructive, actionable feedback
- Be fair but thorough in assessment

Return ONLY a valid JSON object with this EXACT structure:
{
  "totalScore": number (0-60),
  "breakdown": {
    "codeQuality": {
      "score": number (0-15),
      "max": 15,
      "feedback": "detailed analysis of code quality aspects"
    },
    "architecture": {
      "score": number (0-15),
      "max": 15,
      "feedback": "analysis of project structure and design decisions"
    },
    "innovation": {
      "score": number (0-10),
      "max": 10,
      "feedback": "evaluation of creative problem-solving and additional features"
    },
    "bestPractices": {
      "score": number (0-10),
      "max": 10,
      "feedback": "assessment of development best practices"
    },
    "performance": {
      "score": number (0-5),
      "max": 5,
      "feedback": "evaluation of code efficiency and optimization"
    },
    "security": {
      "score": number (0-5),
      "max": 5,
      "feedback": "analysis of security considerations"
    }
  },
  "overallFeedback": "comprehensive summary of the candidate's coding abilities",
  "strengths": ["specific strength 1", "specific strength 2", "..."],
  "improvements": ["specific improvement 1", "specific improvement 2", "..."],
  "expertRecommendation": "hire|strong_consider|consider|pass"
}`;

    try {
      const evaluationText = await generateContentWithFallback(prompt);
      const evaluation = this.safeParseJson<any>(evaluationText, 'code evaluation');
      
      console.log('Code evaluation completed. Total LLM score:', evaluation.totalScore, '/60');
      return evaluation;
    } catch (error) {
      console.error('Error in code evaluation:', error);
      throw new Error(`Code evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate a comprehensive final assessment report combining CI/CD (40%) + LLM evaluation (60%)
   * @param cicdScore Score from automated tests (0-40)
   * @param llmEvaluation LLM evaluation results (0-60)
   * @param candidateInfo Basic candidate information
   * @returns Final hybrid assessment report
   */
  public async generateFinalAssessment(
    cicdScore: number,
    llmEvaluation: any,
    candidateInfo: {
      email: string;
      suitabilityScore: number;
      position: string;
    }
  ): Promise<{
    finalScore: number; // 0-100 (40% CI/CD + 60% LLM)
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
    recommendation: 'Strong Hire' | 'Hire' | 'Consider' | 'No Hire';
    summary: string;
    details: {
      automatedTests: { score: number; percentage: string };
      codeReview: { score: number; percentage: string };
      breakdown: any;
    };
  }> {
    console.log('GeminiService: Generating final assessment report');

    const finalScore = cicdScore + llmEvaluation.totalScore;
    
    // Determine grade based on final score
    let grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
    let recommendation: 'Strong Hire' | 'Hire' | 'Consider' | 'No Hire';

    if (finalScore >= 90) {
      grade = 'A+';
      recommendation = 'Strong Hire';
    } else if (finalScore >= 85) {
      grade = 'A';
      recommendation = 'Strong Hire';
    } else if (finalScore >= 80) {
      grade = 'B+';
      recommendation = 'Hire';
    } else if (finalScore >= 75) {
      grade = 'B';
      recommendation = 'Hire';
    } else if (finalScore >= 70) {
      grade = 'C+';
      recommendation = 'Consider';
    } else if (finalScore >= 65) {
      grade = 'C';
      recommendation = 'Consider';
    } else if (finalScore >= 60) {
      grade = 'D';
      recommendation = 'No Hire';
    } else {
      grade = 'F';
      recommendation = 'No Hire';
    }

    const assessmentPrompt = `Generate a professional final assessment summary for this candidate:

**Candidate**: ${candidateInfo.email}
**Position**: ${candidateInfo.position}
**Resume Suitability**: ${candidateInfo.suitabilityScore}/10
**Final Technical Score**: ${finalScore}/100
**Grade**: ${grade}
**Recommendation**: ${recommendation}

**Score Breakdown**:
- Automated Tests (40%): ${cicdScore}/40
- Code Review (60%): ${llmEvaluation.totalScore}/60

**LLM Evaluation Details**:
${JSON.stringify(llmEvaluation.breakdown, null, 2)}

**Strengths**: ${llmEvaluation.strengths.join(', ')}
**Areas for Improvement**: ${llmEvaluation.improvements.join(', ')}

Create a professional, concise summary (2-3 paragraphs) that:
1. Highlights the candidate's technical performance
2. Notes key strengths and areas for improvement
3. Justifies the recommendation

Return only the summary text, no JSON formatting.`;

    try {
      const summaryText = await generateContentWithFallback(assessmentPrompt);
      
      return {
        finalScore,
        grade,
        recommendation,
        summary: summaryText.trim(),
        details: {
          automatedTests: { 
            score: cicdScore, 
            percentage: `${Math.round((cicdScore / 40) * 100)}%` 
          },
          codeReview: { 
            score: llmEvaluation.totalScore, 
            percentage: `${Math.round((llmEvaluation.totalScore / 60) * 100)}%` 
          },
          breakdown: llmEvaluation.breakdown
        }
      };
    } catch (error) {
      console.error('Error generating final assessment:', error);
      throw new Error(`Final assessment generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
