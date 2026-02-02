import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import ExplorePage from "./pages/ExplorePage";
import CategoriesPage from "./pages/CategoriesPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ComparePage from "./pages/ComparePage";
import SkillMappingPage from "./pages/SkillMappingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<ExplorePage />} />
            <Route path="/company/:id" element={<CompanyDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/skills" element={<SkillMappingPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
