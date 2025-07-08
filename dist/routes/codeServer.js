"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeServerService_1 = require("../services/codeServerService");
const prismaClient_1 = require("../prismaClient");
const router = express_1.default.Router();
/**
 * Get or create a code-server instance for a test
 */
router.get('/instance/:testId', async (req, res) => {
    try {
        const { testId } = req.params;
        const instance = await codeServerService_1.codeServerService.getOrCreateInstance(testId);
        res.json({
            success: true,
            instance
        });
    }
    catch (error) {
        console.error('Error getting code-server instance:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get code-server instance'
        });
    }
});
/**
 * Check the status of a code-server instance
 */
router.get('/instance/:instanceId/status', async (req, res) => {
    try {
        const { instanceId } = req.params;
        const status = await codeServerService_1.codeServerService.checkInstanceStatus(instanceId);
        res.json({
            success: true,
            status
        });
    }
    catch (error) {
        console.error('Error checking instance status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to check instance status'
        });
    }
});
/**
 * Update files in a code-server instance
 */
router.put('/instance/:instanceId/files', async (req, res) => {
    try {
        const { instanceId } = req.params;
        const { files } = req.body;
        if (!files || typeof files !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid files object'
            });
        }
        await codeServerService_1.codeServerService.updateFiles(instanceId, files);
        res.json({
            success: true
        });
    }
    catch (error) {
        console.error('Error updating files:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update files'
        });
    }
});
/**
 * Run tests in a code-server instance
 */
router.post('/instance/:instanceId/run-tests', async (req, res) => {
    try {
        const { instanceId } = req.params;
        const results = await codeServerService_1.codeServerService.runTests(instanceId);
        res.json({
            success: true,
            results
        });
    }
    catch (error) {
        console.error('Error running tests:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to run tests'
        });
    }
});
/**
 * Delete a code-server instance
 */
router.delete('/instance/:instanceId', async (req, res) => {
    try {
        const { instanceId } = req.params;
        await codeServerService_1.codeServerService.deleteInstance(instanceId);
        res.json({
            success: true
        });
    }
    catch (error) {
        console.error('Error deleting instance:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete instance'
        });
    }
});
/**
 * Prepare workspace for a test and return the code-server URL
 */
router.get('/prepare/:testId', async (req, res) => {
    try {
        const { testId } = req.params;
        // Get the test details
        const test = await prismaClient_1.prisma.test.findUnique({
            where: { id: testId }
        });
        if (!test) {
            return res.status(404).json({
                success: false,
                error: 'Test not found'
            });
        }
        // Create or get the code-server instance
        const instance = await codeServerService_1.codeServerService.getOrCreateInstance(testId);
        // Return the code-server URL
        res.json({
            success: true,
            // Use the URL returned from the code-server service to avoid hard-coding the path
            url: instance.url
        });
    }
    catch (error) {
        console.error('Error preparing workspace:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to prepare workspace'
        });
    }
});
exports.default = router;
