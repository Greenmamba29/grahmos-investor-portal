/**
 * Centralized type definitions for the application
 */

// User types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'investor' | 'standard';
  userType: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication types
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: AppError }>;
  logout: () => void;
  isLoading: boolean;
  error: AppError | null;
  clearError: () => void;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
  context?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Investor application types
export interface InvestorApplication {
  id: number;
  userId: number;
  pitch?: string;
  accreditation: boolean;
  status: 'pending' | 'approved' | 'rejected';
  decidedBy?: number;
  decidedAt?: string;
  createdAt: string;
}

// Admin action types
export interface AdminAction {
  id: number;
  adminId: number;
  action: string;
  targetApplicationId?: number;
  createdAt: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface InvestorApplicationFormData {
  pitch: string;
  accreditation: boolean;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

// Database types
export interface DatabaseUser {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  password_hash?: string;
  is_verified: boolean;
  role: string;
  user_type: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseInvestorApplication {
  id: number;
  user_id: number;
  pitch?: string;
  accreditation: boolean;
  status: string;
  decided_by?: number;
  decided_at?: string;
  created_at: string;
}

export interface DatabaseAdminAction {
  id: number;
  admin_id: number;
  action: string;
  target_application_id?: number;
  created_at: string;
}

// Email types
export interface EmailNotification {
  to: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  type: 'welcome' | 'approval' | 'rejection' | 'admin_alert';
}

// Environment types
export interface EnvironmentConfig {
  DATABASE_URL: string;
  VITE_DATABASE_URL: string;
  STACK_PROJECT_ID?: string;
  VITE_STACK_PROJECT_ID?: string;
  VITE_STACK_PUBLISHABLE_CLIENT_KEY?: string;
  STACK_SECRET_SERVER_KEY?: string;
  SENDGRID_API_KEY?: string;
  FROM_EMAIL?: string;
  ADMIN_EMAILS?: string;
  SESSION_SECRET?: string;
  DEBUG?: string;
  NODE_ENV?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface CustomEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: string;
}

// Performance types
export interface PerformanceMetrics {
  renderCount: number;
  renderTime: number;
  memoryUsage?: number;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}