
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Manifesto from "./pages/Manifesto";
import Communities from "./pages/Communities";
import Projects from "./pages/Projects";
import Learning from "./pages/Learning";
import Imagining from "./pages/Imagining";
import Organizing from "./pages/Organizing";
import Plugs from "./pages/Plugs";
import Norms from "./pages/Norms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/imagining" element={<Imagining />} />
          <Route path="/organizing" element={<Organizing />} />
          <Route path="/plugs" element={<Plugs />} />
          <Route path="/norms" element={<Norms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
