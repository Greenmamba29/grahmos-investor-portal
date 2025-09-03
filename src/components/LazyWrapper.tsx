import React, { Suspense, lazy } from 'react';
import { Card, CardContent } from './ui/card';
import { Loader2 } from 'lucide-react';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

const DefaultFallback = ({ minHeight = "200px" }: { minHeight?: string }) => (
  <Card className="w-full" style={{ minHeight }}>
    <CardContent className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </CardContent>
  </Card>
);

export const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  minHeight = "200px"
}) => {
  return (
    <Suspense fallback={fallback || <DefaultFallback minHeight={minHeight} />}>
      {children}
    </Suspense>
  );
};

// Lazy load heavy components
export const LazyMarketAnalysis = lazy(() => import('../pages/MarketAnalysis'));
export const LazyFinancial = lazy(() => import('../pages/Financial'));
export const LazyTeam = lazy(() => import('../pages/Team'));
export const LazyInvestorPortal = lazy(() => import('../pages/InvestorPortal'));
export const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'));

// Higher-order component for lazy loading
export function withLazyLoading<T extends React.ComponentType<unknown>>(
  Component: T,
  fallback?: React.ComponentType
): T {
  const LazyComponent = lazy(() => 
    Promise.resolve({ default: Component })
  );

  const WrappedComponent = (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback ? <fallback /> : undefined}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );

  return WrappedComponent as T;
}