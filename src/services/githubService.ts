import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

interface ProjectFile {
  path: string;
  content: string;
}

interface GithubConfig {
  appId: string;
  privateKey: string;
  clientId: string;
  clientSecret: string;
  webhookSecret: string;
  organizationName: string;
  installationId: string;
}

class GithubService {
  private octokit?: Octokit;
  private config: GithubConfig;
  private isGitHubDisabled: boolean;

  constructor(config: GithubConfig) {
    this.config = config;
    this.isGitHubDisabled = false;
    
    this.initializeGitHub();
  }

  private async initializeGitHub() {
    try {
      // Process the private key to handle \n escape sequences properly
      let processedPrivateKey = this.config.privateKey;
      
      if (processedPrivateKey && typeof processedPrivateKey === 'string') {
        // Convert literal \n to actual newlines if they exist
        processedPrivateKey = processedPrivateKey.replace(/\\n/g, '\n');
        
        // DEBUG: Private key successfully loaded - print only its length and fingerprint to avoid leaking sensitive data
        const keyFingerprint = crypto.createHash('sha256').update(processedPrivateKey).digest('hex').slice(0, 12);
        console.log('GitHub Private Key loaded. Length:', processedPrivateKey.length, 'Fingerprint:', keyFingerprint);
        
        // Ensure the key has proper header and footer
        if (!processedPrivateKey.includes('-----BEGIN') || !processedPrivateKey.includes('-----END') || processedPrivateKey.length < 100) {
          console.warn('Invalid private key detected, GitHub functionality will be mocked');
          this.isGitHubDisabled = true;
          return;
        }
      } else {
        console.warn('Private key is empty, GitHub functionality will be mocked');
        this.isGitHubDisabled = true;
        return;
      }
      
      const numericAppId = Number(this.config.appId);
      if (!numericAppId) {
        console.error('GitHub App ID is missing or not a number. Falling back to mock mode.');
        this.isGitHubDisabled = true;
        return;
      }

      // Create JWT for app authentication
      const nowManual = Math.floor(Date.now() / 1000);
      const appJwt = jwt.sign(
        {
          iat: nowManual - 60,
          exp: nowManual + 600,
          iss: numericAppId,
        },
        processedPrivateKey,
        { algorithm: 'RS256' }
      );

      console.log('[githubService] Manual JWT created');

      // Create Octokit instance authenticated as the App (JWT)
      const appOctokit = new Octokit({
        auth: appJwt,
        request: { timeout: 30000 },
      });

      // Verify the JWT works by calling /app
      const appResp = await appOctokit.apps.getAuthenticated();
      // console.log('[githubService] App authenticated successfully. App name:', appResp.data.name);

      // Get installation ID if not provided
      let installationId = this.config.installationId;
      if (!installationId) {
        const installations = await appOctokit.apps.listInstallations();
        if (installations.data?.length) {
          installationId = String(installations.data[0].id);
          console.log('[githubService] Using installation id from first installation:', installationId);
        } else {
          throw new Error('No installations found for GitHub App');
        }
      }

      // Create installation access token
      const tokenResp = await appOctokit.request('POST /app/installations/{installation_id}/access_tokens', {
        installation_id: Number(installationId),
        permissions: {
          contents: 'write',
          administration: 'write',
          metadata: 'read',
        },
      });

      const installationToken = tokenResp.data?.token;
      if (!installationToken) {
        throw new Error('Failed to obtain installation token');
      }

      console.log('[githubService] Installation token obtained successfully');
      
      // Log the actual permissions granted
      console.log('[githubService] Token permissions granted:', JSON.stringify(tokenResp.data?.permissions || {}, null, 2));
      console.log('[githubService] Token expires at:', tokenResp.data?.expires_at || 'unknown');
      console.log('[githubService] Repository selection:', tokenResp.data?.repository_selection || 'unknown');
      if (tokenResp.data?.repositories) {
        console.log('[githubService] Accessible repositories:', tokenResp.data.repositories.map((r: any) => r.name).join(', '));
      }

      // Create Octokit instance with installation token (for repo operations)
      this.octokit = new Octokit({
        auth: installationToken,
        request: { timeout: 30000 },
      });

      // Test the permissions by trying to get the organization
      try {
        const orgResp = await this.octokit.orgs.get({
          org: this.config.organizationName,
        });
        console.log('Organization verified:', orgResp.data.login);
        
        // Additional permission checks
        try {
          // Check if we can list repos in the org
          const repoListResp = await this.octokit.repos.listForOrg({
            org: this.config.organizationName,
            per_page: 1
          });
          console.log('[githubService] Can list organization repositories: YES');
        } catch (listError: any) {
          console.error('[githubService] Cannot list organization repositories:', listError.message);
        }
        
        // Check current user permissions
        try {
          const userResp = await this.octokit.users.getAuthenticated();
          console.log('[githubService] Authenticated as:', userResp.data.login || 'GitHub App');
        } catch (userError: any) {
          console.log('[githubService] Running as GitHub App installation (not user)');
        }
        
      } catch (orgError: any) {
        console.error('[githubService] Organization access test failed:', orgError.message);
        if (orgError.status === 403) {
          console.error('[githubService] This might indicate insufficient permissions');
          console.error('[githubService] Error response:', JSON.stringify(orgError.response?.data || {}, null, 2));
        }
      }

      console.log('GitHub Service initialized successfully');
    } catch (error: any) {
      console.error('Failed to initialize GitHub Service:', error.message);
      console.error('Falling back to mock mode');
      this.isGitHubDisabled = true;
    }
  }

