import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorPortal from "./pages/InvestorPortal";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected routes - require authentication */}
            <Route 
              path="/investor/:slug" 
              element={
                <ProtectedRoute requiredUserType="investor">
                  <InvestorPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/portal/:slug" 
              element={
                <ProtectedRoute>
                  <Portal />
                </ProtectedRoute>
              } 
            />
            
            {/* Test and development routes */}
            <Route path="/test-portal" element={<TestPortal />} />
            <Route path="/demo" element={<TestPortal />} />
            
            {/* Redirect old routes to new ones */}
            <Route path="/investor" element={<Navigate to="/" replace />} />
            <Route path="/portal" element={<Navigate to="/" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
