
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PremiumCardProps {
  price?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ price = "$10/month" }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("You've been added to the waitlist!");
    }, 500);
  };

  return (
    <div className="bg-[#FEFFEC] rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-sunset-pink to-sunset-orange p-6 text-center">
        <h2 className="text-2xl font-bold text-white">Joople Premium</h2>
        <div className="mt-2 mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-sunset-orange/20 p-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L5.5 10.5L2 7" stroke="#FF8E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Exclusive premium events</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-sunset-orange/20 p-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L5.5 10.5L2 7" stroke="#FF8E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Discounts on selected events</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-sunset-orange/20 p-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L5.5 10.5L2 7" stroke="#FF8E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Better rewards redemption</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="rounded-full bg-sunset-orange/20 p-1">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L5.5 10.5L2 7" stroke="#FF8E50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>2x points for events</span>
          </li>
        </ul>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Join the waitlist
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sunset-pink to-sunset-orange hover:opacity-90"
            >
              Join Waitlist
            </Button>
          </form>
        ) : (
          <div className="text-center p-4 bg-sunset-yellow/20 rounded-lg">
            <h3 className="font-bold">You're on the waitlist!</h3>
            <p className="text-sm mt-2">We'll notify you when premium becomes available.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-200">
        <h3 className="font-medium mb-3">People already waiting</h3>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-sunset-orange text-white text-xs">
            +42
          </div>
        </div>
      </div>
    </div>
  );
};
