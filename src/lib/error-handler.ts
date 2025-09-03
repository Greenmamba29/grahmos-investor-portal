/**
 * Centralized error handling utilities
 */

import type { AppError } from '@/types';

export class ErrorHandler {
  private static instance: ErrorHandler;
  
  private constructor() {}
  
  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Handle and log errors with context
   */
  handleError(error: unknown, context?: string): AppError {
    const appError: AppError = {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      context
    };

    if (error instanceof Error) {
      appError.message = error.message;
      appError.code = this.getErrorCode(error);
      appError.details = {
        stack: error.stack,
        name: error.name
      };
    } else if (typeof error === 'string') {
      appError.message = error;
      appError.code = 'STRING_ERROR';
    } else if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      appError.message = (typeof errorObj.message === 'string' ? errorObj.message : 'Unknown object error');
      appError.code = (typeof errorObj.code === 'string' ? errorObj.code : 'OBJECT_ERROR');
      appError.details = error;
    }

    // Log error with context
    console.error(`[${appError.code}] ${appError.message}`, {
      context,
      details: appError.details,
      timestamp: appError.timestamp
    });

    return appError;
  }

  /**
   * Get error code based on error type
   */
  private getErrorCode(error: Error): string {
    if (error.name === 'TypeError') return 'TYPE_ERROR';
    if (error.name === 'ReferenceError') return 'REFERENCE_ERROR';
    if (error.name === 'SyntaxError') return 'SYNTAX_ERROR';
    if (error.message.includes('fetch')) return 'NETWORK_ERROR';
    if (error.message.includes('authentication')) return 'AUTH_ERROR';
    if (error.message.includes('permission')) return 'PERMISSION_ERROR';
    if (error.message.includes('database')) return 'DATABASE_ERROR';
    if (error.message.includes('validation')) return 'VALIDATION_ERROR';
    
    return 'UNKNOWN_ERROR';
  }

  /**
   * Handle API errors specifically
   */
  handleApiError(response: Response, context?: string): AppError {
    const error: AppError = {
      code: `API_ERROR_${response.status}`,
      message: `API request failed with status ${response.status}`,
      timestamp: new Date().toISOString(),
      context
    };

    switch (response.status) {
      case 400:
        error.message = 'Bad request - please check your input';
        break;
      case 401:
        error.message = 'Authentication required';
        break;
      case 403:
        error.message = 'Access denied - insufficient permissions';
        break;
      case 404:
        error.message = 'Resource not found';
        break;
      case 429:
        error.message = 'Too many requests - please try again later';
        break;
      case 500:
        error.message = 'Server error - please try again later';
        break;
      case 502:
      case 503:
      case 504:
        error.message = 'Service temporarily unavailable';
        break;
    }

    console.error(`[${error.code}] ${error.message}`, {
      status: response.status,
      statusText: response.statusText,
      context
    });

    return error;
  }

  /**
   * Handle database errors
   */
  handleDatabaseError(error: unknown, operation?: string): AppError {
    const appError = this.handleError(error, `Database operation: ${operation}`);
    appError.code = 'DATABASE_ERROR';
    
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        appError.message = 'Database connection failed';
      } else if (error.message.includes('authentication')) {
        appError.message = 'Database authentication failed';
      } else if (error.message.includes('timeout')) {
        appError.message = 'Database operation timed out';
      } else if (error.message.includes('constraint')) {
        appError.message = 'Database constraint violation';
      }
    }

    return appError;
  }

  /**
   * Handle authentication errors
   */
  handleAuthError(error: unknown, operation?: string): AppError {
    const appError = this.handleError(error, `Auth operation: ${operation}`);
    appError.code = 'AUTH_ERROR';
    
    if (error instanceof Error) {
      if (error.message.includes('invalid credentials')) {
        appError.message = 'Invalid email or password';
      } else if (error.message.includes('user not found')) {
        appError.message = 'User account not found';
      } else if (error.message.includes('account locked')) {
        appError.message = 'Account is temporarily locked';
      } else if (error.message.includes('email not verified')) {
        appError.message = 'Please verify your email address';
      }
    }

    return appError;
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

/**
 * Utility function for handling async operations
 */
export async function handleAsync<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<{ data?: T; error?: AppError }> {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    return { error: errorHandler.handleError(error, context) };
  }
}

/**
 * Utility function for handling API calls
 */
export async function handleApiCall<T>(
  apiCall: () => Promise<Response>,
  context?: string
): Promise<{ data?: T; error?: AppError }> {
  try {
    const response = await apiCall();
    
    if (!response.ok) {
      return { error: errorHandler.handleApiError(response, context) };
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: errorHandler.handleError(error, context) };
  }
}