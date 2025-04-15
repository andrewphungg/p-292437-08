
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// A fixed, persistent bottom navigation component
export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Home,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      path: "/upcoming",
      label: "Upcoming",
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      path: "/premium",
      label: "Premium",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: User,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 inset-x-0 z-50 shadow-lg bottom-nav-fixed"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 rounded-t-3xl">
        <div className="flex items-center justify-around p-3 pt-2">
          {navItems.map(item => (
            <NavItem
              key={item.path}
              {...item}
              active={isActive(item.path)}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  active: boolean;
}

function NavItem({ path, label, icon: Icon, color, bgColor, active }: NavItemProps) {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center space-y-1 transition-all rounded-xl px-3 py-1.5",
        active ? `${color} ${bgColor}` : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      )}
    >
      <div className="relative">
        {active && (
          <motion.span
            layoutId="navIndicator"
            className={cn("absolute inset-0 rounded-full z-0", bgColor)}
            transition={{ type: "spring", duration: 0.4 }}
            style={{ opacity: 0.8 }}
          />
        )}
        <Icon size={active ? 22 : 20} className={cn("relative z-10 transition-transform", active && "scale-105")} />
      </div>
      <span className={cn("text-xs font-medium", active && "font-semibold")}>{label}</span>
    </Link>
  );
}
