import { createContext, useContext, useState } from 'react';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'investor' | 'user';
  approval_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: any | null;
  session: any | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mock auth state - Stack Auth temporarily disabled
  const stackUser = null;
  const [profile] = useState<Profile | null>(null);
  const [loading] = useState(false);

  const signUp = async (email: string, password: string, fullName: string, role: string = 'user') => {
    try {
      // Redirect to StackFrame signup
      window.location.href = '/handler/signup';
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Redirect to StackFrame signin
      window.location.href = '/handler/signin';
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Mock sign out - Stack Auth temporarily disabled
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user: stackUser,
      session: stackUser ? { user: stackUser } : null,
      profile,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
