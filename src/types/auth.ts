export interface User {
  id: string;
  username: string;
  role: 'Admin' | 'Accountant' | 'Viewer' | 'Supervisor';
  sessionToken?: string;
}

export interface Company {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  loginAttempts: number;
  sessionTimer: NodeJS.Timeout | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export interface RateLimitResult {
  allowed: boolean;
  message?: string;
}