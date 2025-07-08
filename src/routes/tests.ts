import { Router } from 'express';
import prisma from '../lib/prisma';
import { testController } from '../controllers/testController';
import archiver from 'archiver';

const router = Router();

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await prisma.test.findMany({
      include: {

        testCases: true,
        files: true,
        submissions: true,
      },
    });
    res.json(tests);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// Get test by ID
// Run tests for a specific test
router.post('/:testId/run', testController.runTests);

// Submit a solution for a test
router.post('/:testId/submit', testController.submitSolution);

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const test = await prisma.test.findUnique({
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
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
});

// Create test
router.post('/', async (req, res) => {
  try {
    const { title, description, language, files, testCases, jobDescriptionId } = req.body;
    const test = await prisma.test.create({
      data: {
        title,
        description,
        difficulty: 'medium', // Default difficulty
        language,
        requirements: [], // Empty requirements array
        jobDescription: { connect: { id: jobDescriptionId } },
        files: {
          create: files.map((file: { path: string; content: string }) => ({
            path: file.path,
            content: file.content
          }))
        },
        testCases: {
          create: testCases.map((tc: { description: string; input?: string; expectedOutput: string }) => ({
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
  } catch (error) {
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
    const test = await prisma.test.findUnique({
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
    const submission = await prisma.submission.create({
      data: {
        testId: id,
        userId: userId,
        status: 'completed',
        result: submissionResult
      }
    });
    
    res.json(submission);
  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({ error: 'Failed to submit solution' });
  }
});

// Run tests without submitting
router.post('/:id/run', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if test exists
    const test = await prisma.test.findUnique({
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
  } catch (error) {
    console.error('Error running tests:', error);
    res.status(500).json({ error: 'Failed to run tests' });
  }
});

// Get test details
router.get('/:testId', async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await prisma.test.findUnique({
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
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
});

// Download test files
router.get('/:testId/download', async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await prisma.test.findUnique({
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
    const archive = archiver('zip', {
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
  } catch (error) {
    console.error('Error creating download:', error);
    res.status(500).json({ error: 'Failed to create download' });
  }
});

// Run tests
router.post('/:testId/run', async (req, res) => {
  try {
    const { testId } = req.params;
    const test = await prisma.test.findUnique({
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
  } catch (error) {
    console.error('Error running tests:', error);
    res.status(500).json({ error: 'Failed to run tests' });
  }
});

export default router;
