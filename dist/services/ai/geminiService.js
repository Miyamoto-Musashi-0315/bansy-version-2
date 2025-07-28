"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../../config");
// Initialize the Gemini API client
console.log('Initializing Gemini API with key:', config_1.config.geminiApiKey ? '***' + config_1.config.geminiApiKey.slice(-4) : 'MISSING API KEY!');
if (!config_1.config.geminiApiKey) {
    throw new Error("Missing Gemini API Key in configuration.");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.config.geminiApiKey);
// Primary and fallback models
const primaryModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
const fallbackModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
/**
 * Retry mechanism for API calls with exponential backoff
 */
async function withRetry(operation, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
            // If it's a 503 (overloaded) error, retry with exponential backoff
            if ((error === null || error === void 0 ? void 0 : error.status) === 503 && attempt < maxRetries) {
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
async function generateContentWithFallback(prompt) {
    try {
        // Try primary model first
        return await withRetry(async () => {
            const result = await primaryModel.generateContent(prompt);
            const response = await result.response;
            return response.text();
        });
    }
    catch (primaryError) {
        console.warn('Primary model failed, trying fallback model:', primaryError === null || primaryError === void 0 ? void 0 : primaryError.message);
        // Try fallback model
        return await withRetry(async () => {
            const result = await fallbackModel.generateContent(prompt);
            const response = await result.response;
            return response.text();
        });
    }
}
// --- Gemini Service Class ---
class GeminiService {
    /**
     * Helper function to safely parse JSON from AI response
     */
    safeParseJson(jsonText, context) {
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
            return JSON.parse(cleanedText);
        }
        catch (directError) {
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
                return JSON.parse(fixedJson);
            }
            catch (extractError) {
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
                    return JSON.parse(lastResortJson);
                }
                catch (finalError) {
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
    async analyzeResume(resumeText) {
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
            const analysis = this.safeParseJson(analysisText, 'resume analysis');
            console.log('GeminiService: Parsed resume analysis:', JSON.stringify(analysis, null, 2));
            // Find relevant GitHub repository (optional)
            let suggestedRepo;
            try {
                suggestedRepo = await this.findRelevantRepository(analysis.skills.map((s) => s.name).concat(analysis.primaryLanguages), analysis.keyProjects);
            }
            catch (repoError) {
                console.warn('Could not find relevant repository, using fallback:', repoError);
                suggestedRepo = 'https://github.com/gothinkster/realworld'; // Fallback
            }
            return { ...analysis, suggestedRepo };
        }
        catch (error) {
            console.error('GeminiService: Error during resume analysis:', error);
            throw new Error(`Resume analysis failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Attempts to find a relevant GitHub repository based on skills/projects.
     */
    async findRelevantRepository(skills, projects) {
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
            }
            else {
                console.warn(`Gemini returned non-URL for repository suggestion: "${repoUrl}". Using fallback.`);
                throw new Error('Invalid URL format from AI');
            }
        }
        catch (error) {
            console.error('Error finding repository via Gemini:', error);
            return 'https://github.com/gothinkster/realworld'; // Fallback
        }
    }
    /**
     * Generates a coding project from a structured Job Description.
     * @param jd The job description object
     * @returns A project template with requirements and test cases
     */
    async generateProjectFromJd(jd) {
        var _a, _b, _c;
        console.log('GeminiService.generateProjectFromJd: Starting project generation for JD:', jd.title);
        const getDifficulty = () => {
            if (jd.maxExperience <= 2)
                return 'easy';
            if (jd.maxExperience <= 5)
                return 'medium';
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
      - Generate GitHub Actions workflows that automatically run tests on every push/pull request.
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
            const formattedProject = this.safeParseJson(projectText, 'project generation from JD');
            console.log('Project parsed successfully. Title:', formattedProject.title);
            // --- Post-Generation Validation ---
            console.log('Starting post-generation validation...');
            if (!formattedProject.languages || formattedProject.languages.length === 0) {
                console.warn('Generated project missing languages array.');
            }
            if (!formattedProject.projectFiles || formattedProject.projectFiles.length < 3) {
                console.warn(`Generated project has insufficient files: ${((_a = formattedProject.projectFiles) === null || _a === void 0 ? void 0 : _a.length) || 0}`);
            }
            if (!formattedProject.testCases || formattedProject.testCases.length < 3) {
                console.warn(`Generated project has insufficient test cases: ${((_b = formattedProject.testCases) === null || _b === void 0 ? void 0 : _b.length) || 0}`);
            }
            if (!formattedProject.githubWorkflows || formattedProject.githubWorkflows.length === 0) {
                console.warn('Generated project missing GitHub workflows.');
            }
            if (!formattedProject.githubIssues || formattedProject.githubIssues.length < 3) {
                console.warn(`Generated project has insufficient GitHub issues: ${((_c = formattedProject.githubIssues) === null || _c === void 0 ? void 0 : _c.length) || 0}`);
            }
            return formattedProject;
        }
        catch (error) {
            console.error('GeminiService.generateProjectFromJd: Error generating project:', error);
            throw new Error(`Failed to generate project from JD: ${(error === null || error === void 0 ? void 0 : error.message) || 'Unknown error'}`);
        }
    }
    /**
     * Generates additional test cases for a given project template.
     */
    async generateTestCases(project, count = 5) {
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
            const testCases = this.safeParseJson(testCasesText, 'test cases');
            console.log(`Generated ${testCases.length} test cases successfully`);
            return testCases;
        }
        catch (error) {
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
    async analyzeResumeForJd(resumeText, jobDescription) {
        var _a;
        console.log('GeminiService: Starting resume analysis for JD compatibility');
        const prompt = `Analyze this resume against the job description and return ONLY a valid JSON object.

Job Description:
Title: ${jobDescription.title}
Description: ${jobDescription.description}
Required Languages: ${((_a = jobDescription.languages) === null || _a === void 0 ? void 0 : _a.join(', ')) || 'Not specified'}
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
            const analysis = this.safeParseJson(analysisText, 'resume-JD analysis');
            console.log('Resume-JD analysis completed. Suitability score:', analysis.suitabilityScore);
            return analysis;
        }
        catch (error) {
            console.error('Error in resume-JD analysis:', error);
            throw new Error(`Resume analysis failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
exports.GeminiService = GeminiService;
