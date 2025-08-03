import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  onShowDisclaimer: () => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowDisclaimer, isLoading }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await onLogin(credentials);
    if (!result.success && result.message) {
      setError(result.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-full">
            <Calculator className="w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">FortAcc</h1>
        <p className="text-center text-gray-600 mb-8">Multi-Company Accounting System</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              onKeyDown={handleKeyDown}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              onKeyDown={handleKeyDown}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={onShowDisclaimer}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Disclaimer
          </button>
        </div>
      </div>
    </div>
  );
};