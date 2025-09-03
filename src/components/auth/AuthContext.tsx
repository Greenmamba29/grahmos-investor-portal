import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorHandler, AppError } from '@/lib/error-handler';
import { authApi } from '@/lib/api-client';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/.netlify/functions/auth-me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser({
            id: data.user.id.toString(),
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            role: data.user.role as 'admin' | 'investor' | 'standard',
            userType: data.user.userType
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: AppError }> => {
    setError(null);
    
    const result = await authApi.login(email, password);

    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }

    if (result.data?.success && result.data?.data) {
      setUser({
        id: result.data.data.id.toString(),
        email: result.data.data.email,
        firstName: result.data.data.firstName,
        lastName: result.data.data.lastName,
        role: result.data.data.role as 'admin' | 'investor' | 'standard',
        userType: result.data.data.userType
      });
      return { success: true };
    }

    const authError = errorHandler.handleAuthError('Login failed - invalid response', 'User login');
    setError(authError);
    return { success: false, error: authError };
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      errorHandler.handleError(error, 'User logout');
    } finally {
      setUser(null);
      setError(null);
      navigate('/auth');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
