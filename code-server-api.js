const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Render API configuration
const RENDER_API_KEY = process.env.RENDER_API_KEY || 'your-render-api-key';
const RENDER_API_URL = 'https://api.render.com/v1';

// Routes for code-server instances
app.get('/api/code-server/instance/:testId', async (req, res) => {
  const { testId } = req.params;
  console.log(`GET request for code-server instance with test ID: ${testId}`);
  
  try {
    // In a real implementation, you would check if an instance already exists for this test
    // and create one if it doesn't
    
    // For now, we'll return a hardcoded instance URL for testing
    res.json({
      id: `instance-${testId}`,
      name: `code-server-${testId}`,
      url: 'https://code-server-demo.onrender.com',
      status: 'live'
    });
  } catch (error) {
    console.error('Error getting code-server instance:', error);
    res.status(500).json({ error: 'Failed to get code-server instance' });
  }
});

app.get('/api/code-server/instance/:instanceId/status', async (req, res) => {
  const { instanceId } = req.params;
  console.log(`GET request for code-server instance status with ID: ${instanceId}`);
  
  try {
    // In a real implementation, you would check the actual status of the instance
    
    // For now, we'll return a hardcoded status for testing
    res.json({
      success: true,
      status: 'live',
      url: 'https://code-server-demo.onrender.com'
    });
  } catch (error) {
    console.error('Error checking instance status:', error);
    res.status(500).json({ error: 'Failed to check instance status' });
  }
});

// Routes for tests
app.get('/api/tests/:testId', async (req, res) => {
  const { testId } = req.params;
  console.log(`GET request for test with ID: ${testId}`);
  
  try {
    // In a real implementation, you would fetch the test from a database
    
    // For now, we'll return a hardcoded test for testing
    res.json({
      id: testId,
      title: 'Array Sum Challenge',
      description: 'Write a function that takes an array of numbers and returns the sum of all elements. If the array is empty, return 0.',
      difficulty: 'Easy',
      language: 'JavaScript',
      projectFiles: {
        'solution.js': `/**
 * Array Sum Challenge
 * 
 * Write a function that takes an array of numbers and returns the sum of all elements.
 * If the array is empty, return 0.
 * 
 * Examples:
 * arraySum([1, 2, 3, 4]) => 10
 * arraySum([]) => 0
 * arraySum([-1, 1]) => 0
 */

function arraySum(numbers) {
  // Your solution here
}

module.exports = {
  arraySum
};`
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
  } catch (error) {
    console.error('Error getting test:', error);
    res.status(500).json({ error: 'Failed to get test' });
  }
});

app.post('/api/tests/:testId/run', async (req, res) => {
  const { testId } = req.params;
  const { files } = req.body;
  console.log(`POST request to run tests for test ID: ${testId}`);
  
  try {
    // In a real implementation, you would run the tests against the solution
    
    // For now, we'll return hardcoded test results for testing
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
  } catch (error) {
    console.error('Error running tests:', error);
    res.status(500).json({ error: 'Failed to run tests' });
  }
});

app.post('/api/tests/:testId/submit', async (req, res) => {
  const { testId } = req.params;
  const { files } = req.body;
  console.log(`POST request to submit solution for test ID: ${testId}`);
  
  try {
    // In a real implementation, you would run the tests and save the submission
    
    // For now, we'll return hardcoded submission results for testing
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
  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({ error: 'Failed to submit solution' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Code-server API server running on http://localhost:${PORT}`);
});
