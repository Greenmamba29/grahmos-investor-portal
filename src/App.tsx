import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Overview from "./pages/Overview";
import MarketAnalysis from "./pages/MarketAnalysis";
import Product from "./pages/Product";
import Competitive from "./pages/Competitive";
import Financial from "./pages/Financial";
import Team from "./pages/Team";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import InvestorPortal from "./pages/InvestorPortal";
import NotFound from "./pages/NotFound";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import InvestorApply from "./pages/InvestorApply";
import AdminRequests from "./pages/AdminRequests";
import AdminDashboard from "./pages/AdminDashboard";
import ResetPassword from "./pages/ResetPassword";
import InvestorRelations from "./pages/InvestorRelations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Temporarily disabled Stack Auth handler
function HandlerRoutes() {
  const location = useLocation();
  
  // Debug: Log the handler path being accessed
  console.log('Stack Auth Handler accessing path (disabled):', location.pathname);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Handler</h1>
        <p className="text-muted-foreground">Stack Auth temporarily disabled</p>
      </div>
    </div>
  );
}

// Enhanced Loading Component
const LoadingScreen = () => {
  const [loadingMessage, setLoadingMessage] = useState('Initializing GrahmOS Portal...');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  useEffect(() => {
    const messages = [
      'Loading components...',
      'Establishing secure connection...',
      'Preparing investor dashboard...',
      'Almost ready...'
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 1500);
    
    // Show debug info after 10 seconds
    const debugTimer = setTimeout(() => {
      setShowDebugInfo(true);
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(debugTimer);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-8" />
        
        <div className="mb-6">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-xl text-primary-foreground glow mx-auto mb-4">
            G
          </div>
          <h1 className="text-2xl font-bold text-gradient mb-2">GrahmOS Connect</h1>
          <p className="text-muted-foreground">{loadingMessage}</p>
        </div>
        
        <div className="w-full bg-border rounded-full h-2 mb-4">
          <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
        </div>
        
        {showDebugInfo && (
          <div className="mt-6 p-4 bg-card/50 rounded-lg border text-sm text-left">
            <h3 className="font-semibold mb-2">Debug Information:</h3>
            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <div>Mode: {import.meta.env.MODE}</div>
              <div>Dev: {import.meta.env.DEV ? 'Yes' : 'No'}</div>
              <div>URL: {window.location.href}</div>
              <div>Time: {new Date().toISOString()}</div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90"
            >
              Force Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [appError, setAppError] = useState<string | null>(null);
  
  useEffect(() => {
    // Global error handler
    const handleUnhandledError = (event: ErrorEvent) => {
      console.error('🚨 Unhandled Error:', event.error);
      setAppError(`Unhandled error: ${event.error?.message || 'Unknown error'}`);
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason);
      setAppError(`Promise rejection: ${event.reason?.message || 'Unknown rejection'}`);
    };
    
    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  if (appError) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <h1 className="text-2xl font-bold text-destructive mb-4">Application Error</h1>
          <p className="text-muted-foreground mb-6">{appError}</p>
          <button 
            onClick={() => {
              setAppError(null);
              window.location.reload();
            }}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
                <Routes>
                {/* Stack Auth Handler */}
                <Route path="/handler/*" element={<HandlerRoutes />} />
                
                {/* Main Public Routes with Layout - New GrahmOS Connect Hub */}
                <Route path="/" element={<Layout><Overview /></Layout>} />
                <Route path="/overview" element={<Layout><Overview /></Layout>} />
                <Route path="/market" element={<Layout><MarketAnalysis /></Layout>} />
                <Route path="/product" element={<Layout><Product /></Layout>} />
                <Route path="/competitive" element={<Layout><Competitive /></Layout>} />
                <Route path="/financial" element={<Layout><Financial /></Layout>} />
                <Route path="/team" element={<Layout><Team /></Layout>} />
                <Route path="/investor-relations" element={<Layout><InvestorRelations /></Layout>} />
                <Route path="/partners" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Partners</h1><p className="text-xl text-muted-foreground">Partnership page coming soon. Contact partners@grahmos.info</p></div></div></Layout>} />
                <Route path="/manifesto" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Manifesto</h1><p className="text-xl text-muted-foreground">Coming soon</p></div></div></Layout>} />
                <Route path="/press" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Press Kit</h1><p className="text-xl text-muted-foreground">Coming soon</p></div></div></Layout>} />
                <Route path="/privacy" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Privacy Policy</h1><p className="text-xl text-muted-foreground">Coming soon</p></div></div></Layout>} />
                <Route path="/terms" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Terms of Service</h1><p className="text-xl text-muted-foreground">Coming soon</p></div></div></Layout>} />
                <Route path="/security" element={<Layout><div className="min-h-screen py-16 px-4"><div className="max-w-4xl mx-auto text-center"><h1 className="text-4xl font-bold mb-4">Security</h1><p className="text-xl text-muted-foreground">Coming soon</p></div></div></Layout>} />
                
                {/* Auth routes (no layout) */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />
                
                {/* Protected routes with role-based access control */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/investor" element={
                  <ProtectedRoute requiredRoles={['investor', 'admin']}>
                    <InvestorPortal />
                  </ProtectedRoute>
                } />
                <Route path="/investor-portal" element={
                  <ProtectedRoute requiredRoles={['investor', 'admin']}>
                    <InvestorPortal />
                  </ProtectedRoute>
                } />
                
                {/* Legacy routes for backward compatibility */}
                <Route path="/portal/:slug" element={<Portal />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/investor/apply" element={
                  <ProtectedRoute>
                    <InvestorApply />
                  </ProtectedRoute>
                } />
                <Route path="/investor/:slug" element={
                  <ProtectedRoute requiredRoles={['investor', 'admin']}>
                    <InvestorPortal />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/requests" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminRequests />
                  </ProtectedRoute>
                } />
                <Route path="/test-portal" element={<TestPortal />} />
                <Route path="/demo" element={<TestPortal />} />
                
                {/* Redirects */}
                <Route path="/portal" element={<Navigate to="/" replace />} />
                
                {/* 404 with Layout */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
