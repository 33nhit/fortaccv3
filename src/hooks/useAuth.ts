import { useState, useCallback, useEffect } from 'react';
import { User, Company, AuthState, LoginCredentials, ValidationResult, RateLimitResult } from '../types/auth';

const CONFIG = {
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_LOGIN_ATTEMPTS: 3,
};

const COMPANIES: Company[] = [
  { id: 'abc_motors', name: 'ABC Motors Ltd' },
  { id: 'black_hp', name: 'Black HP Ltd' },
  { id: 'crystal_it', name: 'Crystal IT Ltd' },
];

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    company: null,
    isAuthenticated: false,
    loginAttempts: 0,
    sessionTimer: null,
  });

  const sanitizeInput = (input: string): string => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  const validateCredentials = (username: string, password: string): ValidationResult => {
    if (!username || !password) {
      return { valid: false, message: 'Please enter both username and password' };
    }
    
    if (username.length < 3) {
      return { valid: false, message: 'Username must be at least 3 characters' };
    }
    
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    
    return { valid: true };
  };

  const checkRateLimit = (): RateLimitResult => {
    if (authState.loginAttempts >= CONFIG.MAX_LOGIN_ATTEMPTS) {
      return { allowed: false, message: 'Too many login attempts. Please try again later.' };
    }
    return { allowed: true };
  };

  const generateSessionToken = (): string => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const authenticateUser = (username: string, password: string): boolean => {
    // Mock authentication - replace with real authentication
    return username.length >= 3 && password.length >= 6;
  };

  const startSessionTimer = useCallback(() => {
    if (authState.sessionTimer) {
      clearTimeout(authState.sessionTimer);
    }
    
    const timer = setTimeout(() => {
      logout();
    }, CONFIG.SESSION_TIMEOUT);
    
    setAuthState(prev => ({ ...prev, sessionTimer: timer }));
  }, [authState.sessionTimer]);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    try {
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        return { success: false, message: rateLimitCheck.message };
      }

      const sanitizedUsername = sanitizeInput(credentials.username);
      const sanitizedPassword = sanitizeInput(credentials.password);

      const validation = validateCredentials(sanitizedUsername, sanitizedPassword);
      if (!validation.valid) {
        setAuthState(prev => ({ ...prev, loginAttempts: prev.loginAttempts + 1 }));
        return { success: false, message: validation.message };
      }

      if (authenticateUser(sanitizedUsername, sanitizedPassword)) {
        const user: User = {
          id: generateSessionToken(),
          username: sanitizedUsername,
          role: 'Supervisor',
          sessionToken: generateSessionToken(),
        };

        setAuthState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          loginAttempts: 0,
        }));

        startSessionTimer();
        return { success: true };
      } else {
        setAuthState(prev => ({ ...prev, loginAttempts: prev.loginAttempts + 1 }));
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  };

  const selectCompany = (companyId: string): boolean => {
    const company = COMPANIES.find(c => c.id === companyId);
    if (company) {
      setAuthState(prev => ({ ...prev, company }));
      return true;
    }
    return false;
  };

  const logout = useCallback(() => {
    if (authState.sessionTimer) {
      clearTimeout(authState.sessionTimer);
    }
    
    setAuthState({
      user: null,
      company: null,
      isAuthenticated: false,
      loginAttempts: 0,
      sessionTimer: null,
    });
  }, [authState.sessionTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (authState.sessionTimer) {
        clearTimeout(authState.sessionTimer);
      }
    };
  }, [authState.sessionTimer]);

  return {
    ...authState,
    companies: COMPANIES,
    login,
    logout,
    selectCompany,
  };
};