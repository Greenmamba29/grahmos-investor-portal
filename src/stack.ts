// Stack Auth temporarily disabled due to package compatibility issues
// TODO: Re-enable when @stackframe/stack package issues are resolved

console.log('Stack Auth temporarily disabled - using mock client');

// Mock Stack Client App for now
export const stackClientApp = {
  // Mock implementation to prevent errors
  signIn: () => Promise.resolve(null),
  signOut: () => Promise.resolve(null),
  getUser: () => null,
  signUp: () => Promise.resolve(null),
  // Add other methods as needed
};
