import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { errorHandler, AppError } from '@/lib/error-handler';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  appError?: AppError;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<object>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const appError = errorHandler.handleError(error, 'React Error Boundary');
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo, appError });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground p-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.appError && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Error Information:</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                    <div><strong>Code:</strong> {this.state.appError.code}</div>
                    <div><strong>Message:</strong> {this.state.appError.message}</div>
                    <div><strong>Context:</strong> {this.state.appError.context || 'Unknown'}</div>
                    <div><strong>Timestamp:</strong> {new Date(this.state.appError.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Details:</h3>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </div>
              {this.state.errorInfo && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Component Stack:</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2">Environment Info:</h3>
                <pre className="bg-muted p-4 rounded-lg text-sm">
                  {JSON.stringify({
                    VITE_STACK_PROJECT_ID: import.meta.env.VITE_STACK_PROJECT_ID ? 'Set' : 'Missing',
                    VITE_STACK_PUBLISHABLE_CLIENT_KEY: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY ? 'Set' : 'Missing',
                    MODE: import.meta.env.MODE,
                    DEV: import.meta.env.DEV,
                    PROD: import.meta.env.PROD
                  }, null, 2)}
                </pre>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Reload Page
              </button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
