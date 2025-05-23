
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Manifesto from "./pages/Manifesto";
import Communities from "./pages/Communities";
import Learning from "./pages/Learning";
import Imagining from "./pages/Imagining";
import Organizing from "./pages/Organizing";
import Norms from "./pages/Norms";
import Settings from "./pages/Settings";
import CommunityDetail from "./pages/CommunityDetail";
import UserProfile from "./pages/UserProfile";
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
            <Route path="/" element={<Index />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/communities/:slug" element={<CommunityDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/imagining" element={<Imagining />} />
            <Route path="/organizing" element={<Organizing />} />
            <Route path="/norms" element={<Norms />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users/:username" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
