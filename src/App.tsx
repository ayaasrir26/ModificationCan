// file name: App.tsx (updated)

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { BracketPredictionProvider } from "./pages/BracketPredictionProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import { AIChatOverlay } from "./components/AIChatOverlay";
import Groups from "./pages/Groups";
import Bracket from "./pages/Bracket";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import Portfolios from "./pages/Portfolios";
import NotFound from "./pages/NotFound";
import AvenirBall from "./components/AvenirBall";
import { Footer } from "./components/Footer";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BracketPredictionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <AIChatOverlay />
            <AvenirBall />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/bracket" element={<Bracket />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/portfolios" element={<Portfolios />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer/>
          </BrowserRouter>
        </TooltipProvider>
      </BracketPredictionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
