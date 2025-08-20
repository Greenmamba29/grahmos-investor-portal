import jwt from 'jsonwebtoken';

export interface UserSession {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  userType: string;
}

export interface JWTPayload extends UserSession {
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.SESSION_SECRET || 'fallback-secret-for-development';
const JWT_EXPIRES_IN = '7d';

export const authUtils = {
  generateToken(user: UserSession): string {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  },

  createSessionCookie(token: string): string {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    return `session=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
  },

  clearSessionCookie(): string {
    return 'session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/';
  },

  extractTokenFromCookie(cookieHeader?: string): string | null {
    if (!cookieHeader) return null;
    
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('session='));
    
    return sessionCookie ? sessionCookie.split('=')[1] : null;
  },

  getUserFromRequest(headers: Record<string, string | undefined>): UserSession | null {
    const token = this.extractTokenFromCookie(headers.cookie);
    if (!token) return null;
    
    const payload = this.verifyToken(token);
    if (!payload) return null;
    
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      userType: payload.userType
    };
  }
};
