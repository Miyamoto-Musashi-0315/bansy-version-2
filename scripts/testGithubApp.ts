import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { Octokit } from '@octokit/rest';

/**
 * Minimal GitHub-App verification using a manually-signed JWT, mirroring the
 * snippet the user provided. Run with:  npx ts-node scripts/testGithubApp.ts
 *
 * Env vars required:
 *   GITHUB_APP_ID            – numeric app id
 *   GITHUB_PRIVATE_KEY_PATH  – path to pem file (falls back to privateKeyPath)
 */

const appId = process.env.GITHUB_APP_ID;
const keyPath = process.env.GITHUB_PRIVATE_KEY_PATH || process.env.privateKeyPath;

if (!appId || !keyPath) {
  console.error('❌  Set GITHUB_APP_ID and GITHUB_PRIVATE_KEY_PATH env vars');
  process.exit(1);
}

console.log('App ID Type:', typeof appId, '| Value:', appId);
console.log('Key path:', keyPath);

const privateKey = fs.readFileSync(path.resolve(keyPath), 'utf8');
const now = Math.floor(Date.now() / 1000);

const jwtToken = jwt.sign(
  {
    iat: now,
    exp: now + 600,
    iss: appId,
  },
  privateKey,
  { algorithm: 'RS256' }
);

console.log('[JWT] Token (start):', jwtToken.slice(0, 50) + '...');

const octokit = new Octokit({
  auth: jwtToken,
  request: { timeout: 30000 },
});

async function verifyApp() {
  try {
    const { data: appData }: any = await octokit.request('GET /app');
    console.log('✅ GitHub App verified. Name:', appData?.slug);
  } catch (error: any) {
    console.error('❌ Failed to verify GitHub App:', error?.response?.data || error);
  }
}

verifyApp(); 