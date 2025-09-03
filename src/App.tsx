import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
// Stack Auth temporarily disabled due to package compatibility issues
// import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { stackClientApp } from "./stack";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Overview from "./pages/Overview";
import Product from "./pages/Product";
import Competitive from "./pages/Competitive";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import InvestorApply from "./pages/InvestorApply";
import AdminRequests from "./pages/AdminRequests";
import ResetPassword from "./pages/ResetPassword";

// Lazy load heavy components
import { 
  LazyMarketAnalysis, 
  LazyFinancial, 
  LazyTeam, 
  LazyInvestorPortal, 
  LazyAdminDashboard,
  LazyWrapper 
} from "./components/LazyWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Stack Auth handler temporarily disabled
function HandlerRoutes() {
  const location = useLocation();
  
  console.log('Stack Auth Handler accessing path (disabled):', location.pathname);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Handler</h1>
        <p className="text-muted-foreground">Stack Auth temporarily disabled due to package compatibility issues</p>
        <button
          onClick={() => window.location.href = '/auth'}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={"Loading..."}>
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
                <Route path="/market" element={<Layout><LazyWrapper><LazyMarketAnalysis /></LazyWrapper></Layout>} />
                <Route path="/product" element={<Layout><Product /></Layout>} />
                <Route path="/competitive" element={<Layout><Competitive /></Layout>} />
                <Route path="/financial" element={<Layout><LazyWrapper><LazyFinancial /></LazyWrapper></Layout>} />
                <Route path="/team" element={<Layout><LazyWrapper><LazyTeam /></LazyWrapper></Layout>} />
                
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
                    <LazyWrapper><LazyInvestorPortal /></LazyWrapper>
                  </ProtectedRoute>
                } />
                <Route path="/investor-portal" element={
                  <ProtectedRoute requiredRoles={['investor', 'admin']}>
                    <LazyWrapper><LazyInvestorPortal /></LazyWrapper>
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
                    <LazyWrapper><LazyInvestorPortal /></LazyWrapper>
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <LazyWrapper><LazyAdminDashboard /></LazyWrapper>
                  </ProtectedRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute requiredRole="admin">
                    <LazyWrapper><LazyAdminDashboard /></LazyWrapper>
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

export default App;
