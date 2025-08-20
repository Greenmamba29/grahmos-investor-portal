import React from 'react';

export default function EnvTest() {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8">Environment Variables Test</h1>
      <div className="space-y-4">
        <div className="p-4 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Stack Auth Configuration:</h2>
          <div className="space-y-2">
            <p><strong>Project ID:</strong> {import.meta.env.VITE_STACK_PROJECT_ID ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>Publishable Key:</strong> {import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY ? '✅ Set' : '❌ Missing'}</p>
            <p><strong>App URL:</strong> {import.meta.env.VITE_APP_URL || 'Not set'}</p>
          </div>
        </div>
        <div className="p-4 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Database Configuration:</h2>
          <div className="space-y-2">
            <p><strong>Database URL:</strong> {import.meta.env.VITE_DATABASE_URL ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>
        <div className="p-4 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Environment Mode:</h2>
          <div className="space-y-2">
            <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
            <p><strong>Dev:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</p>
            <p><strong>Prod:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
