
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarIcon, UserIcon } from "@/components/icons";
import { useUser } from "@/context/UserContext";

export const BottomNav = () => {
  const location = useLocation();
  const { user } = useUser();
  
  return (
    <nav className="fixed bg-[#FEFFEC] border border-[#EEE] bottom-0 inset-x-0">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center py-2 px-6">
          <Link 
            to="/leaderboard" 
            className={`flex flex-col items-center ${location.pathname === "/leaderboard" ? "text-sunset-purple" : ""}`}
            aria-label="Leaderboard"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 20V10M12 20V4M6 20V14"
                stroke={location.pathname === "/leaderboard" ? "#C997D6" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs">Leaderboard</span>
          </Link>
          
          <Link 
            to="/" 
            className={`flex flex-col items-center ${location.pathname === "/" ? "text-sunset-pink" : ""}`}
            aria-label="Discover"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 11L12 2L21 11"
                stroke={location.pathname === "/" ? "#FF8DAF" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H10V16C10 15.4696 10.2107 14.9609 10.5858 14.5858C10.9609 14.2107 11.4696 14 12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14.9609 14 15.4696 14 16V21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12"
                stroke={location.pathname === "/" ? "#FF8DAF" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs">Discover</span>
          </Link>
          
          <Link 
            to="/premium" 
            className={`flex flex-col items-center ${location.pathname === "/premium" ? "text-sunset-yellow" : ""}`}
            aria-label="Premium"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke={location.pathname === "/premium" ? "#EEC48F" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs">Premium</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center ${location.pathname === "/profile" ? "text-sunset-orange" : ""}`}
            aria-label="Profile"
          >
            <UserIcon />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-sunset-pink to-sunset-orange text-white text-center py-1 text-sm">
          <span>You have </span>
          <span className="font-bold">{user.points} points</span>
        </div>
      </div>
    </nav>
  );
};
