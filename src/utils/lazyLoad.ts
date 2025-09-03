import React, { lazy, Suspense, ComponentType } from 'react';

/**
 * Lazy load a component with a loading fallback
 */
export function lazyLoadComponent<T extends ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = React.createElement('div', null, 'Loading...')
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: unknown) => (
    React.createElement(Suspense, { fallback },
      React.createElement(LazyComponent, props as any)
    )
  );
}