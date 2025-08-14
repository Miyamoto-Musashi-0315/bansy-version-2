"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const testController_1 = require("../controllers/testController");
const archiver_1 = __importDefault(require("archiver"));
const router = (0, express_1.Router)();
// Get all tests
router.get('/', async (req, res) => {
    try {
        const tests = await prisma_1.default.test.findMany({
            include: {
                testCases: true,
                files: true,
                submissions: true,
            },
        });
        res.json(tests);
    }
    catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ error: 'Failed to fetch tests' });
    }
});
// Get test by ID
// Run tests for a specific test
router.post('/:testId/run', testController_1.testController.runTests);
// Submit a solution for a test
router.post('/:testId/submit', testController_1.testController.submitSolution);
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const test = await prisma_1.default.test.findUnique({
            where: { id },
            include: {
                testCases: true,
                files: true,
                submissions: true,
            },
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        res.json(test);
    }
    catch (error) {
        console.error('Error fetching test:', error);
        res.status(500).json({ error: 'Failed to fetch test' });
    }
});
// Create test
router.post('/', async (req, res) => {
    try {
        const { title, description, language, files, testCases, jobDescriptionId } = req.body;
        const test = await prisma_1.default.test.create({
            data: {
                title,
                description,
                difficulty: 'medium', // Default difficulty
                language,
                requirements: [], // Empty requirements array
                jobDescription: { connect: { id: jobDescriptionId } },
                files: {
                    create: files.map((file) => ({
                        path: file.path,
                        content: file.content
                    }))
                },
                testCases: {
                    create: testCases.map((tc) => ({
                        description: tc.description,
                        input: tc.input,
                        expectedOutput: tc.expectedOutput
                    }))
                }
            },
            include: {
                testCases: true,
                files: true,
            },
        });
        res.status(201).json(test);
    }
    catch (error) {
        console.error('Error creating test:', error);
        res.status(500).json({ error: 'Failed to create test' });
    }
});
// Submit a solution for testing
router.post('/:id/submit', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        // Check if test exists
        const test = await prisma_1.default.test.findUnique({
            where: { id },
            include: {
                testCases: true
            }
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        // Mock submission result with success status
        const submissionResult = {
            status: 'success',
            results: test.testCases.map((_, index) => ({
                testCase: index,
                passed: true,
                output: 'Test passed successfully'
            }))
        };
        // Create a submission record in the database
        const submission = await prisma_1.default.submission.create({
            data: {
                testId: id,
                userId: userId,
                status: 'completed',
                result: submissionResult
            }
        });
        res.json(submission);
    }
    catch (error) {
        console.error('Error submitting solution:', error);
        res.status(500).json({ error: 'Failed to submit solution' });
    }
});
// Run tests without submitting
router.post('/:id/run', async (req, res) => {
    try {
        const { id } = req.params;
        // Check if test exists
        const test = await prisma_1.default.test.findUnique({
            where: { id },
            include: {
                testCases: true
            }
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        // Mock test results with random pass/fail
        const results = test.testCases.map(testCase => ({
            passed: Math.random() > 0.3, // 70% chance of passing
            output: `Test case "${testCase.description}" execution output`
        }));
        res.json({ results });
    }
    catch (error) {
        console.error('Error running tests:', error);
        res.status(500).json({ error: 'Failed to run tests' });
    }
});
// Get test details
router.get('/:testId', async (req, res) => {
    try {
        const { testId } = req.params;
        const test = await prisma_1.default.test.findUnique({
            where: { id: testId },
            include: {
                testCases: true,
                files: true
            }
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        res.json(test);
    }
    catch (error) {
        console.error('Error fetching test:', error);
        res.status(500).json({ error: 'Failed to fetch test' });
    }
});
// Download test files
router.get('/:testId/download', async (req, res) => {
    try {
        const { testId } = req.params;
        const test = await prisma_1.default.test.findUnique({
            where: { id: testId },
            include: {
                testCases: true,
                files: true
            }
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        // Set up response headers for zip file
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename=test-${testId}-files.zip`);
        // Create zip archive
        const archive = (0, archiver_1.default)('zip', {
            zlib: { level: 9 } // Maximum compression
        });
        // Pipe archive to response
        archive.pipe(res);
        // Add each file to the archive
        test.files.forEach(file => {
            const fileContent = Buffer.from(file.content);
            archive.append(fileContent, { name: file.path });
        });
        // Add test cases as a JSON file
        const testCasesContent = JSON.stringify(test.testCases, null, 2);
        archive.append(testCasesContent, { name: 'test-cases.json' });
        // Add a README file
        const readmeContent = `# Coding Test

## Description
${test.description || 'No description provided'}

## Files
${test.files.map(f => `- ${f.path}`).join('\n')}

## Test Cases
${test.testCases.map((tc, i) => `
### Test Case ${i + 1}
${tc.description}
`).join('\n')}
`;
        archive.append(readmeContent, { name: 'README.md' });
        // Finalize archive
        await archive.finalize();
    }
    catch (error) {
        console.error('Error creating download:', error);
        res.status(500).json({ error: 'Failed to create download' });
    }
});
// Run tests
router.post('/:testId/run', async (req, res) => {
    try {
        const { testId } = req.params;
        const test = await prisma_1.default.test.findUnique({
            where: { id: testId },
            include: {
                testCases: true
            }
        });
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        // Run test cases and return results
        const results = test.testCases.map(testCase => ({
            passed: Math.random() > 0.3, // Temporary mock implementation
            output: 'Test output here'
        }));
        res.json({ results });
    }
    catch (error) {
        console.error('Error running tests:', error);
        res.status(500).json({ error: 'Failed to run tests' });
    }
});
// Get latest submission for a specific test (normalized for frontend)
router.get('/:testId/latest-submission', async (req, res) => {
    var _a, _b, _c;
    try {
        const { testId } = req.params;
        console.log(`[tests.latest-submission] Fetching latest submission for testId=${testId}`);
        const submission = await prisma_1.default.submission.findFirst({
            where: { testId },
            orderBy: { createdAt: 'desc' }
        });
        if (!submission) {
            console.log(`[tests.latest-submission] No submissions found for testId=${testId}`);
            return res.json(null);
        }
        const result = submission.result || {};
        const normalized = {
            id: submission.id,
            status: submission.status,
            results: Array.isArray(result === null || result === void 0 ? void 0 : result.results) ? result.results : [],
            ciCdScore: (_b = (_a = result === null || result === void 0 ? void 0 : result.ciCdScore) !== null && _a !== void 0 ? _a : result === null || result === void 0 ? void 0 : result.cicdScore) !== null && _b !== void 0 ? _b : null,
            llmScore: (_c = result === null || result === void 0 ? void 0 : result.llmScore) !== null && _c !== void 0 ? _c : null,
        };
        console.log(`[tests.latest-submission] Returning submission ${submission.id} with status=${submission.status}`);
        return res.json(normalized);
    }
    catch (error) {
        console.error('[tests.latest-submission] Error:', (error === null || error === void 0 ? void 0 : error.message) || error);
        res.status(500).json({ error: 'Failed to fetch latest submission' });
    }
});
exports.default = router;
