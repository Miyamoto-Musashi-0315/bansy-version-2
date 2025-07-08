const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockCodeServerInstance = {
  id: 'instance-123',
  name: 'code-server-test-123',
  url: 'https://code-server-demo.onrender.com',
  status: 'live'
};

// Routes for code-server instances
app.get('/api/code-server/instance/:testId', (req, res) => {
  console.log(`GET request for code-server instance with test ID: ${req.params.testId}`);
  res.json(mockCodeServerInstance);
});

app.get('/api/code-server/instance/:instanceId/status', (req, res) => {
  console.log(`GET request for code-server instance status with ID: ${req.params.instanceId}`);
  res.json({
    success: true,
    status: 'live',
    url: mockCodeServerInstance.url
  });
});

// Routes for tests
app.get('/api/tests/:testId', (req, res) => {
  console.log(`GET request for test with ID: ${req.params.testId}`);
  res.json({
    id: req.params.testId,
    title: 'Array Sum Challenge',
    description: 'Write a function that takes an array of numbers and returns the sum of all elements. If the array is empty, return 0.',
    difficulty: 'Easy',
    language: 'JavaScript',
    projectFiles: {
      'solution.js': '/**\n * Array Sum Challenge\n * \n * Write a function that takes an array of numbers and returns the sum of all elements.\n * If the array is empty, return 0.\n * \n * Examples:\n * arraySum([1, 2, 3, 4]) => 10\n * arraySum([]) => 0\n * arraySum([-1, 1]) => 0\n */\n\nfunction arraySum(numbers) {\n  // Your solution here\n}\n\nmodule.exports = {\n  arraySum\n};'
    },
    testCases: [
      {
        input: '[1, 2, 3, 4]',
        expectedOutput: '10',
        description: 'Basic functionality: Sum of positive numbers'
      },
      {
        input: '[]',
        expectedOutput: '0',
        description: 'Edge case: Empty array should return 0'
      },
      {
        input: '[-1, -2, -3]',
        expectedOutput: '-6',
        description: 'Negative numbers: Sum of negative numbers'
      }
    ]
  });
});

app.post('/api/tests/:testId/run', (req, res) => {
  console.log(`POST request to run tests for test ID: ${req.params.testId}`);
  console.log('Request body:', req.body);
  
  // Mock test results
  res.json({
    id: `submission-${Date.now()}`,
    status: 'failure',
    results: [
      {
        testCase: 0,
        passed: true,
        output: '10'
      },
      {
        testCase: 1,
        passed: true,
        output: '0'
      },
      {
        testCase: 2,
        passed: false,
        output: '0',
        error: 'Expected -6 but got 0'
      }
    ]
  });
});

app.post('/api/tests/:testId/submit', (req, res) => {
  console.log(`POST request to submit solution for test ID: ${req.params.testId}`);
  console.log('Request body:', req.body);
  
  // Mock submission results
  res.json({
    id: `submission-${Date.now()}`,
    status: 'failure',
    results: [
      {
        testCase: 0,
        passed: true,
        output: '10'
      },
      {
        testCase: 1,
        passed: true,
        output: '0'
      },
      {
        testCase: 2,
        passed: false,
        output: '0',
        error: 'Expected -6 but got 0'
      }
    ]
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
