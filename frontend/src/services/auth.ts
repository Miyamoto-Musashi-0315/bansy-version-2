import { logger } from '../utils/logger';
import type { User, LoginCredentials, RegisterData } from '../types';
import { login as apiLogin, register as apiRegister } from './api';

export class AuthService {
  private static instance: AuthService;
  private user: User | null = null;
  private token: string | null = null;
  private tokenObtainedAt: number = 0; // Track when token was obtained

  private constructor() {
    this.loadSession();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public async validateToken(): Promise<boolean> {
    const TIMEOUT_MS = 2000; // Reduced from 5000ms to 2000ms for better UX
    const FRESH_TOKEN_DURATION = 30000; // 30 seconds - consider token fresh if obtained recently
    
    console.log('AuthService: validateToken() called');
    
    if (!this.token) {
      console.log('AuthService: No token available');
      return false;
    }

    // Skip validation if token was obtained recently (fresh token)
    const now = Date.now();
    const tokenAge = now - this.tokenObtainedAt;
    console.log('AuthService: Token age:', tokenAge, 'ms (fresh if < 30000ms)');
    
    if (this.tokenObtainedAt && tokenAge < FRESH_TOKEN_DURATION) {
      console.log('AuthService: Skipping validation for fresh token');
      return true;
    }

    console.log('AuthService: Performing token validation via API');

    try {
      // Dynamically import the shared axios instance only when needed to avoid a
      // circular dependency with `api` importing `auth`.
      const { api } = await import('./api');

      console.log('AuthService: Making API call to /auth/validate');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('AuthService: API call timeout, aborting');
        controller.abort();
      }, TIMEOUT_MS);

      const response = await api.get('/auth/validate', {
        signal: controller.signal,
        timeout: TIMEOUT_MS,
      });
      
      clearTimeout(timeoutId);
      console.log('AuthService: Token validation successful', response.data);
      return true;
    } catch (error: unknown) {
      const err = error as { name?: string; code?: string; message?: string };
      console.error('AuthService: Token validation failed:', {
        name: err.name,
        code: err.code,
        message: err.message
      });
      
      if (err.name === 'AbortError' || err.code === 'ECONNABORTED') {
        console.log('AuthService: Token validation timed out - treating as invalid');
      } else {
        console.log('AuthService: Token validation error - clearing session');
      }

      // Only clear session on actual auth failures, not on network issues
      if (err.name !== 'AbortError' && err.code !== 'ECONNABORTED') {
        this.clearSession();
      }
      return false;
    }
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    logger.info('Processing login');
    try {
      const { user, token } = await apiLogin(credentials);
      this.setSession(user, token);
      this.tokenObtainedAt = Date.now(); // Mark token as fresh
      logger.info('Login successful, session established', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Login process failed', error);
      throw error;
    }
  }

  public async register(data: RegisterData): Promise<User> {
    logger.info('Processing registration');
    try {
      const { user, token } = await apiRegister(data);
      this.setSession(user, token);
      this.tokenObtainedAt = Date.now(); // Mark token as fresh
      logger.info('Registration successful, session established', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Registration process failed', error);
      throw error;
    }
  }

  public logout(): void {
    logger.info('User logout initiated');
    this.clearSession();
    logger.info('Session cleared successfully');
  }

  public isAuthenticated(): boolean {
    return !!(this.token && this.user);
  }

  public isHR(): boolean {
    return this.user?.role === 'HR';
  }

  public getUser(): User | null {
    return this.user;
  }

  public getToken(): string | null {
    return this.token;
  }

  private setSession(user: User, token: string): void {
    this.user = user;
    this.token = token;
    this.tokenObtainedAt = Date.now();
    
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenObtainedAt', this.tokenObtainedAt.toString());
    
    logger.debug('Session data stored', { userId: user.id });
  }

  private loadSession(): void {
    console.log('AuthService: Loading session from localStorage');
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      const storedTokenTime = localStorage.getItem('tokenObtainedAt');

      console.log('AuthService: Stored data found:', {
        hasUser: !!storedUser,
        hasToken: !!storedToken,
        hasTokenTime: !!storedTokenTime,
        tokenTime: storedTokenTime
      });

      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        this.tokenObtainedAt = storedTokenTime ? parseInt(storedTokenTime, 10) : 0;
        
        console.log('AuthService: Session loaded successfully', { 
          userId: this.user?.id,
          tokenObtainedAt: this.tokenObtainedAt,
          tokenAge: Date.now() - this.tokenObtainedAt
        });
      } else {
        console.log('AuthService: No complete session data found in localStorage');
      }
    } catch (error) {
      console.error('AuthService: Failed to load session from storage', error);
      this.clearSession();
    }
  }

  private clearSession(): void {
    this.user = null;
    this.token = null;
    this.tokenObtainedAt = 0;
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenObtainedAt');
    
    logger.debug('Session cleared');
  }
}

export const auth = AuthService.getInstance();