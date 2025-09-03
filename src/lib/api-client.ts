/**
 * Type-safe API client
 */

import type { ApiResponse, AppError } from '@/types';
import { errorHandler } from './error-handler';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: AppError }> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include',
        ...options,
      });

      if (!response.ok) {
        return { error: errorHandler.handleApiError(response, `API call to ${endpoint}`) };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: errorHandler.handleError(error, `API call to ${endpoint}`) };
    }
  }

  async get<T>(endpoint: string): Promise<{ data?: T; error?: AppError }> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    body?: unknown
  ): Promise<{ data?: T; error?: AppError }> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    body?: unknown
  ): Promise<{ data?: T; error?: AppError }> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<{ data?: T; error?: AppError }> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create a default API client instance
export const apiClient = new ApiClient();

// Type-safe API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH_LOGIN: '/.netlify/functions/auth-login',
  AUTH_LOGOUT: '/.netlify/functions/auth-logout',
  AUTH_ME: '/.netlify/functions/auth-me',
  AUTH_SIGNUP: '/.netlify/functions/auth-signup',
  AUTH_FORGOT_PASSWORD: '/.netlify/functions/auth-forgot-password',
  AUTH_RESET_PASSWORD: '/.netlify/functions/auth-reset-password',

  // Investor applications
  INVESTOR_APPLY: '/.netlify/functions/investor-apply',
  ADMIN_REQUESTS: '/.netlify/functions/admin-requests',

  // Notifications
  SEND_NOTIFICATION: '/.netlify/functions/send-notification',

  // Database
  DB_MIGRATE: '/.netlify/functions/db-migrate',
} as const;

// Type-safe API methods
export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<{ id: number; email: string; firstName?: string; lastName?: string; role: string; userType: string }>>(
      API_ENDPOINTS.AUTH_LOGIN,
      { email, password }
    ),

  logout: () =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH_LOGOUT),

  me: () =>
    apiClient.get<ApiResponse<{ id: number; email: string; firstName?: string; lastName?: string; role: string; userType: string }>>(
      API_ENDPOINTS.AUTH_ME
    ),

  signup: (data: { email: string; password: string; firstName?: string; lastName?: string }) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH_SIGNUP, data),

  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH_RESET_PASSWORD, { token, password }),
};

export const investorApi = {
  apply: (data: { pitch: string; accreditation: boolean }) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.INVESTOR_APPLY, data),

  getRequests: () =>
    apiClient.get<ApiResponse<Array<{ id: number; userId: number; pitch?: string; accreditation: boolean; status: string; createdAt: string }>>>(
      API_ENDPOINTS.ADMIN_REQUESTS
    ),

  approveRequest: (id: number) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.ADMIN_REQUESTS, { action: 'approve', id }),

  rejectRequest: (id: number) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.ADMIN_REQUESTS, { action: 'reject', id }),
};

export const notificationApi = {
  send: (data: { to: string; type: string; subject: string; htmlContent: string; textContent: string }) =>
    apiClient.post<ApiResponse>(API_ENDPOINTS.SEND_NOTIFICATION, data),
};