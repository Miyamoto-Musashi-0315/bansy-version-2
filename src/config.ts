import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load environment variables, ensuring that variables defined in the .env file override any existing
// variables set in the shell. This helps avoid situations where stale shell variables (e.g. an
// outdated GITHUB_PRIVATE_KEY_PATH) shadow the updated value in the .env file and cause confusing
// authentication errors.
dotenv.config({ override: true });

// Log environment variables (excluding sensitive ones)
const logEnvVars = () => {
  const envVars = { ...process.env };
  // Remove sensitive values (except GITHUB_PRIVATE_KEY which we want to inspect during debugging)
  ['DATABASE_URL', 'GITHUB_CLIENT_SECRET', 'GITHUB_WEBHOOK_SECRET', 'GEMINI_API_KEY'].forEach(key => {
    if (envVars[key]) envVars[key] = '[REDACTED]';
  });
  console.log('Environment variables:', envVars);
};

// Log environment variables on startup
logEnvVars();

const keyPathEnv = process.env.GITHUB_PRIVATE_KEY_PATH || process.env.privateKeyPath || process.env.PRIVATE_KEY_PATH;

// --- Detailed debug logging for private-key resolution ---
console.log('[config] Attempting to resolve GitHub private key');
console.log('[config]  – keyPathEnv          :', keyPathEnv || '(not set)');
console.log('[config]  – inline key length   :', (process.env.GITHUB_PRIVATE_KEY || '').length);

if (keyPathEnv) {
  const abs = path.resolve(keyPathEnv);
  const exists = fs.existsSync(abs);
  console.log(`[config]  – absolute key path   : ${abs}`);
  console.log(`[config]  – key file exists     : ${exists}`);
}

let resolvedGithubPrivateKey = process.env.GITHUB_PRIVATE_KEY || '';

// If a key file path is provided, prefer reading from it (this overrides any env value that might be truncated)
if (keyPathEnv) {
  try {
    const keyPath = path.resolve(keyPathEnv);
    resolvedGithubPrivateKey = fs.readFileSync(keyPath, 'utf8');
    console.log(`[config] Successfully read GitHub private key from file: ${keyPath}. Size: ${resolvedGithubPrivateKey.length} chars`);
  } catch (fileErr) {
    console.error('Failed to read GitHub private key from file:', fileErr);
  }
} else if (resolvedGithubPrivateKey) {
  console.log('[config] Using inline GITHUB_PRIVATE_KEY. Length:', resolvedGithubPrivateKey.length);
} else {
  console.warn('[config] No GitHub private key provided via file or inline env variable.');
}

// Optional: log the key length without revealing contents (helps debugging without leaking sensitive data)
console.log('Resolved GitHub private key loaded. Length:', resolvedGithubPrivateKey.length);

// Ensure JWT_SECRET is always defined. In production we abort if missing, in
// local development we generate a temporary random secret so that developers
// can get up and running quickly without extra setup.
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('Error: Missing required environment variable: JWT_SECRET');
    process.exit(1);
  } else {
    console.warn('[config] JWT_SECRET not set. Generating a temporary secret for development purposes.');
    process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  }
}

// Export JWT secret so the same constant is used everywhere in the app.
export const JWT_SECRET = process.env.JWT_SECRET!;

interface Config {
  port: number;
  executionServiceUrl: string;
  geminiApiKey: string;
  uploadDir: string;
  github: {
    appId: string;
    privateKey: string;
    clientId: string;
    clientSecret: string;
    webhookSecret: string;
    orgName: string;
    installationId: string;
  };
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  executionServiceUrl: process.env.EXECUTION_SERVICE_URL || 'http://localhost:5000',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  github: {
    appId: process.env.GITHUB_APP_ID || '',
    privateKey: resolvedGithubPrivateKey,
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET || '',
    orgName: process.env.GITHUB_ORG_NAME || '',
    installationId: process.env.GITHUB_INSTALLATION_ID || '',
  },
};
