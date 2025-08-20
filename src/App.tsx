import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { stackClientApp } from "./stack";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
import LegacyAccessPortal from "./pages/LegacyAccessPortal";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import InvestorApply from "./pages/InvestorApply";
import AdminRequests from "./pages/AdminRequests";
import AuthTest from "./pages/AuthTest";
import EnvTest from "./pages/EnvTest";

const queryClient = new QueryClient();

function HandlerRoutes() {
  const location = useLocation();
  
  // Debug: Log the handler path being accessed
  console.log('Stack Auth Handler accessing path:', location.pathname);
  
  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <StackProvider app={stackClientApp}>
          <StackTheme>
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
                
                {/* Auth routes (no layout) */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/access" element={<LegacyAccessPortal />} />
                
                {/* Protected routes (no layout) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/investor" element={<InvestorPortal />} />
                <Route path="/investor-portal" element={<InvestorPortal />} />
                
                {/* Legacy routes for backward compatibility */}
                <Route path="/portal/:slug" element={<Portal />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/investor/apply" element={<InvestorApply />} />
                <Route path="/investor/:slug" element={<InvestorPortal />} />
                <Route path="/admin/requests" element={<AdminRequests />} />
                <Route path="/test-portal" element={<TestPortal />} />
                <Route path="/demo" element={<TestPortal />} />
                <Route path="/auth-test" element={<AuthTest />} />
                <Route path="/env-test" element={<EnvTest />} />
                
                {/* Redirects */}
                <Route path="/portal" element={<Navigate to="/" replace />} />
                
                {/* 404 with Layout */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
              </AuthProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </StackTheme>
      </StackProvider>
    </BrowserRouter>
  </Suspense>
  </ErrorBoundary>
);

export default App;
