import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, university: string, graduationYear: number) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  updateProfile: (updates: Partial<User>) => void;
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (email === "test@example.com" && password === "password") {
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
          bio: "",
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        navigate("/");
      } else {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      navigate("/onboarding");
    } catch (err) {
      setError("An error occurred during registration");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 10000),
        name: "New User",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        email: email,
        graduationYear: new Date().getFullYear() + 1,
        university: "University",
        points: 0,
        interests: [],
        friends: [],
        attendedEvents: [],
        sharedEvents: [],
        savedEvents: [],
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success("Signup successful!");
      navigate("/onboarding");
    } catch (err) {
      setError("An error occurred during signup");
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You've been logged out");
    navigate("/auth");
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
    toast.success("Profile updated successfully!");
  };

  return (
    <AuthContext.Provider value={{ 
      isLoading, 
      isAuthenticated, 
      user,
      currentUser: user,
      login, 
      register,
      signup,
      logout, 
      error,
      updateProfile
    }}>
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
