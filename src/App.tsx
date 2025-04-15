
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Pages
import Discover from "./pages/Discover";
import Explore from "./pages/Explore";
import Upcoming from "./pages/Upcoming";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
              <Routes>
                <Route path="/" element={<Discover />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
