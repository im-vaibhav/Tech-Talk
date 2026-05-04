import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Agenda from "./pages/Agenda.tsx";
import CAPTheorem from "./pages/CAPTheorem.tsx";
import Distributed from "./pages/Distributed.tsx";
import ScalabilityProblem from "./pages/ScalabilityProblem.tsx";
import LoadBalancingSolution from "./pages/LoadBalancingSolution.tsx";
import ConsistentHashing from "./pages/ConsistentHashing.tsx";
import ReliabilityProblem from "./pages/ReliabilityProblem.tsx";
import ReplicationSolution from "./pages/ReplicationSolution.tsx";
import WALSolution from "./pages/WALSolution.tsx";
import AvailabilityProblem from "./pages/AvailabilityProblem.tsx";
import SWIMProtocol from "./pages/SWIMProtocol.tsx";
import QuorumRerouting from "./pages/QuorumRerouting.tsx";
import EdgeFabricBridge from "./pages/EdgeFabricBridge.tsx";
import ObservabilityFoundation from "./pages/ObservabilityFoundation.tsx";
import AgenticOps from "./pages/AgenticOps.tsx";
import AgentTriggerModes from "./pages/AgentTriggerModes.tsx";
import HumanApproval from "./pages/HumanApproval.tsx";
import ClosingRecap from "./pages/ClosingRecap.tsx";
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
          <Route path="/cap" element={<CAPTheorem />} />
          <Route path="/distributed" element={<Distributed />} />
          <Route path="/scalability" element={<ScalabilityProblem />} />
          <Route path="/load-balancing" element={<LoadBalancingSolution />} />
          <Route path="/consistent-hashing" element={<ConsistentHashing />} />
          <Route path="/reliability" element={<ReliabilityProblem />} />
          <Route path="/replication" element={<ReplicationSolution />} />
          <Route path="/wal" element={<WALSolution />} />
          <Route path="/availability" element={<AvailabilityProblem />} />
          <Route path="/swim" element={<SWIMProtocol />} />
          <Route path="/quorum" element={<QuorumRerouting />} />
          <Route path="/bridge" element={<EdgeFabricBridge />} />
          <Route path="/observability" element={<ObservabilityFoundation />} />
          <Route path="/agentic-ops" element={<AgenticOps />} />
          <Route path="/trigger-modes" element={<AgentTriggerModes />} />
          <Route path="/human-approval" element={<HumanApproval />} />
          <Route path="/closing" element={<ClosingRecap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