  /**
   * Lists all installations of the GitHub App
   */
  async listInstallations() {
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, returning mock installations');
      return [];
    }
    
    try {
      // Create app JWT for listing installations
      const numericAppId = Number(this.config.appId);
      const processedPrivateKey = this.config.privateKey.replace(/\\n/g, '\n');
      
      const nowManual = Math.floor(Date.now() / 1000);
      const appJwt = jwt.sign(
        {
          iat: nowManual - 60,
          exp: nowManual + 600,
          iss: numericAppId,
        },
        processedPrivateKey,
        { algorithm: 'RS256' }
      );

      const appOctokit = new Octokit({
        auth: appJwt,
        request: { timeout: 30000 },
      });

      const { data: installations } = await appOctokit.apps.listInstallations();
      console.log('Found installations:', installations.length);
      return installations;
    } catch (error: any) {
      console.error('Error listing installations:', error);
      throw new Error(`Failed to list installations: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Creates a temporary repository for a test submission and pushes initial project files
   */
  async createTemporaryRepo(
    testId: string, 
    userId: string, 
    projectFiles: Array<{ path: string; content: string }> = []
  ): Promise<{ repoUrl: string; cloneUrl: string }> {
    console.log(`GithubService.createTemporaryRepo: Starting repo creation for testId: ${testId}, userId: ${userId}`);
    console.log(`GithubService.createTemporaryRepo: Number of project files to commit: ${projectFiles.length}`);
    
    // If GitHub is disabled, return a mock repository
    if (this.isGitHubDisabled) {
      const mockRepoName = `test-${testId.substring(0, 10)}-${Date.now()}`;
      const mockRepoUrl = `https://github.com/mock-org/${mockRepoName}`;
      console.log('GitHub disabled, returning mock repository URL:', mockRepoUrl);
      return {
        repoUrl: mockRepoUrl,
        cloneUrl: `${mockRepoUrl}.git`,
      };
    }
    
    // Generate repository name
    let repoName;
    if (userId === '00000000-0000-0000-0000-000000000000' || !userId || userId.includes('00000000')) {
      repoName = `test-${testId.substring(0, 10)}-${Date.now()}`;
      console.log(`Using simplified repo name due to placeholder user ID`);
    } else {
      const shortUserId = userId.split('-')[0];
      repoName = `test-${testId.substring(0, 10)}-${shortUserId}-${Date.now()}`;
    }
    
    try {
      // First, check if this is an organization or user account
      let isOrganization = true;
      let accountInfo: any = null;
      
      try {
        // Try to get organization info
        const orgResp = await this.octokit!.orgs.get({
          org: this.config.organizationName,
        });
        accountInfo = orgResp.data;
        console.log('Account type: Organization');
        console.log('Organization verified:', orgResp.data.login);
      } catch (orgError: any) {
        if (orgError.status === 404) {
          // Not an organization, try as user
          try {
            const userResp = await this.octokit!.users.getByUsername({
              username: this.config.organizationName,
            });
            accountInfo = userResp.data;
            isOrganization = false;
            console.log('Account type: User');
            console.log('User account verified:', userResp.data.login);
          } catch (userError: any) {
            throw new Error(`Account '${this.config.organizationName}' not found as organization or user`);
          }
        } else {
          throw orgError;
        }
      }
      
      // Log account details that might affect repo creation
      if (isOrganization) {
        console.log('Organization details:', {
          type: accountInfo.type,
          plan: accountInfo.plan?.name,
          two_factor_requirement_enabled: accountInfo.two_factor_requirement_enabled,
          members_can_create_repos: accountInfo.members_can_create_repositories,
          members_can_create_private_repos: accountInfo.members_can_create_private_repositories,
          members_can_create_public_repos: accountInfo.members_can_create_public_repositories,
        });
      } else {
        console.log('User account details:', {
          type: accountInfo.type,
          login: accountInfo.login,
          name: accountInfo.name,
          company: accountInfo.company,
        });
      }

      // Check App installation details
      try {
        // Create a fresh app JWT to get installation details
        const numericAppId = Number(this.config.appId);
        const processedPrivateKey = this.config.privateKey.replace(/\\n/g, '\n');
        
        const nowManual = Math.floor(Date.now() / 1000);
        const appJwt = jwt.sign(
          {
            iat: nowManual - 60,
            exp: nowManual + 600,
            iss: numericAppId,
          },
          processedPrivateKey,
          { algorithm: 'RS256' }
        );

        const appOctokit = new Octokit({
          auth: appJwt,
          request: { timeout: 30000 },
        });
        
        const installationResp = await appOctokit.apps.getInstallation({
          installation_id: Number(this.config.installationId)
        });
        
        console.log('App installation details:', {
          id: installationResp.data.id,
          account: (() => {
            const acc = installationResp.data.account;
            if (!acc) return 'unknown';
            return 'login' in acc ? acc.login : acc.name;
          })(),
          repository_selection: installationResp.data.repository_selection,
          permissions: installationResp.data.permissions,
          events: installationResp.data.events,
          created_at: installationResp.data.created_at,
          updated_at: installationResp.data.updated_at,
        });
      } catch (installError: any) {
        console.error('Could not fetch installation details:', installError.message);
      }

      // Create repository in the organization
      console.log('Attempting to create repository with params:', {
        owner: this.config.organizationName,
        name: repoName,
        private: false,
        auto_init: true,
        isOrganization: isOrganization,
      });
      
      let repo;
      if (isOrganization) {
        // Create in organization
        const response = await this.octokit!.repos.createInOrg({
          org: this.config.organizationName,
          name: repoName,
          private: false,
          auto_init: true,
          description: `Temporary repository for test ${testId} by user ${userId}`,
        });
        repo = response.data;
      } else {
        // Create for authenticated installation (works for user accounts)
        const response = await this.octokit!.repos.createForAuthenticatedUser({
          name: repoName,
          private: false,
          auto_init: true,
          description: `Temporary repository for test ${testId} by user ${userId}`,
        });
        repo = response.data;
      }

      console.log('Repository created successfully:', repo.html_url);

      // If we have project files, add them to the repository
      if (projectFiles.length > 0) {
        await this.addFilesToRepository(repoName, projectFiles);
      }

      return {
        repoUrl: repo.html_url,
        cloneUrl: repo.clone_url,
      };
    } catch (error: any) {
      console.error('Error creating temporary repository:', error);
      console.error('Error details:', {
        name: error?.name,
        message: error?.message,
        status: error?.response?.status,
        response: error?.response?.data,
        headers: error?.response?.headers,
      });
      
      // Log rate limit info if available
      if (error?.response?.headers) {
        console.error('Rate limit info:', {
          limit: error.response.headers['x-ratelimit-limit'],
          remaining: error.response.headers['x-ratelimit-remaining'],
          reset: error.response.headers['x-ratelimit-reset'] ? new Date(parseInt(error.response.headers['x-ratelimit-reset']) * 1000).toISOString() : 'unknown',
        });
      }
      
      // Enhanced error handling with specific guidance
      if (error?.response?.status === 403) {
        const errorMessage = error?.response?.data?.message || '';
        
        if (errorMessage === 'Resource not accessible by integration') {
          console.error('\n=== GitHub App Permission Error ===');
          console.error('Your GitHub App needs the following permissions:');
          console.error('Repository permissions:');
          console.error('  - Administration: Write');
          console.error('  - Contents: Write');
          console.error('  - Metadata: Read');
          console.error('Organization permissions:');
          console.error('  - Administration: Write');
          console.error('\nTo fix this:');
          console.error('1. Go to GitHub → Settings → Developer settings → GitHub Apps');
          console.error('2. Select your app');
          console.error('3. Go to "Permissions & events"');
          console.error('4. Update the permissions as listed above');
          console.error('5. Organization owners will need to approve the permission changes');
          console.error('================================\n');
          
          throw new Error('GitHub App lacks required permissions to create repositories. Please update app permissions.');
        } else if (errorMessage.includes('rate limit')) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`GitHub API access denied: ${errorMessage}`);
        }
      } else if (error?.response?.status === 404) {
        throw new Error(`GitHub organization '${this.config.organizationName}' not found or not accessible. Check configuration.`);
      } else if (error?.response?.status === 422) {
        throw new Error(`Repository name conflict or validation error: ${error?.response?.data?.message || 'Unknown validation error'}`);
      }
      
