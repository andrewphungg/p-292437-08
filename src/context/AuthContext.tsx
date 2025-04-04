
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const signup = (email: string, password: string) => {
    // In a real app, this would make an API call to create a user
    // For now, we'll just simulate a successful signup
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: "",
      avatar: "",
      email,
      graduationYear: new Date().getFullYear(),
      university: "",
      points: 0,
      interests: [],
      friends: [],
      attendedEvents: [],
      sharedEvents: []
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    navigate("/onboarding");
  };

  const login = (email: string, password: string) => {
    // In a real app, this would validate credentials against an API
    // For demo purposes, we'll just simulate a login
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/auth");
    toast.success("Logged out successfully!");
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUser: user,
      signup,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
