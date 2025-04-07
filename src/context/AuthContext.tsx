
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentUser: User | null;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  adminLogin: (email: string, password: string) => void;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = "admin@joople.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated from localStorage
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedUser = localStorage.getItem("user");
    
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      if (storedAdmin === "true") {
        setIsAdmin(true);
      }
    }
  }, []);

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
    setIsAdmin(false);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("user", JSON.stringify(newUser));
    
    toast.success("Account created successfully!");
    navigate("/onboarding");
  };

  const login = (email: string, password: string) => {
    // Check if these are admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return adminLogin(email, password);
    }

    // For demo purposes, we'll just simulate a login
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "false");
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const adminLogin = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin",
        avatar: "",
        email: ADMIN_EMAIL,
        graduationYear: new Date().getFullYear(),
        university: "Admin Panel",
        points: 9999,
        interests: ["Admin"],
        friends: [],
        attendedEvents: [],
        sharedEvents: []
      };

      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("user", JSON.stringify(adminUser));
      
      toast.success("Admin logged in successfully!");
      navigate("/");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
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
      isAdmin,
      currentUser: user,
      signup,
      login,
      adminLogin,
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
