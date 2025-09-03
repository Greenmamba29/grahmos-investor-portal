/**
 * Environment Variable Validator
 * Ensures all required environment variables are properly configured
 */

interface EnvConfig {
  DATABASE_URL?: string;
  VITE_DATABASE_URL?: string;
  VITE_STACK_PROJECT_ID?: string;
  VITE_STACK_PUBLISHABLE_CLIENT_KEY?: string;
  SESSION_SECRET?: string;
}

class EnvironmentValidator {
  private config: EnvConfig = {};
  private errors: string[] = [];
  private warnings: string[] = [];

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    // Load from import.meta.env for Vite
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      this.config = {
        VITE_DATABASE_URL: import.meta.env.VITE_DATABASE_URL,
        VITE_STACK_PROJECT_ID: import.meta.env.VITE_STACK_PROJECT_ID,
        VITE_STACK_PUBLISHABLE_CLIENT_KEY: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY,
      };
    }

    // Load from process.env for Node.js environments
    if (typeof process !== 'undefined' && process.env) {
      this.config = {
        ...this.config,
        DATABASE_URL: process.env.DATABASE_URL,
        SESSION_SECRET: process.env.SESSION_SECRET,
      };
    }
  }

  validate(): { isValid: boolean; errors: string[]; warnings: string[] } {
    this.errors = [];
    this.warnings = [];

    // Check for database configuration
    if (!this.config.DATABASE_URL && !this.config.VITE_DATABASE_URL) {
      this.errors.push('Database URL is not configured. Set either DATABASE_URL or VITE_DATABASE_URL in your .env file.');
    }

    // Check for hardcoded credentials (security check)
    const dbUrl = this.config.DATABASE_URL || this.config.VITE_DATABASE_URL || '';
    if (dbUrl && this.containsHardcodedCredentials(dbUrl)) {
      this.warnings.push('Database URL may contain hardcoded credentials. Consider using environment variables.');
    }

    // Check for Stack Auth configuration (optional for now since it's disabled)
    if (!this.config.VITE_STACK_PROJECT_ID || !this.config.VITE_STACK_PUBLISHABLE_CLIENT_KEY) {
      this.warnings.push('Stack Auth is not fully configured. This is optional while Stack Auth is disabled.');
    }

    // Check for session secret in production
    if (import.meta.env.PROD && !this.config.SESSION_SECRET) {
      this.errors.push('SESSION_SECRET is required in production for secure session management.');
    }

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
    };
  }

  private containsHardcodedCredentials(url: string): boolean {
    // Check for common patterns that indicate hardcoded credentials
    const patterns = [
      /grahmos_user/i,
      /9sLk7!pQx/,
      /db\.grahmos\.info/i,
    ];

    return patterns.some(pattern => pattern.test(url));
  }

  getDatabaseUrl(): string | undefined {
    return this.config.VITE_DATABASE_URL || this.config.DATABASE_URL;
  }

  getSessionSecret(): string {
    return this.config.SESSION_SECRET || 'development-secret-' + Math.random().toString(36);
  }

  printValidationReport() {
    const { isValid, errors, warnings } = this.validate();

    if (!isValid) {
      console.error('❌ Environment validation failed:');
      errors.forEach(error => console.error(`   - ${error}`));
    }

    if (warnings.length > 0) {
      console.warn('⚠️ Environment warnings:');
      warnings.forEach(warning => console.warn(`   - ${warning}`));
    }

    if (isValid && warnings.length === 0) {
      console.log('✅ Environment configuration is valid');
    }

    return isValid;
  }
}

export const envValidator = new EnvironmentValidator();

// Export convenience functions
export const validateEnvironment = () => envValidator.validate();
export const getDatabaseUrl = () => envValidator.getDatabaseUrl();
export const getSessionSecret = () => envValidator.getSessionSecret();