import { StackClientApp } from "@stackframe/react";

// Debug environment variables
console.log('Stack Auth Environment Check:', {
  VITE_STACK_PROJECT_ID: import.meta.env.VITE_STACK_PROJECT_ID ? 'Set' : 'Missing',
  VITE_STACK_PUBLISHABLE_CLIENT_KEY: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY ? 'Set' : 'Missing',
  NEXT_PUBLIC_STACK_PROJECT_ID: (globalThis as any).NEXT_PUBLIC_STACK_PROJECT_ID || 'Not set',
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV
});

const projectId = import.meta.env.VITE_STACK_PROJECT_ID;
const publishableClientKey = import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY;

if (!projectId || !publishableClientKey) {
  console.error('Stack Auth configuration error:', {
    projectId: projectId ? 'Set' : 'Missing',
    publishableClientKey: publishableClientKey ? 'Set' : 'Missing'
  });
}

export const stackClientApp = new StackClientApp({
  projectId,
  publishableClientKey,
  tokenStore: "cookie",
  urls: {
    signIn: "/handler/signin",
    signUp: "/handler/signup",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    afterSignOut: "/",
  }
});
