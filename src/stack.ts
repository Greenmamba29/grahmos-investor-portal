// Temporarily disable Stack Auth to avoid React conflicts
// The issue is that @stackframe/stack includes Next.js which conflicts with Vite's React setup

// Stack Auth temporarily disabled - using mock client

// Mock Stack Client App for now
export const stackClientApp = {
  // Mock implementation to prevent errors
  signIn: () => Promise.resolve(null),
  signOut: () => Promise.resolve(null),
  getUser: () => null,
  // Add other methods as needed
};
