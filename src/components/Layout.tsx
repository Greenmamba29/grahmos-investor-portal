import { Navigation } from './Navigation';
import { EcosystemFooter } from './EcosystemFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <EcosystemFooter />
    </div>
  );
}
