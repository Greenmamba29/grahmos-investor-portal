import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import InvestorPortal from "./pages/InvestorPortal";
import Portal from "./pages/Portal";
import TestPortal from "./pages/TestPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<Index />} />
          
          {/* Investor portal routes */}
          <Route path="/investor/:slug" element={<InvestorPortal />} />
          
          {/* User portal routes - fixed to match expected /user-portal */}
          <Route path="/user-portal" element={<Portal />} />
          <Route path="/portal/:slug" element={<Portal />} />
          
          {/* Test and development routes */}
          <Route path="/test-portal" element={<TestPortal />} />
          <Route path="/demo" element={<TestPortal />} />
          
          {/* Redirect old routes to new ones */}
          <Route path="/investor" element={<Navigate to="/" replace />} />
          <Route path="/portal" element={<Navigate to="/user-portal" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
