
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useUser } from "@/context/UserContext";

export function BottomNav() {
  const location = useLocation();
  const { theme } = useTheme();
  const { user } = useUser();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 shadow-lg">
      <div className="max-w-xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 rounded-t-3xl">
        <div className="flex items-center justify-around p-4">
          <NavItem
            to="/"
            icon={<Home size={20} />}
            label="Home"
            active={isActive("/")}
            activeColor="text-primary"
          />
          
          <NavItem
            to="/explore"
            icon={<Search size={20} />}
            label="Explore"
            active={isActive("/explore")}
            activeColor="text-secondary"
          />
          
          <NavItem
            to="/upcoming"
            icon={<Calendar size={20} />}
            label="Upcoming"
            active={isActive("/upcoming")}
            activeColor="text-green-500"
          />
          
          <NavItem
            to="/premium"
            icon={<Star size={20} />}
            label="Premium"
            active={isActive("/premium")}
            activeColor="text-amber-500"
          />
          
          <NavItem
            to="/profile"
            icon={<User size={20} />}
            label="Profile"
            active={isActive("/profile")}
            activeColor="text-pink-500"
          />
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  activeColor: string;
}

function NavItem({ to, icon, label, active, activeColor }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center space-y-1 transition-colors",
        active ? activeColor : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      )}
    >
      <span className={cn(
        "p-2 rounded-full transition-all",
        active ? `${activeColor} bg-white dark:bg-gray-800` : ""
      )}>
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
