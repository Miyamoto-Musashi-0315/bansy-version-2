import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

interface ProjectFile {
  path: string;
  content: string;
}

// New interface for GitHub Issue creation
interface GitHubIssueTemplate {
  title: string;
  description: string;
  labels: string[];
  testCaseIds: number[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
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
  private initializationPromise: Promise<void>;

  constructor(config: GithubConfig) {
    this.config = config;
    this.isGitHubDisabled = false;
    
    this.initializationPromise = this.initializeGitHub();
  }

  /**
   * Ensures GitHub service is initialized before use
   */
  private async ensureInitialized(): Promise<void> {
    await this.initializationPromise;
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
          issues: 'write',
          workflows: 'write',
          actions: 'write', // NEW: allow dispatching workflows & managing Actions API
          metadata: 'read',
          pull_requests: 'write'
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
    projectFiles: Array<{ path: string; content: string }> = [],
    workflowFiles: Array<{ path: string; content: string }> = [],
    githubIssues: GitHubIssueTemplate[] = []
  ): Promise<{ repoUrl: string; cloneUrl: string }> {
    console.log(`GithubService.createTemporaryRepo: Starting repo creation for testId: ${testId}, userId: ${userId}`);
    console.log(`GithubService.createTemporaryRepo: Number of project files to commit: ${projectFiles.length}`);
    
    // Ensure GitHub service is initialized
    await this.ensureInitialized();
    
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

      // Combine project files and workflow files so they are all committed in one go
      const allFiles = [...projectFiles, ...workflowFiles];

      // If we have files to add, push them to the repository
      if (allFiles.length > 0) {
        console.log(`Attempting to add ${allFiles.length} files to repository...`);
        try {
          await this.addFilesToRepository(repoName, allFiles);
          console.log(`✅ Successfully added all files to ${repoName}`);
        } catch (fileError: any) {
          console.error(`⚠️ Warning: Failed to add some files to repository ${repoName}:`, fileError.message);
          // Don't fail the entire operation if file addition fails
          // The repository is still created and can be used
          console.log('Repository created successfully but some files may be missing. You can add them manually.');
        }
      }

      // Create GitHub issues mapped to features / test cases
      if (githubIssues.length > 0) {
        console.log(`Creating ${githubIssues.length} GitHub issues...`);
        try {
          await this.createGitHubIssues(repoName, githubIssues);
          console.log(`✅ Successfully created GitHub issues`);
          // After issues, open placeholder PRs for each
          await this.createPullRequests(repoName, githubIssues);
        } catch (issueError: any) {
          console.error(`⚠️ Warning: Failed to create GitHub issues:`, issueError.message);
          // Proceed without blocking the repository creation
        }
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
   * Adds files to an existing repository using the Contents API (more reliable than Git Trees API)
   */
  private async addFilesToRepository(repoName: string, projectFiles: Array<{ path: string; content: string }>) {
    await this.ensureInitialized();
    
    try {
      console.log(`Adding ${projectFiles.length} files to repository ${repoName} using Contents API`);
      
      // Use the Contents API to add files one by one (more reliable than Git Trees API)
      for (const file of projectFiles) {
        try {
          console.log(`Adding file: ${file.path}`);
          
          // Check if file already exists to handle conflicts
          let existingFileSha: string | undefined;
          try {
            const { data: existingFile } = await this.octokit!.repos.getContent({
              owner: this.config.organizationName,
              repo: repoName,
              path: file.path,
            });
            
            // If file exists and is a file (not directory), get its SHA
            if ('sha' in existingFile) {
              existingFileSha = existingFile.sha;
              console.log(`File ${file.path} already exists, updating with SHA: ${existingFileSha}`);
            }
          } catch (getError: any) {
            // File doesn't exist, which is fine - we'll create it
            if (getError.status !== 404) {
              console.warn(`Warning checking file existence for ${file.path}:`, getError.message);
            }
          }
          
          // Create or update the file using Contents API
          const createParams: any = {
            owner: this.config.organizationName,
            repo: repoName,
            path: file.path,
            message: existingFileSha ? `Update ${file.path}` : `Add ${file.path}`,
            content: Buffer.from(file.content).toString('base64'),
            committer: {
              name: 'Bansy Assessment Platform',
              email: 'noreply@bansy.com'
            },
            author: {
              name: 'Bansy Assessment Platform', 
              email: 'noreply@bansy.com'
            }
          };
          
          // Include SHA if file already exists
          if (existingFileSha) {
            createParams.sha = existingFileSha;
          }
          
          await this.octokit!.repos.createOrUpdateFileContents(createParams);
          
          console.log(`✅ Successfully added: ${file.path}`);
        } catch (fileError: any) {
          console.error(`❌ Failed to add file ${file.path}:`, fileError.message);
          // Continue with other files instead of failing completely
        }
        
        // Small delay to avoid rate limiting
        if (projectFiles.indexOf(file) < projectFiles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      console.log(`Successfully added files to repository ${repoName}`);
    } catch (error: any) {
      console.error('Error adding files to repository:', error);
      throw new Error(`Failed to add files to repository: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Creates GitHub Issues for the assessment project
   */
  private async createGitHubIssues(repoName: string, issues: GitHubIssueTemplate[]): Promise<void> {
    await this.ensureInitialized();
    
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, skipping issue creation for:', repoName);
      return;
    }

    try {
      console.log(`Creating ${issues.length} GitHub issues for repository ${repoName}`);
      
      for (let index = 0; index < issues.length; index++) {
        const issue = issues[index];
        // Create the issue body with enhanced formatting
        const issueBody = `
${issue.description}

## Acceptance Criteria
- Implement the functionality described above
- Ensure all related test cases pass
- Follow best practices for ${issue.difficulty} level implementation

## Test Cases
This issue is validated by test case(s): ${issue.testCaseIds.map(id => `#${id + 1}`).join(', ')}

## Points
**${issue.points} points** - Difficulty: **${issue.difficulty}**

## Getting Started
1. Read the issue description carefully
2. Check the existing codebase and tests
3. Implement your solution
4. Run tests to validate your implementation
5. Push your changes to see automated test results

---
*This is an automated assessment issue. Your implementation will be evaluated automatically.*
        `.trim();

        try {
          // Create the issue
          const { data: createdIssue } = await this.octokit!.issues.create({
            owner: this.config.organizationName,
            repo: repoName,
            title: `[${issue.difficulty.toUpperCase()}] ${issue.title}`,
            body: issueBody,
            labels: [...issue.labels, issue.difficulty, 'assessment']
          });

          console.log(`Created issue #${createdIssue.number}: ${issue.title}`);
        } catch (issueError: any) {
          console.warn(`⚠️ Warning: Could not create issue "${issue.title}":`, issueError.message);
          
          if (issueError.status === 403 || issueError.status === 422) {
            console.warn('This might be due to missing GitHub App permissions for issues.');
            console.warn('You can add issues manually or update the GitHub App permissions.');
          }
          // Continue with other issues
        }
      }

      console.log(`GitHub issues creation process completed`);
    } catch (error: any) {
      console.error('Error in GitHub issues creation process:', error.message);
      // Don't throw - this is not critical for repository functionality
    }
  }

  /**
   * Creates placeholder feature branches and pull requests linked to the given issues
   */
  private async createPullRequests(repoName: string, issues: GitHubIssueTemplate[]): Promise<void> {
    await this.ensureInitialized();

    if (this.isGitHubDisabled) return;

    try {
      console.log(`Creating pull requests for ${issues.length} issues in ${repoName}`);

      // Get default branch (assume main if query fails)
      let defaultBranch = 'main';
      try {
        const { data: repo } = await this.octokit!.repos.get({ owner: this.config.organizationName, repo: repoName });
        defaultBranch = repo.default_branch || 'main';
      } catch {}

      // Get latest commit SHA on default branch
      const latestSha = await this.getLatestCommit(repoName);

      for (const issue of issues) {
        const branchName = issue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);

        try {
          // Create branch ref
          await this.octokit!.git.createRef({
            owner: this.config.organizationName,
            repo: repoName,
            ref: `refs/heads/${branchName}`,
            sha: latestSha,
          });

          /*
           * CREATE A PLACEHOLDER COMMIT
           * Without an extra commit the branch is identical to main and GitHub
           * rejects the PR (HTTP 422 – "No commits between ...").
           * We add a tiny marker file under .bansy/ so it doesn't clash with
           * real project code.
           */
          const placeholderPath = `.bansy/${branchName}.md`;
          const placeholderContent = Buffer.from(`# Work for: ${issue.title}\n`).toString('base64');

          await this.octokit!.repos.createOrUpdateFileContents({
            owner: this.config.organizationName,
            repo: repoName,
            path: placeholderPath,
            message: `chore: add placeholder for ${issue.title}`,
            content: placeholderContent,
            branch: branchName,
            committer: { name: 'Bansy Bot', email: 'bot@bansy.com' },
            author: { name: 'Bansy Bot', email: 'bot@bansy.com' },
          });

          // Open PR
          const { data: pr } = await this.octokit!.pulls.create({
            owner: this.config.organizationName,
            repo: repoName,
            title: issue.title,
            head: branchName,
            base: defaultBranch,
            body: `This pull request tracks work for **${issue.title}**\n\nResolves #${issue.title}`,
          });

          console.log(`Created PR #${pr.number} for issue '${issue.title}'`);
        } catch (prErr: any) {
          console.warn(`⚠️ Could not create PR for issue ${issue.title}:`, prErr.message);
        }
      }
    } catch (err) {
      console.error('Error creating pull requests:', err);
    }
  }

  /**
   * Enhanced createTemporaryRepo that handles workflows and issues
   */
  async createCandidateRepo(
    testId: string, 
    candidateId: string, 
    projectFiles: Array<{ path: string; content: string }> = [],
    workflowFiles: Array<{ path: string; content: string }> = [],
    githubIssues: GitHubIssueTemplate[] = []
  ): Promise<{ repoUrl: string; cloneUrl: string }> {
    console.log(`GithubService.createCandidateRepo: Starting repo creation for candidate: ${candidateId}, testId: ${testId}`);
    console.log(`Files to commit: ${projectFiles.length} project + ${workflowFiles.length} workflow files`);
    console.log(`Issues to create: ${githubIssues.length}`);
    
    // If GitHub is disabled, return a mock repository
    if (this.isGitHubDisabled) {
      const mockRepoName = `candidate-${candidateId.substring(0, 8)}-test-${testId.substring(0, 8)}`;
      const mockRepoUrl = `https://github.com/mock-org/${mockRepoName}`;
      console.log('GitHub disabled, returning mock repository URL:', mockRepoUrl);
      return {
        repoUrl: mockRepoUrl,
        cloneUrl: `${mockRepoUrl}.git`,
      };
    }
    
    // Generate repository name for individual candidate
    const shortCandidateId = candidateId.split('-')[0];
    const shortTestId = testId.substring(0, 8);
    const timestamp = Date.now();
    const repoName = `candidate-${shortCandidateId}-test-${shortTestId}-${timestamp}`;
    
    console.log(`Generated repository name: ${repoName}`);
    
    try {
      // Ensure GitHub service is initialized
      await this.ensureInitialized();
      
      // Create the repository directly (don't use createTemporaryRepo to avoid name conflicts)
      console.log('Creating repository...');
      
      // Create repository in the organization
      let repo;
      const response = await this.octokit!.repos.createInOrg({
        org: this.config.organizationName,
        name: repoName,
        private: false,
        auto_init: true,
        description: `Assessment repository for candidate ${candidateId}`,
      });
      repo = response.data;

      console.log('Repository created successfully:', repo.html_url);
      
      // Ensure there is at least one CI workflow that uploads test results artifacts
      const hasWorkflow = (workflowFiles || []).some(f => typeof f?.path === 'string' && f.path.startsWith('.github/workflows/'));
      const effectiveWorkflowFiles = [...(workflowFiles || [])];
      if (!hasWorkflow) {
        console.log('[GitHub] No workflow files provided – injecting default CI workflow with artifact upload');
        const defaultCi = `name: CI/CD\n\non:\n  push:\n    branches: [\"main\"]\n  workflow_dispatch:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n      - name: Install dependencies\n        run: npm ci || npm install\n      - name: Run tests (Jest JSON)\n        run: npm test -- --json --outputFile=jest-results.json --runInBand || true\n      - name: Upload test results\n        uses: actions/upload-artifact@v4\n        with:\n          name: test-results\n          path: jest-results.json\n`;
        effectiveWorkflowFiles.push({ path: '.github/workflows/ci.yml', content: defaultCi });
      }
      
      // Combine all files (project files + workflow files)
      const allFiles = [...projectFiles, ...effectiveWorkflowFiles];
      
      // Add all files to the repository
      if (allFiles.length > 0) {
        console.log(`Attempting to add ${allFiles.length} files to repository...`);
        try {
          await this.addFilesToRepository(repoName, allFiles);
          console.log(`✅ Successfully added all files to ${repoName}`);
        } catch (fileError: any) {
          console.error(`⚠️ Warning: Failed to add some files to repository ${repoName}:`, fileError.message);
          // Don't fail the entire operation if file addition fails
          console.log('Repository created successfully but some files may be missing.');
        }
      }
      
      // Create GitHub Issues
      if (githubIssues.length > 0) {
        console.log(`Creating ${githubIssues.length} GitHub issues...`);
        try {
          await this.createGitHubIssues(repoName, githubIssues);
          console.log(`✅ Successfully created GitHub issues`);
          // After issues, open placeholder PRs for each
          await this.createPullRequests(repoName, githubIssues);
        } catch (issueError: any) {
          console.error(`⚠️ Warning: Failed to create GitHub issues:`, issueError.message);
          // Don't fail the entire operation if issue creation fails
        }
      }
      
      console.log(`Candidate repository created successfully: ${repo.html_url}`);
      return { 
        repoUrl: repo.html_url, 
        cloneUrl: repo.clone_url 
      };
      
    } catch (error: any) {
      console.error('Error creating candidate repository:', error);
      throw new Error(`Failed to create candidate repository: ${error?.message || 'Unknown error'}`);
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
      console.log(`[Cleanup] Starting repository cleanup for: ${repoName}`);

      // First, update our database to mark the repository as archived
      const test = await this.updateTestArchivalStatus(repoName);
      
      // Archive the repository on GitHub
      await this.octokit!.repos.update({
        owner: this.config.organizationName,
        repo: repoName,
        archived: true,
      });

      console.log(`[Cleanup] Repository ${repoName} has been archived on GitHub`);

      // If this is a candidate repository, update candidate status to completed
      await this.updateCandidateStatus(repoName);

      // Optional: Delete repository after archival (commented out for safety)
      // Enable this only if you want permanent deletion
      /*
      await this.octokit!.repos.delete({
        owner: this.config.organizationName,
        repo: repoName,
      });
      console.log(`[Cleanup] Repository ${repoName} has been deleted`);
      */

      console.log(`[Cleanup] Cleanup completed for repository: ${repoName}`);
    } catch (error: any) {
      console.error('[Cleanup] Error cleaning up repository:', error);
      throw new Error(`Failed to cleanup repository: ${error?.message || 'Unknown error'}`);
    }
  }

  /**
   * Update database records when a repository is archived
   */
  private async updateTestArchivalStatus(repoName: string): Promise<any> {
    try {
      // Import Prisma client (we'll need to add this import at the top)
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();

      // Find and update the test record
      const test = await prisma.test.findFirst({
        where: { gitRepoUrl: { contains: repoName } }
      });

      if (test) {
        const updatedTest = await prisma.test.update({
          where: { id: test.id },
          data: {
            repoArchived: true,
            repoArchivedAt: new Date(),
          },
        });
        console.log(`[Cleanup] Marked test ${test.id} as archived in database`);
        await prisma.$disconnect();
        return updatedTest;
      } else {
        console.log(`[Cleanup] No test found for repository: ${repoName}`);
        await prisma.$disconnect();
        return null;
      }
    } catch (error) {
      console.error('[Cleanup] Error updating test archival status:', error);
      throw error;
    }
  }

  /**
   * Update candidate status when their repository is archived
   */
  private async updateCandidateStatus(repoName: string): Promise<void> {
    try {
      // Extract candidate ID from repository name
      const repoMatch = repoName.match(/candidate-([^-]+)-test-([^-]+)-/);
      
      if (repoMatch) {
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();

        const candidateIdPrefix = repoMatch[1];
        
        // Find the candidate
        const candidate = await prisma.candidate.findFirst({
          where: { id: { startsWith: candidateIdPrefix } }
        });

        if (candidate) {
          await prisma.candidate.update({
            where: { id: candidate.id },
            data: { status: 'Completed' }
          });
          console.log(`[Cleanup] Updated candidate ${candidate.id} status to Completed`);
        }

        await prisma.$disconnect();
      }
    } catch (error) {
      console.error('[Cleanup] Error updating candidate status:', error);
      // Don't throw here - archival can still succeed even if candidate update fails
    }
  }

  /**
   * Bulk cleanup repositories based on criteria (for scheduled cleanup jobs)
   */
  async scheduleRepositoryCleanup(criteria: {
    olderThanDays?: number;
    status?: string;
    maxRepos?: number;
  } = {}): Promise<{ processed: number; errors: string[] }> {
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, skipping scheduled cleanup');
      return { processed: 0, errors: [] };
    }

    const { olderThanDays = 7, status = 'TestSent', maxRepos = 10 } = criteria;
    const errors: string[] = [];
    let processed = 0;

    try {
      console.log(`[Scheduled Cleanup] Starting bulk cleanup with criteria:`, criteria);

      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();

      // Find candidates with old repositories that should be cleaned up
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

      const candidatesForCleanup = await prisma.candidate.findMany({
        where: {
          status: status,
          updatedAt: { lt: cutoffDate },
        },
        include: {
          jobDescription: {
            include: {
              test: true
            }
          }
        },
        take: maxRepos,
      });

      console.log(`[Scheduled Cleanup] Found ${candidatesForCleanup.length} candidates for cleanup`);

      for (const candidate of candidatesForCleanup) {
        try {
          const test = candidate.jobDescription.test;
          if (test?.gitRepoUrl && !test.repoArchived) {
            // Extract repository name from URL
            const repoName = test.gitRepoUrl.split('/').pop()?.replace('.git', '');
            if (repoName) {
              await this.cleanupRepository(repoName);
              processed++;
              console.log(`[Scheduled Cleanup] Cleaned up repository for candidate ${candidate.id}`);
            }
          }
        } catch (error: any) {
          const errorMsg = `Failed to cleanup candidate ${candidate.id}: ${error.message}`;
          errors.push(errorMsg);
          console.error(`[Scheduled Cleanup] ${errorMsg}`);
        }
      }

      await prisma.$disconnect();
      console.log(`[Scheduled Cleanup] Completed. Processed: ${processed}, Errors: ${errors.length}`);
      
      return { processed, errors };
    } catch (error: any) {
      console.error('[Scheduled Cleanup] Error in bulk cleanup:', error);
      return { processed, errors: [`Bulk cleanup failed: ${error.message}`] };
    }
  }

  /**
   * Fetch repository contents for LLM analysis
   * Recursively gets all code files from the repository
   */
  async getRepositoryContents(repoName: string): Promise<Array<{ path: string; content: string }>> {
    if (this.isGitHubDisabled) {
      console.log('GitHub disabled, returning empty repository contents');
      return [];
    }

    try {
      console.log(`[GitHub] Fetching repository contents for: ${repoName}`);
      await this.ensureInitialized();

      const files: Array<{ path: string; content: string }> = [];
      
      // Get repository tree recursively
      const tree = await this.octokit!.git.getTree({
        owner: this.config.organizationName,
        repo: repoName,
        tree_sha: 'HEAD',
        recursive: 'true'
      });

      console.log(`[GitHub] Found ${tree.data.tree.length} items in repository tree`);

      // Filter for code files and get their contents
      const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.cs', '.go', '.rb', '.php', '.swift', '.kt', '.rs', '.scala'];
      const importantFiles = ['README.md', 'package.json', 'requirements.txt', 'Dockerfile', 'docker-compose.yml', '.env.example'];
      
      for (const item of tree.data.tree) {
        // Skip directories and non-code files
        if (item.type !== 'blob' || !item.path) continue;
        
        // Check if it's a code file or important configuration file
        const isCodeFile = codeExtensions.some(ext => item.path!.endsWith(ext));
        const isImportantFile = importantFiles.some(file => item.path!.endsWith(file));
        
        // Skip hidden files, node_modules, and other unwanted directories
        if (item.path.startsWith('.') && !isImportantFile) continue;
        if (item.path.includes('node_modules/')) continue;
        if (item.path.includes('__pycache__/')) continue;
        if (item.path.includes('.git/')) continue;
        
        if (isCodeFile || isImportantFile) {
          try {
            console.log(`[GitHub] Fetching content for: ${item.path}`);
            
            const fileContent = await this.octokit!.repos.getContent({
              owner: this.config.organizationName,
              repo: repoName,
              path: item.path
            });

            if ('content' in fileContent.data) {
              const content = Buffer.from(fileContent.data.content, 'base64').toString('utf-8');
              
              // Skip very large files (> 50KB) to avoid overwhelming the LLM
              if (content.length > 50000) {
                console.log(`[GitHub] Skipping large file: ${item.path} (${content.length} bytes)`);
                continue;
              }
              
              files.push({
                path: item.path,
                content: content
              });
              
              console.log(`[GitHub] Added file: ${item.path} (${content.length} bytes)`);
            }
          } catch (fileError: any) {
            console.warn(`[GitHub] Could not fetch ${item.path}:`, fileError.message);
            // Continue with other files
          }
        }
      }

      console.log(`[GitHub] Successfully fetched ${files.length} files from ${repoName}`);
      return files;

    } catch (error: any) {
      console.error('[GitHub] Error fetching repository contents:', error);
      
      // Return empty array rather than throwing, so LLM evaluation can still proceed
      // with just CI/CD results if repository access fails
      return [];
    }
  }

  // Fetch the latest workflow run status for a repository (fallback when webhooks can't reach us)
  async getLatestWorkflowConclusion(repoName: string): Promise<{ status: 'completed' | 'in_progress' | 'queued'; conclusion: 'success' | 'failure' | 'cancelled' | 'timed_out' | null } | null> {
    await this.ensureInitialized();
    if (this.isGitHubDisabled) {
      console.log('[GitHub] Disabled – skipping getLatestWorkflowConclusion');
      return null;
    }
    try {
      const { data } = await this.octokit!.actions.listWorkflowRunsForRepo({
        owner: this.config.organizationName,
        repo: repoName,
        per_page: 1,
        branch: 'main'
      });
      const run = data.workflow_runs?.[0];
      if (!run) return null;
      return { status: (run.status as any) || 'queued', conclusion: (run.conclusion as any) || null };
    } catch (err) {
      console.error('[GitHub] Failed to fetch latest workflow run:', err);
      return null;
    }
  }

  // Download and parse test result artifacts from the latest completed workflow run
  async getLatestWorkflowTestResults(repoName: string): Promise<Array<{ testCase: number; passed: boolean; title?: string; error?: string }>> {
    await this.ensureInitialized();
    if (this.isGitHubDisabled) return [];
    try {
      const runs = await this.octokit!.actions.listWorkflowRunsForRepo({
        owner: this.config.organizationName,
        repo: repoName,
        per_page: 10,
        status: 'completed'
      });
      const runList = runs.data.workflow_runs || [];
      if (runList.length === 0) return [];

      for (const run of runList) {
        try {
          const { data: artifactsResp } = await this.octokit!.actions.listWorkflowRunArtifacts({
            owner: this.config.organizationName,
            repo: repoName,
            run_id: run.id,
            per_page: 100
          });

          const preferredArtifacts = ['test-results', 'jest-results', 'junit', 'results'];
          const ordered = artifactsResp.artifacts.sort((a: any, b: any) => {
            const ai = preferredArtifacts.findIndex(p => (a.name || '').includes(p));
            const bi = preferredArtifacts.findIndex(p => (b.name || '').includes(p));
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
          });

          for (const artifact of ordered) {
            try {
              const resp = await this.octokit!.actions.downloadArtifact({
                owner: this.config.organizationName,
                repo: repoName,
                artifact_id: artifact.id,
                archive_format: 'zip'
              });

              const AdmZip = require('adm-zip');
              const { parseStringPromise } = require('xml2js');

              const buffer = Buffer.isBuffer(resp.data) ? resp.data : Buffer.from(resp.data as any);
              const zip = new AdmZip(buffer);
              const entries = zip.getEntries();

              const jestEntry = entries.find((e: any) => /jest.*\.json$/i.test(e.entryName) || /test-results.*\.json$/i.test(e.entryName));
              const junitEntry = entries.find((e: any) => /junit.*\.xml$/i.test(e.entryName) || /test-results.*\.xml$/i.test(e.entryName) || /reports?\/.*\.xml$/i.test(e.entryName));

              if (jestEntry) {
                const raw = jestEntry.getData().toString('utf8');
                const json = JSON.parse(raw);
                const flattened: Array<{ title: string; status: string; failureMessages?: string[] }> = [];
                for (const suite of Array.isArray(json?.testResults) ? json.testResults : []) {
                  for (const ar of Array.isArray(suite?.assertionResults) ? suite.assertionResults : []) {
                    flattened.push({ title: ar?.fullName || ar?.title || 'Test', status: ar?.status || 'unknown', failureMessages: ar?.failureMessages || [] });
                  }
                }
                return flattened.map((item, index) => ({
                  testCase: index,
                  passed: item.status === 'passed',
                  title: item.title,
                  error: item.status === 'passed' ? undefined : (Array.isArray(item.failureMessages) ? item.failureMessages.join('\n\n') : 'Test failed')
                }));
              }

              if (junitEntry) {
                const raw = junitEntry.getData().toString('utf8');
                const xml: any = await parseStringPromise(raw, { explicitArray: false, mergeAttrs: true });
                type Case = { name?: string; failure?: any };
                const tests: Array<{ name: string; errorMsg?: string }> = [];
                const suitesAny = (xml?.testsuites?.testsuite || xml?.testsuite || []) as any;
                const suiteArr = Array.isArray(suitesAny) ? suitesAny : [suitesAny];
                for (const suite of suiteArr) {
                  const casesAny = (suite?.testcase || []) as any;
                  const caseArr = Array.isArray(casesAny) ? casesAny : [casesAny];
                  for (const c of caseArr as Case[]) {
                    let errorMsg: string | undefined;
                    const failure = (c as any)?.failure;
                    if (failure) {
                      if (Array.isArray(failure)) {
                        errorMsg = failure.map((f: any) => (typeof f === 'string' ? f : f?._ || '')).join('\n\n');
                      } else if (typeof failure === 'string') {
                        errorMsg = failure;
                      } else if (typeof failure === 'object') {
                        const underscore = (failure as any)?._;
                        errorMsg = typeof underscore === 'string' ? underscore : JSON.stringify(failure);
                      }
                    }
                    tests.push({ name: (c as any)?.name || 'Test', errorMsg });
                  }
                }
                return tests.map((t, index) => ({
                  testCase: index,
                  passed: !t.errorMsg,
                  title: t.name,
                  error: t.errorMsg,
                }));
              }
            } catch (artifactErr: any) {
              const msg = artifactErr?.message || artifactErr;
              console.warn('[GitHub] Failed to process artifact', artifact?.name, msg);
              continue;
            }
          }
        } catch (runErr: any) {
          console.warn('[GitHub] Skipping run id', run?.id, 'due to error:', runErr?.message || runErr);
          continue;
        }
      }
    } catch (err: any) {
      console.error('[GitHub] Error fetching workflow artifacts:', err?.message || err);
    }
    return [];
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

  async triggerWorkflowDispatch(repoName: string, options: { workflowFileName?: string; ref?: string } = {}): Promise<void> {
    await this.ensureInitialized();
    if (this.isGitHubDisabled) {
      console.log('[GitHub] Disabled – skipping workflow dispatch');
      return;
    }

    const addRepoToInstallation = async () => {
      try {
        console.log(`[GitHub] Attempting to add repo '${repoName}' to installation ${this.config.installationId}`);
        const { data: repo } = await this.octokit!.repos.get({
          owner: this.config.organizationName,
          repo: repoName,
        });

        await this.octokit!.apps.addRepoToInstallation({
          installation_id: Number(this.config.installationId),
          repository_id: repo.id,
        });
        console.log('[GitHub] Repo successfully added to installation');
      } catch (e: any) {
        console.error('[GitHub] Failed to add repo to installation:', e.message || e);
        throw e;
      }
    };

    const { workflowFileName = 'ci.yml', ref = 'main' } = options;
    const attemptDispatch = async (): Promise<void> => {
      console.log(`[GitHub] Triggering workflow dispatch for repo: ${repoName}, workflow: ${workflowFileName}, ref: ${ref}`);
      await this.octokit!.actions.createWorkflowDispatch({
        owner: this.config.organizationName,
        repo: repoName,
        workflow_id: workflowFileName,
        ref,
      });
      console.log('[GitHub] Workflow dispatch triggered successfully');
    };

    try {
      // First, make sure the workflow is enabled (new repos created by Apps default to disabled)
      try {
        await this.octokit!.actions.enableWorkflow({
          owner: this.config.organizationName,
          repo: repoName,
          workflow_id: workflowFileName,
        });
        console.log('[GitHub] Workflow enabled (if it was previously disabled)');
      } catch (enableErr: any) {
        // 404 means workflow already enabled, other errors we log and continue
        const ignorable = enableErr?.status === 404;
        if (!ignorable) {
          console.warn('[GitHub] Could not explicitly enable workflow – proceeding anyway:', enableErr.message || enableErr);
        }
      }

      await attemptDispatch();
    } catch (error: any) {
      // If the first dispatch fails with 403, attempt to enable and retry once
      if (error?.status === 403 && /Resource not accessible by integration/i.test(error.message || '')) {
        console.warn('[GitHub] Dispatch returned 403 – repo may not be part of installation – attempting to add and retry');
        try {
          await addRepoToInstallation();
        } catch {}
        console.warn('[GitHub] Now attempting to enable workflow then retry');
        try {
          await this.octokit!.actions.enableWorkflow({
            owner: this.config.organizationName,
            repo: repoName,
            workflow_id: workflowFileName,
          });
          console.log('[GitHub] Workflow explicitly enabled – retrying dispatch');
          await attemptDispatch();
          return;
        } catch (retryErr) {
          console.error('[GitHub] Retry after enabling workflow failed:', retryErr);
          throw retryErr;
        }
      } else if (error?.status === 404) {
        console.warn('[GitHub] Workflow file not found. Listing available workflows to pick fallback');
        try {
          const { data } = await this.octokit!.actions.listRepoWorkflows({
            owner: this.config.organizationName,
            repo: repoName,
          });
          if (data.total_count > 0) {
            const firstWf = data.workflows[0];
            console.log(`[GitHub] Found workflow '${firstWf.name}' → retrying dispatch using id ${firstWf.id}`);
            await this.octokit!.actions.createWorkflowDispatch({
              owner: this.config.organizationName,
              repo: repoName,
              workflow_id: firstWf.id,
              ref,
            });
            console.log('[GitHub] Fallback workflow dispatch succeeded');
            return;
          } else {
            console.error('[GitHub] No workflows present in repository');
          }
        } catch (listErr) {
          console.error('[GitHub] Failed to list/dispatch workflows:', listErr);
        }
      } else if (error?.status === 422 && /workflow_dispatch/gi.test(error?.message || '')) {
        console.warn('[GitHub] Workflow lacks workflow_dispatch trigger – performing dummy commit to fire push event');
        try {
          const dummyPath = '.bansy-ci-trigger';
          const content = `trigger at ${new Date().toISOString()}`;
          await this.octokit!.repos.createOrUpdateFileContents({
            owner: this.config.organizationName,
            repo: repoName,
            path: dummyPath,
            message: 'ci: trigger workflow via dummy commit',
            content: Buffer.from(content).toString('base64'),
            committer: { name: 'Bansy CI', email: 'ci@bansy.com' },
            author: { name: 'Bansy CI', email: 'ci@bansy.com' },
          });
          console.log('[GitHub] Dummy commit pushed – workflows listening to push will run');
          return;
        } catch (dummyErr) {
          console.error('[GitHub] Failed to push dummy commit:', dummyErr);
        }
      }
      console.error('[GitHub] Failed to trigger workflow dispatch:', error.message || error);
      throw error;
    }
  }
}

export default GithubService;