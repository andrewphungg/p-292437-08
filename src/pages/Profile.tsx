
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedEvents } from "@/components/events/SavedEvents";
import { Link } from "react-router-dom";
import { Settings, Award, Share2, Bell } from "lucide-react";

export default function Profile() {
  const { user, events } = useUser();
  
  // Mock saved events
  const savedEvents = events.slice(0, 5);
  
  // Mock badges
  const badges = [
    { id: "1", name: "Early Adopter", icon: "🌟", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" },
    { id: "2", name: "Social Butterfly", icon: "🦋", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" },
    { id: "3", name: "Event Explorer", icon: "🧭", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300" },
    { id: "4", name: "Party Animal", icon: "🎉", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300" },
    { id: "5", name: "Weekend Warrior", icon: "⚔️", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300" },
  ];
  
  const header = (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary to-primary-foreground/20"></div>
      <div className="absolute top-0 right-0 p-4">
        <Link to="/settings" className="p-2 bg-white/50 dark:bg-black/30 rounded-full shadow-sm backdrop-blur-sm">
          <Settings size={20} className="text-white" />
        </Link>
      </div>
    </div>
  );

  return (
    <AppLayout header={header}>
      <div className="relative pb-20">
        <div className="-mt-14 px-4 flex flex-col items-center">
          <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-900 shadow-md">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h1 className="mt-4 text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
          
          <div className="flex items-center mt-2 text-primary font-medium">
            <Award size={18} className="mr-1" />
            <span>{user.points} points</span>
          </div>
          
          <div className="w-full max-w-md mt-6">
            <Tabs defaultValue="saved" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6 rounded-full">
                <TabsTrigger value="saved" className="rounded-full">Saved</TabsTrigger>
                <TabsTrigger value="badges" className="rounded-full">Badges</TabsTrigger>
                <TabsTrigger value="activity" className="rounded-full">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="saved">
                <SavedEvents savedEvents={savedEvents} />
              </TabsContent>
              
              <TabsContent value="badges">
                <div className="grid grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div 
                      key={badge.id}
                      className={`${badge.color} p-4 rounded-2xl flex items-center space-x-3`}
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <p className="font-medium">{badge.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                    <p className="font-medium">You joined Joople!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                    <p className="font-medium">You earned the Early Adopter badge</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
