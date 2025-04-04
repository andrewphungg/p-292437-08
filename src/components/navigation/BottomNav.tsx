
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
                d="M11 17L13 19C13.197 19.197 13.4308 19.3532 13.6882 19.4598C13.9456 19.5665 14.2214 19.6213 14.5 19.6213C14.7786 19.6213 15.0544 19.5665 15.3118 19.4598C15.5692 19.3532 15.803 19.197 16 19C16.197 18.803 16.3532 18.5692 16.4598 18.3118C16.5665 18.0544 16.6213 17.7786 16.6213 17.5C16.6213 17.2214 16.5665 16.9456 16.4598 16.6882C16.3532 16.4308 16.197 16.197 16 16"
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
