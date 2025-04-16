
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, university: string, graduationYear: number) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple mock auth - in a real app, you'd validate with a backend
      if (email === "test@example.com" && password === "password") {
        // Mock successful login
        const mockUser: User = {
          id: "user-1",
          name: "Alex Johnson",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
          email: email,
          graduationYear: 2025,
          university: "Stanford University",
          points: 2750,
          interests: [],
          friends: [],
          attendedEvents: [],
          sharedEvents: [],
          savedEvents: [],
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate("/"); // Redirect to home page
      } else {
        // Mock login failure
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, university: string, graduationYear: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 10000),
        name: name,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        email: email,
        graduationYear: graduationYear,
        university: university,
        points: 0,
        interests: [],
        friends: [],
        attendedEvents: [],
        sharedEvents: [],
        savedEvents: [],
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
      navigate("/onboarding"); // Redirect to onboarding page
    } catch (err) {
      setError("An error occurred during registration");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You've been logged out");
    navigate("/auth"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
