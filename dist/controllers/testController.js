"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testController = void 0;
const prismaClient_1 = require("../prismaClient");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const util = __importStar(require("util"));
/**
 * Controller for handling test-related operations
 */
exports.testController = {
    /**
     * Clone a GitHub repository and run tests against it
     */
    async runTests(req, res) {
        var _a, _b;
        try {
            const { testId } = req.params;
            const execPromise = util.promisify(child_process_1.exec);
            // Get test and test cases from database
            const test = await prismaClient_1.prisma.test.findUnique({
                where: { id: testId },
                include: { testCases: true }
            });
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            if (!test.gitRepoUrl) {
                return res.status(400).json({ error: 'No Git repository URL found for this test' });
            }
            // Prepare the response object
            const testResults = {
                status: 'failure',
                results: []
            };
            // Create a temporary directory for the test
            const tempDir = path.join(os.tmpdir(), `test-${testId}-${Date.now()}`);
            console.log(`Creating temp directory: ${tempDir}`);
            try {
                // Create the directory
                fs.mkdirSync(tempDir, { recursive: true });
                // Validate and sanitize repository URL
                const gitRepoUrl = test.gitRepoUrl.trim();
                // Enhanced logging about the repository
                console.log('===================== REPOSITORY DEBUG INFO =====================');
                console.log(`Test ID: ${test.id}`);
                console.log(`Git Repo URL from DB: ${gitRepoUrl}`);
                console.log(`Test title: ${test.title}`);
                console.log(`Test language: ${test.language}`);
                // Verify the URL format
                const urlPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\.git)?$/;
                const urlMatch = gitRepoUrl.match(urlPattern);
                if (urlMatch) {
                    const [, orgName, repoName] = urlMatch;
                    console.log(`Organization name parsed from URL: ${orgName}`);
                    console.log(`Repository name parsed from URL: ${repoName.replace('.git', '')}`);
                }
                else {
                    console.warn('URL does not match expected GitHub repository URL pattern');
                }
                console.log('===============================================================');
                // Check if URL contains placeholder user IDs which indicate test data
                if (gitRepoUrl.includes('00000000-0000-0000-0000-000000000000')) {
                    console.warn('Repository URL contains placeholder user ID. This might be test data.');
                    return res.status(400).json({
                        error: 'Invalid repository URL. Please ensure a valid repository has been created for this test.'
                    });
                }
                // Log the repository URL we're about to clone
                console.log(`Attempting to clone repo: ${gitRepoUrl}`);
                // Try a simple HTTP request to verify the repo exists first
                try {
                    // Remove .git extension if present for the verification
                    const apiUrl = gitRepoUrl
                        .replace('github.com', 'api.github.com/repos')
                        .replace(/\.git$/, '');
                    console.log(`Verifying repository existence with GitHub API: ${apiUrl}`);
                    const verifyResponse = await axios_1.default.get(apiUrl, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'Bansy-Assessment-Platform'
                        },
                        validateStatus: (status) => status < 500 // Don't throw on 404
                    });
                    console.log(`GitHub API response status: ${verifyResponse.status}`);
                    if (verifyResponse.status === 404) {
                        console.error('Repository URL is valid, but GitHub reports the repository does not exist.');
                        console.log('This might be due to:');
                        console.log('1. The repository was deleted');
                        console.log('2. The repository is private and the access token is missing or invalid');
                        console.log('3. The organization or repository name has a typo');
                        return res.status(404).json({
                            error: 'Repository not found on GitHub. The repository may exist in our database but is not accessible on GitHub.'
                        });
                    }
                    console.log('Repository verified as existing on GitHub');
                }
                catch (verifyError) {
                    console.error('Error verifying repository existence:', verifyError.message);
                    // Continue with clone attempt even if verification fails
                }
                // Try to clone the repository directly - if it fails, provide helpful error
                try {
                    console.log(`Running git clone command: git clone ${gitRepoUrl} ${tempDir}`);
                    const cloneResult = await execPromise(`git clone ${gitRepoUrl} ${tempDir}`);
                    console.log('Repository cloned successfully');
                    if (cloneResult.stdout)
                        console.log('Clone stdout:', cloneResult.stdout);
                    if (cloneResult.stderr)
                        console.log('Clone stderr:', cloneResult.stderr);
                }
                catch (cloneError) {
                    console.error('Error cloning repository:', cloneError.message);
                    console.error('Clone command failed with:');
                    if (cloneError.stdout)
                        console.error('stdout:', cloneError.stdout);
                    if (cloneError.stderr)
                        console.error('stderr:', cloneError.stderr);
                    // Check if the tempDir exists and what's in it
                    try {
                        if (fs.existsSync(tempDir)) {
                            console.log(`Temp directory ${tempDir} exists. Contents:`, fs.readdirSync(tempDir));
                        }
                        else {
                            console.log(`Temp directory ${tempDir} does not exist.`);
                        }
                    }
                    catch (fsError) {
                        console.error('Error checking temp directory:', fsError);
                    }
                    // Check the specific error message to provide better feedback
                    if (cloneError.message.includes('not found')) {
                        return res.status(404).json({
                            error: 'Repository not found on GitHub. The repository may not exist or you may not have access to it.'
                        });
                    }
                    else if (cloneError.message.includes('Authentication failed')) {
                        return res.status(401).json({
                            error: 'Authentication failed when accessing the repository. Please check your GitHub credentials.'
                        });
                    }
                    else {
                        return res.status(500).json({
                            error: `Failed to clone repository: ${cloneError.message}`
                        });
                    }
                }
                // Execute tests against the code in the repository
                let passedTests = 0;
                // Determine the main file based on language
                const language = test.language.toLowerCase();
                let mainFile;
                if (language === 'python') {
                    mainFile = 'main.py';
                }
                else if (language === 'javascript') {
                    mainFile = 'main.js';
                }
                else if (language === 'typescript') {
                    mainFile = 'main.ts';
                }
                else if (language === 'java') {
                    mainFile = 'Main.java';
                }
                else {
                    mainFile = 'main'; // Default
                }
                // Check if the main file exists
                const mainFilePath = path.join(tempDir, mainFile);
                if (!fs.existsSync(mainFilePath)) {
                    throw new Error(`Main file ${mainFile} not found in repository`);
                }
                // Run each test case using the execution service
                for (let i = 0; i < test.testCases.length; i++) {
                    const testCase = test.testCases[i];
                    console.log(`Running test case ${i + 1}/${test.testCases.length}`);
                    try {
                        // Prepare payload for execution service
                        const payload = {
                            language: test.language,
                            code: fs.readFileSync(mainFilePath, 'utf8'),
                            input: testCase.input || '',
                            testCase: {
                                expectedOutput: testCase.expectedOutput,
                                description: testCase.description
                            }
                        };
                        console.log(`Executing test case ${i + 1} with payload:`, JSON.stringify(payload, null, 2));
                        // Execute the code using the execution service
                        const executionResponse = await axios_1.default.post(`${config_1.config.executionServiceUrl}/execute`, payload);
                        const result = executionResponse.data;
                        console.log(`Execution service response for test case ${i + 1}:`, JSON.stringify(result, null, 2));
                        if (result.passed) {
                            passedTests++;
                            testResults.results.push({
                                testCase: i,
                                passed: true,
                                output: result.output || "Test passed successfully."
                            });
                        }
                        else {
                            testResults.results.push({
                                testCase: i,
                                passed: false,
                                output: result.output || "",
                                error: result.error || `Expected: ${testCase.expectedOutput}`
                            });
                        }
                    }
                    catch (error) {
                        console.error(`Error executing test case ${i + 1}:`, error.message);
                        if (error.response) {
                            console.error('Execution service error response status:', error.response.status);
                            console.error('Execution service error response data:', JSON.stringify(error.response.data, null, 2));
                        }
                        testResults.results.push({
                            testCase: i,
                            passed: false,
                            error: `Error executing test: ${error.message || 'Unknown error'}`,
                            // Include execution service error details if available
                            ...(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) && { executionServiceError: error.response.data })
                        });
                    }
                }
                // Update final status
                if (passedTests === test.testCases.length) {
                    testResults.status = 'success';
                }
                // Save test run result to database
                await prismaClient_1.prisma.submission.create({
                    data: {
                        status: testResults.status,
                        result: testResults,
                        testId: test.id,
                        userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id // Add user ID if available
                    }
                });
                // Clean up temporary directory
                try {
                    fs.rmSync(tempDir, { recursive: true, force: true });
                }
                catch (cleanupError) {
                    console.error('Error cleaning up temp directory:', cleanupError);
                }
                return res.json(testResults);
            }
            catch (error) {
                console.error('Error running tests from repository:', error);
                return res.status(500).json({
                    error: `Failed to run tests: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        }
        catch (error) {
            console.error('Error running tests:', error);
            return res.status(500).json({ error: 'Failed to run tests' });
        }
    },
    /**
     * Submit a final solution for a test
     */
    async submitSolution(req, res) {
        var _a;
        try {
            const { testId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            // Get test from database
            const test = await prismaClient_1.prisma.test.findUnique({
                where: { id: testId },
                include: { testCases: true }
            });
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            if (!test.gitRepoUrl) {
                return res.status(400).json({ error: 'No Git repository URL found for this test' });
            }
            // Run the tests on the repository code (reusing the same logic as runTests)
            // This ensures we're testing the final solution as committed to GitHub
            const execPromise = util.promisify(child_process_1.exec);
            // Create a temporary directory for the test
            const tempDir = path.join(os.tmpdir(), `submission-${testId}-${Date.now()}`);
            console.log(`Creating temp directory for submission: ${tempDir}`);
            try {
                // Create the directory
                fs.mkdirSync(tempDir, { recursive: true });
                // Validate and sanitize repository URL
                const gitRepoUrl = test.gitRepoUrl.trim();
                // Enhanced logging about the repository
                console.log('===================== REPOSITORY DEBUG INFO (SUBMISSION) =====================');
                console.log(`Test ID: ${test.id}`);
                console.log(`Git Repo URL from DB: ${gitRepoUrl}`);
                console.log(`Test title: ${test.title}`);
                console.log(`Test language: ${test.language}`);
                console.log(`User ID: ${userId}`);
                // Verify the URL format
                const urlPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\.git)?$/;
                const urlMatch = gitRepoUrl.match(urlPattern);
                if (urlMatch) {
                    const [, orgName, repoName] = urlMatch;
                    console.log(`Organization name parsed from URL: ${orgName}`);
                    console.log(`Repository name parsed from URL: ${repoName.replace('.git', '')}`);
                }
                else {
                    console.warn('URL does not match expected GitHub repository URL pattern');
                }
                console.log('===============================================================');
                // Check if URL contains placeholder user IDs which indicate test data
                if (gitRepoUrl.includes('00000000-0000-0000-0000-000000000000')) {
                    console.warn('Repository URL contains placeholder user ID. This might be test data.');
                    return res.status(400).json({
                        error: 'Invalid repository URL. Please ensure a valid repository has been created for this test.'
                    });
                }
                // Log the repository URL we're about to clone
                console.log(`Attempting to clone repo for submission: ${gitRepoUrl}`);
                // Try a simple HTTP request to verify the repo exists first
                try {
                    // Remove .git extension if present for the verification
                    const apiUrl = gitRepoUrl
                        .replace('github.com', 'api.github.com/repos')
                        .replace(/\.git$/, '');
                    console.log(`Verifying repository existence with GitHub API: ${apiUrl}`);
                    const verifyResponse = await axios_1.default.get(apiUrl, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'Bansy-Assessment-Platform'
                        },
                        validateStatus: (status) => status < 500 // Don't throw on 404
                    });
                    console.log(`GitHub API response status: ${verifyResponse.status}`);
                    if (verifyResponse.status === 404) {
                        console.error('Repository URL is valid, but GitHub reports the repository does not exist.');
                        console.log('This might be due to:');
                        console.log('1. The repository was deleted');
                        console.log('2. The repository is private and the access token is missing or invalid');
                        console.log('3. The organization or repository name has a typo');
                        return res.status(404).json({
                            error: 'Repository not found on GitHub. The repository may exist in our database but is not accessible on GitHub.'
                        });
                    }
                    console.log('Repository verified as existing on GitHub');
                }
                catch (verifyError) {
                    console.error('Error verifying repository existence:', verifyError.message);
                    // Continue with clone attempt even if verification fails
                }
                // Try to clone the repository directly - if it fails, provide helpful error
                try {
                    console.log(`Running git clone command: git clone ${gitRepoUrl} ${tempDir}`);
                    const cloneResult = await execPromise(`git clone ${gitRepoUrl} ${tempDir}`);
                    console.log('Repository cloned successfully for submission');
                    if (cloneResult.stdout)
                        console.log('Clone stdout:', cloneResult.stdout);
                    if (cloneResult.stderr)
                        console.log('Clone stderr:', cloneResult.stderr);
                }
                catch (cloneError) {
                    console.error('Error cloning repository for submission:', cloneError.message);
                    console.error('Clone command failed with:');
                    if (cloneError.stdout)
                        console.error('stdout:', cloneError.stdout);
                    if (cloneError.stderr)
                        console.error('stderr:', cloneError.stderr);
                    // Check if the tempDir exists and what's in it
                    try {
                        if (fs.existsSync(tempDir)) {
                            console.log(`Temp directory ${tempDir} exists. Contents:`, fs.readdirSync(tempDir));
                        }
                        else {
                            console.log(`Temp directory ${tempDir} does not exist.`);
                        }
                    }
                    catch (fsError) {
                        console.error('Error checking temp directory:', fsError);
                    }
                    // Check the specific error message to provide better feedback
                    if (cloneError.message.includes('not found')) {
                        return res.status(404).json({
                            error: 'Repository not found on GitHub. The repository may not exist or you may not have access to it.'
                        });
                    }
                    else if (cloneError.message.includes('Authentication failed')) {
                        return res.status(401).json({
                            error: 'Authentication failed when accessing the repository. Please check your GitHub credentials.'
                        });
                    }
                    else {
                        return res.status(500).json({
                            error: `Failed to clone repository: ${cloneError.message}`
                        });
                    }
                }
                // Prepare the response object
                const testResults = {
                    status: 'failure',
                    results: []
                };
                // Execute tests against the code in the repository
                let passedTests = 0;
                // Determine the main file based on language
                const language = test.language.toLowerCase();
                let mainFile;
                if (language === 'python') {
                    mainFile = 'main.py';
                }
                else if (language === 'javascript') {
                    mainFile = 'main.js';
                }
                else if (language === 'typescript') {
                    mainFile = 'main.ts';
                }
                else if (language === 'java') {
                    mainFile = 'Main.java';
                }
                else {
                    mainFile = 'main'; // Default
                }
                // Check if the main file exists
                const mainFilePath = path.join(tempDir, mainFile);
                if (!fs.existsSync(mainFilePath)) {
                    throw new Error(`Main file ${mainFile} not found in repository`);
                }
                // Run each test case using the execution service
                for (let i = 0; i < test.testCases.length; i++) {
                    const testCase = test.testCases[i];
                    console.log(`Running submission test case ${i + 1}/${test.testCases.length}`);
                    try {
                        // Execute the code using the execution service
                        const executionResponse = await axios_1.default.post(`${config_1.config.executionServiceUrl}/execute`, {
                            language: test.language,
                            code: fs.readFileSync(mainFilePath, 'utf8'),
                            input: testCase.input || '',
                            testCase: {
                                expectedOutput: testCase.expectedOutput,
                                description: testCase.description
                            }
                        });
                        const result = executionResponse.data;
                        if (result.passed) {
                            passedTests++;
                            testResults.results.push({
                                testCase: i,
                                passed: true,
                                output: result.output || "Test passed successfully."
                            });
                        }
                        else {
                            testResults.results.push({
                                testCase: i,
                                passed: false,
                                output: result.output || "",
                                error: result.error || `Expected: ${testCase.expectedOutput}`
                            });
                        }
                    }
                    catch (error) {
                        console.error(`Error executing submission test case ${i}:`, error);
                        testResults.results.push({
                            testCase: i,
                            passed: false,
                            error: `Error executing test: ${error.message || 'Unknown error'}`
                        });
                    }
                }
                // Update final status
                if (passedTests === test.testCases.length) {
                    testResults.status = 'success';
                }
                // Save submission to database
                const submission = await prismaClient_1.prisma.submission.create({
                    data: {
                        status: testResults.status,
                        result: testResults,
                        testId: test.id,
                        userId
                    }
                });
                // Clean up temporary directory
                try {
                    fs.rmSync(tempDir, { recursive: true, force: true });
                }
                catch (cleanupError) {
                    console.error('Error cleaning up temp directory:', cleanupError);
                }
                return res.json({
                    submissionId: submission.id,
                    ...testResults
                });
            }
            catch (error) {
                console.error('Error processing submission:', error);
                return res.status(500).json({
                    error: `Failed to process submission: ${error instanceof Error ? error.message : String(error)}`
                });
            }
        }
        catch (error) {
            console.error('Error submitting solution:', error);
            return res.status(500).json({ error: 'Failed to submit solution' });
        }
    }
};
