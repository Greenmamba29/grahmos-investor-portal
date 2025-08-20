import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { stackClientApp } from "./stack";
import Index from "./pages/Index";
import InvestorPortal from "./pages/InvestorPortal";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import NotFound from "./pages/NotFound";
import AccessPortal from "./pages/AccessPortal";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import InvestorApply from "./pages/InvestorApply";
import AdminRequests from "./pages/AdminRequests";
import AuthTest from "./pages/AuthTest";

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
  <Suspense fallback={"Loading..."}>
    <BrowserRouter>
      <StackProvider app={stackClientApp}>
        <StackTheme>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/handler/*" element={<HandlerRoutes />} />
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/access" element={<AccessPortal />} />
                <Route path="/investor" element={<InvestorPortal />} />
                <Route path="/portal/:slug" element={<Portal />} />
                {/* Legacy custom auth routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/investor/apply" element={<InvestorApply />} />
                <Route path="/investor/:slug" element={<InvestorPortal />} />
                <Route path="/admin/requests" element={<AdminRequests />} />
                <Route path="/test-portal" element={<TestPortal />} />
                <Route path="/demo" element={<TestPortal />} />
                <Route path="/auth-test" element={<AuthTest />} />
                {/* Redirect old routes to new ones */}
                <Route path="/portal" element={<Navigate to="/" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </QueryClientProvider>
        </StackTheme>
      </StackProvider>
    </BrowserRouter>
  </Suspense>
);

export default App;
