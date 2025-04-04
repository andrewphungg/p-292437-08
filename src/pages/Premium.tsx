
import React from "react";
import { BottomNav } from "@/components/navigation/BottomNav";
import { PremiumCard } from "@/components/premium/PremiumCard";

const Premium = () => {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] text-[55px] text-center w-full bg-[#FEFFEC] py-5">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>
        
        <div className="bg-gradient-to-r from-sunset-purple/20 to-sunset-pink/20 w-full py-4 text-center">
          <h1 className="text-2xl font-bold text-sunset-purple">
            Premium Benefits
          </h1>
        </div>
        
        <main className="max-w-md mx-auto px-4 py-6">
          <PremiumCard />
          
          <div className="mt-8 bg-white/80 rounded-lg p-4">
            <h2 className="font-bold text-lg mb-2">Why go Premium?</h2>
            <p className="text-sm">
              Upgrade to Premium to access exclusive events, get discounts, earn points faster, and unlock special rewards - 
              all designed to help you build meaningful connections after graduation.
            </p>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default Premium;
