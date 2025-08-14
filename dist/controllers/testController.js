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
const githubService_1 = __importDefault(require("../services/githubService"));
// Map the orgName from config to what GithubService expects
const githubConfig = { ...config_1.config.github, organizationName: config_1.config.github.orgName };
const githubService = new githubService_1.default(githubConfig);
/**
 * Controller for handling test-related operations
 */
exports.testController = {
    /**
     * Clone a GitHub repository and run tests against it
     */
    async runTests(req, res) {
        var _a, _b, _c;
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
                // Determine language – first from DB field, then heuristics if unclear
                const langStr = (test.language || '').toLowerCase();
                let language = 'python';
                if (langStr.includes('python')) {
                    language = 'python';
                }
                else if (langStr.includes('typescript')) {
                    language = 'typescript';
                }
                else if (langStr.includes('javascript') || langStr.includes('node')) {
                    language = 'javascript';
                }
                else if (langStr.includes('java')) {
                    language = 'java';
                }
                else {
                    // Heuristic: look for key marker files
                    if (fs.existsSync(path.join(tempDir, 'package.json'))) {
                        language = 'javascript';
                    }
                    else if (fs.existsSync(path.join(tempDir, 'tsconfig.json'))) {
                        language = 'typescript';
                    }
                    else if (fs.readdirSync(tempDir).some(f => f.endsWith('.py'))) {
                        language = 'python';
                    }
                    else if (fs.readdirSync(tempDir).some(f => f.endsWith('.java'))) {
                        language = 'java';
                    }
                }
                console.log(`[scan] detected language for runTests: ${language}`);
                // variable to track tests passed
                let passedTests = 0;
                const extGlobal = { python: '.py', javascript: '.js', typescript: '.ts', java: '.java' }[language] || '';
                // If this is a Node/JS repo, try running Jest to collect real test results
                if ((language === 'javascript' || language === 'typescript') && fs.existsSync(path.join(tempDir, 'package.json'))) {
                    try {
                        console.log('[runTests] Detected Node.js project – installing dependencies...');
                        try {
                            await execPromise('npm ci --silent', { cwd: tempDir });
                        }
                        catch (npmCiErr) {
                            console.warn('[runTests] npm ci failed, falling back to npm install:', npmCiErr instanceof Error ? npmCiErr.message : npmCiErr);
                            await execPromise('npm install --silent', { cwd: tempDir });
                        }
                        console.log('[runTests] Running Jest to collect test results...');
                        const jestCmd = 'npm test -- --json --outputFile=jest-results.json --runInBand';
                        try {
                            await execPromise(jestCmd, { cwd: tempDir, env: { ...process.env, CI: 'true' } });
                        }
                        catch (jestErr) {
                            // Jest exits non-zero when tests fail – that's expected. We'll still read the results file.
                            console.warn('[runTests] Jest exited with non-zero code (expected when tests fail):', jestErr instanceof Error ? jestErr.message : jestErr);
                        }
                        const resultsPath = path.join(tempDir, 'jest-results.json');
                        if (fs.existsSync(resultsPath)) {
                            const raw = fs.readFileSync(resultsPath, 'utf8');
                            const jestJson = JSON.parse(raw);
                            const flattened = [];
                            for (const suite of Array.isArray(jestJson === null || jestJson === void 0 ? void 0 : jestJson.testResults) ? jestJson.testResults : []) {
                                for (const ar of Array.isArray(suite === null || suite === void 0 ? void 0 : suite.assertionResults) ? suite.assertionResults : []) {
                                    flattened.push({ title: (ar === null || ar === void 0 ? void 0 : ar.fullName) || (ar === null || ar === void 0 ? void 0 : ar.title) || 'Test', status: (ar === null || ar === void 0 ? void 0 : ar.status) || 'unknown', failureMessages: (ar === null || ar === void 0 ? void 0 : ar.failureMessages) || [] });
                                }
                            }
                            const mapped = flattened.map((item, index) => ({
                                testCase: index,
                                passed: item.status === 'passed',
                                error: item.status === 'passed' ? undefined : (Array.isArray(item.failureMessages) ? item.failureMessages.join('\n\n') : 'Test failed'),
                                output: item.status === 'passed' ? item.title : undefined,
                            }));
                            passedTests = mapped.filter(m => m.passed).length;
                            testResults.results = mapped;
                            testResults.status = passedTests === mapped.length && mapped.length > 0 ? 'success' : 'failure';
                            // Save test run result to database
                            await prismaClient_1.prisma.submission.create({
                                data: {
                                    status: testResults.status,
                                    result: testResults,
                                    testId: test.id,
                                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
                                }
                            });
                            // Clean up temporary directory
                            try {
                                fs.rmSync(tempDir, { recursive: true, force: true });
                            }
                            catch (_d) { }
                            return res.json(testResults);
                        }
                        else {
                            console.warn('[runTests] Jest results file not found at', resultsPath, '– falling back to legacy per-case execution flow');
                        }
                    }
                    catch (nodeFlowErr) {
                        console.error('[runTests] Error while running Node/Jest flow:', nodeFlowErr);
                        // continue to legacy flow below
                    }
                }
                const possibleFiles = {
                    python: ['main.py', 'app.py'],
                    javascript: ['main.js', 'index.js'],
                    typescript: ['main.ts', 'index.ts'],
                    java: ['Main.java']
                };
                let mainFile = null;
                for (const candidate of possibleFiles[language] || []) {
                    if (fs.existsSync(path.join(tempDir, candidate))) {
                        mainFile = candidate;
                        break;
                    }
                }
                if (!mainFile) {
                    // Last resort: pick first supported language file at repo root
                    const files = fs.readdirSync(tempDir);
                    const fallbackExts = ['.js', '.ts', '.py', '.java'];
                    const foundAny = files.find(f => fallbackExts.some(ext => f.endsWith(ext)));
                    if (foundAny) {
                        mainFile = foundAny;
                        console.log(`[scan] fallback picked ${foundAny} at repo root`);
                        // adjust language if mismatch
                        if (foundAny.endsWith('.js'))
                            language = 'javascript';
                        else if (foundAny.endsWith('.ts'))
                            language = 'typescript';
                        else if (foundAny.endsWith('.py'))
                            language = 'python';
                        else if (foundAny.endsWith('.java'))
                            language = 'java';
                    }
                }
                // Deep scan `test` or `tests` directories
                if (!mainFile) {
                    const debugDirs = [];
                    const walk = (dir) => {
                        if (!fs.existsSync(dir))
                            return null;
                        debugDirs.push(dir);
                        console.log(`[scan] visiting: ${dir}`);
                        for (const entry of fs.readdirSync(dir)) {
                            const full = path.join(dir, entry);
                            const stat = fs.statSync(full);
                            if (stat.isDirectory()) {
                                const res = walk(full);
                                if (res)
                                    return res;
                            }
                            else if (entry.endsWith(extGlobal)) {
                                console.log(`[scan] candidate file found: ${full}`);
                                return path.relative(tempDir, full);
                            }
                            else {
                                const fallbackExts = ['.js', '.ts', '.py', '.java'];
                                if (fallbackExts.some(ext => entry.endsWith(ext))) {
                                    console.log(`[scan] candidate file found (fallback ext): ${full}`);
                                    return path.relative(tempDir, full);
                                }
                            }
                        }
                        return null;
                    };
                    const dirsToSearch = ['test', 'tests'];
                    for (const d of dirsToSearch) {
                        const foundDeep = walk(path.join(tempDir, d));
                        if (foundDeep) {
                            mainFile = foundDeep;
                            break;
                        }
                    }
                    if (!mainFile) {
                        console.warn('[scan] No entry file found after scanning directories:', debugDirs);
                    }
                }
                if (!mainFile) {
                    throw new Error('Main entry file not found in repository');
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
                            language,
                            repoUrl: gitRepoUrl,
                            mainFile,
                            input: testCase.input || '',
                            testCase: {
                                expectedOutput: testCase.expectedOutput,
                                description: testCase.description
                            }
                        };
                        console.log(`Executing test case ${i + 1} with payload:`, JSON.stringify(payload, null, 2));
                        // Execute the code using the external execution service (if configured)
                        if (!config_1.config.executionServiceUrl) {
                            console.warn('[runTests] executionServiceUrl is not configured – skipping remote execution');
                            testResults.results.push({
                                testCase: i,
                                passed: false,
                                error: 'Execution service disabled – configure EXECUTION_SERVICE_URL to enable remote runs.'
                            });
                            continue;
                        }
                        const executionResponse = await axios_1.default.post(`${config_1.config.executionServiceUrl}/run`, payload);
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
                            ...(((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) && { executionServiceError: error.response.data })
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
                        userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id // Add user ID if available
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
            const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || null;
            if (!userId) {
                console.log('[submitSolution] No authenticated user – treating as anonymous candidate');
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
            // Always trigger CI/CD on submission and create a pending submission record
            try {
                const repoNameMatch = test.gitRepoUrl.match(/github\.com\/[^\/]+\/(.+?)(?:\.git)?$/);
                const repoName = repoNameMatch ? repoNameMatch[1] : null;
                if (!repoName) {
                    return res.status(400).json({ error: 'Unable to parse repository name from URL.' });
                }
                // Best effort: trigger workflow (will no-op if GitHub integration is disabled)
                try {
                    await githubService.triggerWorkflowDispatch(repoName, { workflowFileName: 'ci.yml', ref: 'main' });
                    console.log('[submitSolution] Workflow dispatch requested for repo:', repoName);
                }
                catch (dispatchErr) {
                    console.warn('[submitSolution] Workflow dispatch failed; CI may still run on push triggers:', dispatchErr);
                }
                const submission = await prismaClient_1.prisma.submission.create({
                    data: {
                        status: 'pending',
                        testId: test.id,
                        userId: userId || undefined,
                    },
                });
                console.log('[submitSolution] Created pending submission:', submission.id);
                // Fire-and-forget fallback poller in case webhooks are not delivered
                (async () => {
                    try {
                        console.log('[submitSolution] Starting background CI poller for repo:', repoName, 'submission:', submission.id);
                        const maxAttempts = 40; // ~10 minutes at 15s interval
                        const intervalMs = 15000;
                        for (let attempt = 0; attempt < maxAttempts; attempt++) {
                            const latest = await prismaClient_1.prisma.submission.findUnique({ where: { id: submission.id } });
                            console.log('[submitSolution][poll] attempt', attempt, 'currentStatus=', latest === null || latest === void 0 ? void 0 : latest.status);
                            if (!latest)
                                break;
                            if (latest.status !== 'pending') {
                                console.log('[submitSolution][poll] submission updated by webhook; stopping');
                                break;
                            }
                            const run = await githubService.getLatestWorkflowConclusion(repoName);
                            console.log('[submitSolution][poll] latest workflow run:', run);
                            if (run && run.status === 'completed') {
                                const finalStatus = run.conclusion === 'success' ? 'success' : 'failure';
                                await prismaClient_1.prisma.submission.update({
                                    where: { id: submission.id },
                                    data: {
                                        status: finalStatus,
                                        result: {
                                            status: finalStatus,
                                            ciCdScore: finalStatus === 'success' ? 40 : 0,
                                            results: []
                                        },
                                    },
                                });
                                console.log('[submitSolution][poll] submission updated to', finalStatus, 'stopping');
                                break;
                            }
                            await new Promise(resolve => setTimeout(resolve, intervalMs));
                        }
                    }
                    catch (bgErr) {
                        console.warn('[submitSolution] Background CI poller error (non-fatal):', bgErr);
                    }
                })();
                return res.json({
                    submissionId: submission.id,
                    status: 'pending',
                    message: 'Submission recorded. CI/CD workflow has been triggered; results will appear once completed.'
                });
            }
            catch (err) {
                console.error('[submitSolution] Error triggering workflow dispatch:', err);
                return res.status(500).json({ error: 'Failed to trigger CI/CD workflow for this submission.' });
            }
        }
        catch (error) {
            console.error('Error submitting solution:', error);
            return res.status(500).json({ error: 'Failed to submit solution' });
        }
    }
};
