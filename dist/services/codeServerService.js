"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeServerService = void 0;
const db_1 = require("../db");
// Environment variables
const EXECUTION_SERVICE_URL = process.env.EXECUTION_SERVICE_URL || 'https://basny-version-1.onrender.com';
const CODE_SERVER_URL = process.env.CODE_SERVER_URL || 'https://code-server-demo.onrender.com';
console.log(`Using execution service at: ${EXECUTION_SERVICE_URL}`);
console.log(`Using code-server at: ${CODE_SERVER_URL}`);
/**
 * Service to manage code-server instances using the execution service
 */
exports.codeServerService = {
    /**
     * Get or create a code-server instance for a test
     */
    async getOrCreateInstance(testId) {
        try {
            // Check if an instance already exists for this test
            const existingInstance = await db_1.prisma.codeServerInstance.findUnique({
                where: { testId }
            });
            if (existingInstance && existingInstance.status === 'live') {
                return existingInstance;
            }
            // Get the test details
            const test = await db_1.prisma.test.findUnique({
                where: { id: testId }
            });
            if (!test) {
                throw new Error('Test not found');
            }
            // For our implementation, we'll use the code-server instance on Render.com
            const instanceId = testId;
            const instanceName = `code-server-${testId}`;
            // Create or update the instance record in the database
            const instance = await db_1.prisma.codeServerInstance.upsert({
                where: { testId },
                update: {
                    status: 'live',
                    url: `${CODE_SERVER_URL}/?folder=/workspace/${testId}`
                },
                create: {
                    id: instanceId,
                    name: instanceName,
                    url: `${CODE_SERVER_URL}/?folder=/workspace/${testId}`,
                    status: 'live',
                    testId,
                    createdAt: new Date()
                }
            });
            // Set up the workspace with initial files
            await this.setupWorkspace(testId, test);
            return instance;
        }
        catch (error) {
            console.error('Error creating code-server instance:', error);
            throw new Error('Failed to create code-server instance');
        }
    },
    /**
     * Set up the workspace with initial files (mock implementation)
     */
    async setupWorkspace(testId, test) {
        try {
            console.log(`Setting up workspace for test ${testId} (mock implementation)`);
            // This is a mock implementation that doesn't actually create files
            // In a real implementation, you would create files on the code-server instance
            return;
        }
        catch (error) {
            console.error('Error setting up workspace:', error);
            throw new Error('Failed to set up workspace');
        }
    },
    /**
     * Check the status of a code-server instance (mock implementation)
     */
    async checkInstanceStatus(instanceId) {
        try {
            // Get the instance from the database
            const instance = await db_1.prisma.codeServerInstance.findUnique({
                where: { id: instanceId }
            });
            if (!instance) {
                throw new Error('Instance not found');
            }
            // Mock implementation - always return 'live'
            await db_1.prisma.codeServerInstance.update({
                where: { id: instanceId },
                data: { status: 'live' }
            });
            return 'live';
        }
        catch (error) {
            console.error('Error checking instance status:', error);
            // Update the status in the database
            await db_1.prisma.codeServerInstance.update({
                where: { id: instanceId },
                data: { status: 'error' }
            });
            throw new Error('Failed to check instance status');
        }
    },
    /**
     * Update files in a code-server instance (mock implementation)
     */
    async updateFiles(instanceId, files) {
        try {
            // Get the instance from the database
            const instance = await db_1.prisma.codeServerInstance.findUnique({
                where: { id: instanceId }
            });
            if (!instance) {
                throw new Error('Instance not found');
            }
            // Mock implementation - just log the files that would be updated
            console.log(`Would update files for instance ${instanceId}:`, Object.keys(files));
            return;
        }
        catch (error) {
            console.error('Error updating files:', error);
            throw new Error('Failed to update files');
        }
    },
    /**
     * Run tests in a code-server instance (mock implementation)
     */
    async runTests(instanceId) {
        try {
            // Get the instance from the database
            const instance = await db_1.prisma.codeServerInstance.findUnique({
                where: { id: instanceId }
            });
            if (!instance) {
                throw new Error('Instance not found');
            }
            // Get the test details
            const test = await db_1.prisma.test.findUnique({
                where: { id: instance.testId }
            });
            if (!test) {
                throw new Error('Test not found');
            }
            // Mock test results
            const mockResults = {
                success: true,
                results: {
                    passed: 1,
                    failed: 0,
                    tests: [
                        {
                            name: `test_solution.${test.language.toLowerCase() === 'javascript' ? 'js' : 'py'}`,
                            passed: true,
                            output: 'All tests passed!'
                        }
                    ]
                }
            };
            // Create a submission record
            const submission = await db_1.prisma.submission.create({
                data: {
                    testId: test.id,
                    status: 'passed',
                    result: JSON.stringify(mockResults.results), // Corrected field name
                    createdAt: new Date()
                }
            });
            return {
                ...mockResults,
                submissionId: submission.id
            };
        }
        catch (error) {
            console.error('Error running tests:', error);
            throw new Error('Failed to run tests');
        }
    },
    /**
     * Delete a code-server instance
     */
    async deleteInstance(instanceId) {
        try {
            // In this implementation, we don't actually delete the instance on the execution service
            // We just remove it from our database
            await db_1.prisma.codeServerInstance.delete({
                where: { id: instanceId }
            });
        }
        catch (error) {
            console.error('Error deleting instance:', error);
            throw new Error('Failed to delete instance');
        }
    }
};
/**
 * Generate a random password for the code-server instance
 */
function generateRandomPassword() {
    return Math.random().toString(36).slice(-10);
}
