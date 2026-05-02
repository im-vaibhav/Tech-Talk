import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Agenda from "./pages/Agenda.tsx";
import Distributed from "./pages/Distributed.tsx";
import ScalabilityProblem from "./pages/ScalabilityProblem.tsx";
import LoadBalancingSolution from "./pages/LoadBalancingSolution.tsx";
import ConsistentHashing from "./pages/ConsistentHashing.tsx";
import ReliabilityProblem from "./pages/ReliabilityProblem.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/distributed" element={<Distributed />} />
          <Route path="/scalability" element={<ScalabilityProblem />} />
          <Route path="/load-balancing" element={<LoadBalancingSolution />} />
          <Route path="/consistent-hashing" element={<ConsistentHashing />} />
          <Route path="/reliability" element={<ReliabilityProblem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