      throw new Error(`Failed to create temporary repository: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Adds files to an existing repository
   */
  private async addFilesToRepository(repoName: string, projectFiles: Array<{ path: string; content: string }>) {
    try {
      // Get repository info
      const { data: repoInfo } = await this.octokit!.repos.get({
        owner: this.config.organizationName,
        repo: repoName,
      });
      const defaultBranch = repoInfo.default_branch;

      // Get the latest commit SHA
      const { data: ref } = await this.octokit!.git.getRef({
        owner: this.config.organizationName,
        repo: repoName,
        ref: `heads/${defaultBranch}`,
      });
      const latestCommitSha = ref.object.sha;

      // Create blobs for each file
      const fileBlobs = await Promise.all(
        projectFiles.map(async (file) => {
          const { data: blob } = await this.octokit!.git.createBlob({
            owner: this.config.organizationName,
            repo: repoName,
            content: Buffer.from(file.content).toString('base64'),
            encoding: 'base64',
          });
          return { path: file.path, sha: blob.sha };
        })
      );

      // Create tree
      const { data: tree } = await this.octokit!.git.createTree({
        owner: this.config.organizationName,
        repo: repoName,
        base_tree: latestCommitSha,
        tree: fileBlobs.map(({ path, sha }) => ({
          path,
          mode: '100644',
          type: 'blob',
          sha,
        })),
      });

      // Create commit
      const { data: commit } = await this.octokit!.git.createCommit({
        owner: this.config.organizationName,
        repo: repoName,
        message: 'Initial project setup',
        tree: tree.sha,
        parents: [latestCommitSha],
      });

      // Update branch reference
      await this.octokit!.git.updateRef({
        owner: this.config.organizationName,
        repo: repoName,
        ref: `heads/${defaultBranch}`,
        sha: commit.sha,
      });

      console.log(`Successfully added ${projectFiles.length} files to repository ${repoName}`);
    } catch (error: any) {
      console.error('Error adding files to repository:', error);
      throw new Error(`Failed to add files to repository: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Archives and optionally deletes a temporary repository after test submission
   */
  async cleanupRepository(repoName: string): Promise<void> {
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, skipping repository cleanup for:', repoName);
      return;
    }
    
    try {
      // First archive the repository
      await this.octokit!.repos.update({
        owner: this.config.organizationName,
        repo: repoName,
        archived: true,
      });

      console.log(`Repository ${repoName} has been archived`);

      // Uncomment if you want to delete repositories after archival
      /*
      await this.octokit!.repos.delete({
        owner: this.config.organizationName,
        repo: repoName,
      });
      console.log(`Repository ${repoName} has been deleted`);
      */
    } catch (error: any) {
      console.error('Error cleaning up repository:', error);
      throw new Error(`Failed to cleanup repository: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Gets the latest commit SHA from a repository
   */
  async getLatestCommit(repoName: string): Promise<string> {
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, returning mock commit SHA for:', repoName);
      return 'mock-commit-sha-' + Date.now();
    }
    
    try {
      const { data: commits } = await this.octokit!.repos.listCommits({
        owner: this.config.organizationName,
        repo: repoName,
        per_page: 1,
      });

      if (commits.length === 0) {
        throw new Error('No commits found in repository');
      }

      return commits[0].sha;
    } catch (error: any) {
      console.error('Error getting latest commit:', error);
      throw new Error(`Failed to get latest commit: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Verifies a webhook payload using the webhook secret
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const hmac = crypto.createHmac('sha256', this.config.webhookSecret);
    const digest = Buffer.from('sha256=' + hmac.update(payload).digest('hex'), 'utf8');
    const checksum = Buffer.from(signature, 'utf8');
    return crypto.timingSafeEqual(digest, checksum);
  }

  /**
   * Checks if GitHub integration is working
   */
  async healthCheck(): Promise<{ status: string; message: string }> {
    if (this.isGitHubDisabled) {
      return { status: 'disabled', message: 'GitHub integration is disabled (mock mode)' };
    }

    try {
      const orgResp = await this.octokit!.orgs.get({
        org: this.config.organizationName,
      });
      return { 
        status: 'healthy', 
        message: `Successfully connected to organization: ${orgResp.data.login}` 
      };
    } catch (error: any) {
      return { 
        status: 'error', 
        message: `GitHub integration error: ${error?.message || 'Unknown error'}` 
      };
    }
  }

  /**
   * Get detailed permission information for debugging
   */
  async getPermissionDetails(): Promise<any> {
    if (this.isGitHubDisabled) {
      return { status: 'disabled', message: 'GitHub integration is disabled' };
    }

    try {
      // Create a fresh app JWT
      const numericAppId = Number(this.config.appId);
      const processedPrivateKey = this.config.privateKey.replace(/\\n/g, '\n');
      
      const nowManual = Math.floor(Date.now() / 1000);
      const appJwt = jwt.sign(
        {
          iat: nowManual - 60,
          exp: nowManual + 600,
          iss: numericAppId,
        },
        processedPrivateKey,
        { algorithm: 'RS256' }
      );

      const appOctokit = new Octokit({
        auth: appJwt,
        request: { timeout: 30000 },
      });

      // Get app info
      const appInfo = await appOctokit.apps.getAuthenticated();
      
      // Get installation info
      const installationInfo = await appOctokit.apps.getInstallation({
        installation_id: Number(this.config.installationId)
      });

      // Create new installation token to see what permissions we actually get
      const tokenResp = await appOctokit.request('POST /app/installations/{installation_id}/access_tokens', {
        installation_id: Number(this.config.installationId),
        permissions: {
          contents: 'write',
          administration: 'write',
          metadata: 'read',
        },
      });

      return {
        app: {
          id: appInfo.data?.id || 'unknown',
          name: appInfo.data?.name || 'unknown',
          slug: appInfo.data?.slug || 'unknown',
          permissions: appInfo.data?.permissions || {},
          events: appInfo.data?.events || [],
        },
        installation: {
          id: installationInfo.data.id,
          account: (() => {
            const acc = installationInfo.data.account;
            if (!acc) return 'unknown';
            return 'login' in acc ? acc.login : acc.name;
          })(),
          repository_selection: installationInfo.data.repository_selection,
          permissions: installationInfo.data.permissions,
          events: installationInfo.data.events,
        },
        token: {
          permissions: tokenResp.data?.permissions || {},
          expires_at: tokenResp.data?.expires_at,
          repository_selection: tokenResp.data?.repository_selection,
        },
        requested_permissions: {
          contents: 'write',
          administration: 'write',
          metadata: 'read',
        }
      };
    } catch (error: any) {
      return {
        error: error.message,
        details: error.response?.data || error
      };
    }
  }
}

export default GithubService;