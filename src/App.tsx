
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

// Pages
import Home from "./pages/Index";
import Upcoming from "./pages/Upcoming";
import EventDetail from "./pages/EventDetail";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

// Add custom CSS for centered toast notifications
import "./styles/custom-toasts.css";

// Add global styles for animations
const createGlobalStyle = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes heartFade {
      0% { opacity: 1; scale: 1; }
      100% { opacity: 0; scale: 0; }
    }
  `;
  document.head.appendChild(style);
};

const queryClient = new QueryClient();

const App = () => {
  // Create global styles on mount
  React.useEffect(() => {
    createGlobalStyle();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <UserProvider>
              <TooltipProvider>
                <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900/95 transition-colors duration-300">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                    <Route path="/event/:id" element={<EventDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                  <Sonner position="bottom-center" className="custom-sonner" />
                </div>
              </TooltipProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
