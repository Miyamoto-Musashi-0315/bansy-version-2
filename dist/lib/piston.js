"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class PistonClient {
    constructor(config) {
        this.config = {
            timeout: 30000, // 30 seconds default timeout
            ...config
        };
        this.executionClient = new ExecutionClient(this.config);
    }
    async execute(request) {
        try {
            const executionRequest = {
                language: request.language,
                code: request.files[0].content,
                input: request.stdin,
            };
            const executionResponse = await this.executionClient.execute(executionRequest);
            const pistonResponse = {
                language: request.language,
                version: request.version,
                run: {
                    stdout: executionResponse.stdout,
                    stderr: executionResponse.stderr,
                    output: executionResponse.stdout + executionResponse.stderr,
                    code: executionResponse.exit_code,
                    signal: null,
                },
            };
            return pistonResponse;
        }
        catch (error) {
            console.error('Piston execution error:', error);
            if (axios_1.default.isAxiosError(error)) {
                if (error.code === 'ECONNREFUSED') {
                    throw new Error('Execution service is not available');
                }
                if (error.response) {
                    throw new Error(error.response.data.error || 'Execution service error');
                }
                if (error.request) {
                    throw new Error('No response from execution service');
                }
            }
            throw error;
        }
    }
    async getRuntimes() {
        try {
            const response = await axios_1.default.get(`${this.config.baseUrl}/api/v2/runtimes`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching runtimes:', error);
            throw error;
        }
    }
    async health() {
        try {
            const response = await axios_1.default.get(`${this.config.baseUrl}/health`, {
                timeout: 5000, // 5 second timeout for health checks
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.status === 'ok';
        }
        catch (error) {
            console.error('Health check error:', error);
            return false;
        }
    }
}
class ExecutionClient {
    constructor(config) {
        this.config = {
            timeout: 30000, // 30 seconds default timeout
            ...config
        };
    }
    async execute(request) {
        try {
            const response = await axios_1.default.post(`${this.config.baseUrl}/execute`, request, {
                timeout: this.config.timeout,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Code execution error:', error);
            if (axios_1.default.isAxiosError(error)) {
                if (error.code === 'ECONNREFUSED') {
                    throw new Error('Execution service is not available');
                }
                if (error.response) {
                    throw new Error(error.response.data.error || 'Execution service error');
                }
                if (error.request) {
                    throw new Error('No response from execution service');
                }
            }
            throw error;
        }
    }
    async health() {
        try {
            const response = await axios_1.default.get(`${this.config.baseUrl}/health`, {
                timeout: 5000, // 5 second timeout for health checks
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data.status === 'ok';
        }
        catch (error) {
            console.error('Health check error:', error);
            return false;
        }
    }
}
const piston = axios_1.default.create({
    baseURL: process.env.PISTON_API_URL || 'http://localhost:2000/api',
});
exports.default = piston;
