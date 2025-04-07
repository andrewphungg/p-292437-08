
import React, { useState } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { getFriendLeaderboard } from "@/data/mockData";
import { User } from "@/types/user";

const Leaderboard = () => {
  const [leaderboard] = useState<User[]>(getFriendLeaderboard());

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] text-[55px] text-center w-full bg-[#FEFFEC] py-5">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>

        <div className="bg-gradient-to-r from-sunset-pink/20 to-sunset-purple/20 w-full py-4 text-center">
          <h1 className="text-2xl font-bold text-sunset-purple">
            Leaderboard
          </h1>
        </div>

        <div className="w-full max-w-md mx-auto mt-4 px-4">
          <div className="bg-[#FEFFEC] rounded-lg border-[3px] border-sunset-purple overflow-hidden">
            {/* Top 3 Winners */}
            <div className="flex justify-around py-8 px-4 bg-gradient-to-r from-sunset-peach to-sunset-yellow">
              {leaderboard.slice(0, 3).map((user, index) => (
                <div key={user.id} className="flex flex-col items-center">
                  <div className={`relative ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div 
                      className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                        ${index === 0 ? 'bg-[#FFD700]' : index === 1 ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'}`}
                    >
                      {index + 1}
                    </div>
                  </div>
                  <p className="mt-2 font-bold text-sm">{user.name}</p>
                  <p className="text-xs font-semibold">{user.points} pts</p>
                </div>
              ))}
            </div>

            {/* Rest of the list */}
            <div className="divide-y divide-gray-200">
              {leaderboard.slice(3).map((user, index) => (
                <div key={user.id} className="flex items-center py-3 px-4">
                  <div className="flex-shrink-0 w-10 h-10 mr-3 relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 4}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.university}</p>
                  </div>
                  <div className="flex-shrink-0 bg-sunset-orange/20 px-3 py-1 rounded-lg">
                    <p className="text-sunset-orange font-bold text-sm">{user.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg mt-4 p-5 border border-white/50 shadow-lg">
            <h2 className="text-lg font-bold mb-3 text-sunset-purple">How to Earn Points</h2>
            <ul className="space-y-3">
              <li className="flex items-center bg-sunset-pink/10 p-3 rounded-lg">
                <div className="w-8 h-8 bg-sunset-pink/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sunset-pink font-bold">1</span>
                </div>
                <span className="text-gray-800">Attend an event: 75-150 points</span>
              </li>
              <li className="flex items-center bg-sunset-orange/10 p-3 rounded-lg">
                <div className="w-8 h-8 bg-sunset-orange/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sunset-orange font-bold">2</span>
                </div>
                <span className="text-gray-800">Share an event: 30-60 points</span>
              </li>
              <li className="flex items-center bg-sunset-purple/10 p-3 rounded-lg">
                <div className="w-8 h-8 bg-sunset-purple/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sunset-purple font-bold">3</span>
                </div>
                <span className="text-gray-800">Invite friends: 100 points</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
