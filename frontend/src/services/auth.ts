import { login as apiLogin, register as apiRegister } from './api';
import type { LoginCredentials, RegisterData, User } from '../types';
import { logger } from '../utils/logger';

export class AuthService {
  private static instance: AuthService;
  private user: User | null = null;
  private token: string | null = null;

  private constructor() {
    // Load user and token from localStorage on initialization
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
        logger.info('User session restored', { userId: this.user?.id });
      } catch (error) {
        logger.error('Failed to parse stored user data', error);
        this.clearSession();
      }
    } else {
      logger.debug('No stored session found');
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
      logger.debug('AuthService instance created');
    }
    return AuthService.instance;
  }

  public async validateToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      // Resolve API base URL in the same way api.ts does to ensure `/api` is present
      const rawBaseUrl = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3001/api';
      const baseURL = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl.replace(/\/+$/, '')}/api`;

      // Make a simple API call to validate the token
      const response = await fetch(`${baseURL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        logger.debug('Token validation successful');
        return true;
      } else {
        logger.warn('Token validation failed', { status: response.status });
        this.clearSession();
        return false;
      }
    } catch (error) {
      logger.error('Token validation error', error);
      this.clearSession();
      return false;
    }
  }

  public async login(credentials: LoginCredentials): Promise<User> {
    logger.info('Processing login');
    try {
      const { user, token } = await apiLogin(credentials);
      this.setSession(user, token);
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
      logger.info('Registration successful, session established', { userId: user.id });
      return user;
    } catch (error) {
      logger.error('Registration process failed', error);
      throw error;
    }
  }

  public logout(): void {
    logger.info('Logging out user', { userId: this.user?.id });
    this.clearSession();
    logger.info('User logged out, session cleared');
  }

  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    const isAuth = !!this.token && !!this.user;
    logger.debug('Checking authentication status', { 
      isAuthenticated: isAuth,
      userId: this.user?.id 
    });
    return isAuth;
  }

  public isHR(): boolean {
    const isHR = this.user?.role === 'HR';
    logger.debug('Checking HR status', { 
      isHR,
      userId: this.user?.id,
      role: this.user?.role 
    });
    return isHR;
  }

  private setSession(user: User, token: string): void {
    logger.debug('Setting up user session', { userId: user.id });
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.user = user;
    this.token = token;
    logger.info('User session established', { userId: user.id });
  }

  private clearSession(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
    this.token = null;
  }
}

export const auth = AuthService.getInstance();