
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, Star, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const [points, setPoints] = React.useState(125); // This would come from a context or api call in a real app
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <nav className="fixed bottom-[50px] inset-x-0 z-50 shadow-inner">
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md border-t border-x border-gray-200 rounded-t-[30px] shadow-lg">
          <div className="flex items-center justify-around p-4">
            <NavItem
              to="/"
              icon={<Home size={20} />}
              label="Home"
              active={isActive("/")}
              activeColor="text-sunset-pink"
            />
            
            <NavItem
              to="/explore"
              icon={<Search size={20} />}
              label="Explore"
              active={isActive("/explore")}
              activeColor="text-sunset-purple"
            />
            
            <NavItem
              to="/upcoming"
              icon={<Calendar size={20} />}
              label="Upcoming"
              active={isActive("/upcoming")}
              activeColor="text-sunset-orange"
            />
            
            <NavItem
              to="/premium"
              icon={<Star size={20} />}
              label="Premium"
              active={isActive("/premium")}
              activeColor="text-sunset-yellow"
            />
            
            <NavItem
              to="/profile"
              icon={<User size={20} />}
              label="Profile"
              active={isActive("/profile")}
              activeColor="text-sunset-peach"
            />
          </div>
        </div>
      </nav>
      
      <div className="fixed bottom-0 inset-x-0 z-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-sunset-pink to-sunset-orange text-white text-center py-3 text-sm font-medium shadow-lg">
            <span>You have </span>
            <span className="font-bold">{points} points</span>
          </div>
        </div>
      </div>
    </>
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
        active ? activeColor : "text-gray-500 hover:text-gray-900"
      )}
    >
      <span className={cn(
        "p-2 rounded-full transition-all",
        active ? `${activeColor} bg-[#f8f8f8]` : ""
      )}>
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
