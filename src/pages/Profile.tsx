
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useUser } from "@/context/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedEvents } from "@/components/events/SavedEvents";
import { Link } from "react-router-dom";
import { Settings, Award, Share2, Bell, Plus, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, events } = useUser();
  const { toast } = useToast();
  
  // Mock saved events
  const savedEvents = events.slice(0, 5);
  
  // Mock badges with improved design
  const [badges, setBadges] = useState([
    { id: "1", name: "Early Adopter", icon: "🌟", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300" },
    { id: "2", name: "Social Butterfly", icon: "🦋", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" },
    { id: "3", name: "Event Explorer", icon: "🧭", color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300" },
  ]);

  // Available interests for the user to select
  const [availableInterests, setAvailableInterests] = useState([
    { id: "4", name: "Party Animal", icon: "🎉", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300", category: "social" },
    { id: "5", name: "Weekend Warrior", icon: "⚔️", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300", category: "outdoors" },
    { id: "6", name: "Music Lover", icon: "🎵", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300", category: "music" },
    { id: "7", name: "Foodie", icon: "🍽️", color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300", category: "food" },
    { id: "8", name: "Bookworm", icon: "📚", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300", category: "education" },
    { id: "9", name: "Fitness Enthusiast", icon: "💪", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300", category: "fitness" },
    { id: "10", name: "Art Aficionado", icon: "🎨", color: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-300", category: "arts" },
    { id: "11", name: "Nature Explorer", icon: "🏞️", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300", category: "outdoors" },
    { id: "12", name: "Tech Geek", icon: "💻", color: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-300", category: "tech" },
  ]);

  // Music-related interests that appear when user selects Music Lover
  const musicRelatedInterests = [
    { id: "13", name: "Concert Goer", icon: "🎤", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300", category: "music" },
    { id: "14", name: "Festival Fan", icon: "🎪", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300", category: "music" },
    { id: "15", name: "Record Collector", icon: "💿", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300", category: "music" },
  ];

  // Food-related interests that appear when user selects Foodie
  const foodRelatedInterests = [
    { id: "16", name: "Culinary Explorer", icon: "🍳", color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300", category: "food" },
    { id: "17", name: "Wine Enthusiast", icon: "🍷", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300", category: "food" },
    { id: "18", name: "Coffee Connoisseur", icon: "☕", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300", category: "food" },
  ];

  // Function to add a badge
  const addBadge = (badge: any) => {
    // Check if badge already exists
    if (!badges.find(b => b.id === badge.id)) {
      setBadges([...badges, badge]);
      
      // Add related interests based on category
      if (badge.category === "music") {
        setAvailableInterests([...availableInterests, ...musicRelatedInterests.filter(i => !availableInterests.find(ai => ai.id === i.id))]);
      } else if (badge.category === "food") {
        setAvailableInterests([...availableInterests, ...foodRelatedInterests.filter(i => !availableInterests.find(ai => ai.id === i.id))]);
      }

      toast({
        title: "Badge Added",
        description: `You've added the "${badge.name}" badge to your profile!`,
        className: "top-center-toast",
      });
    }
  };

  // Function to remove a badge
  const removeBadge = (badgeId: string) => {
    setBadges(badges.filter(badge => badge.id !== badgeId));
    toast({
      title: "Badge Removed",
      description: "Badge has been removed from your profile.",
      variant: "destructive",
      className: "top-center-toast",
    });
  };
  
  const header = (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-primary to-primary-foreground/20"></div>
      <div className="absolute top-0 right-0 p-4">
        <Link to="/settings">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/50 dark:bg-black/30 rounded-full shadow-sm backdrop-blur-sm"
          >
            <Settings size={20} className="text-white" />
          </motion.div>
        </Link>
      </div>
    </div>
  );

  return (
    <AppLayout header={header}>
      <div className="relative pb-20">
        <div className="-mt-14 px-4 flex flex-col items-center">
          <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-900 shadow-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-purple-500 text-white">{user.name.charAt(0)}</AvatarFallback>
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Your Badges</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full flex gap-1 items-center">
                        <Edit2 size={14} />
                        Edit Badges
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Manage Your Badges</DialogTitle>
                      </DialogHeader>
                      
                      <div className="py-4">
                        <h4 className="text-sm font-medium mb-2">Your Badges</h4>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {badges.map((badge) => (
                            <motion.div 
                              key={badge.id}
                              whileHover={{ scale: 1.02 }}
                              className={`${badge.color} p-4 rounded-2xl flex items-center justify-between`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className="text-2xl">{badge.icon}</div>
                                <div className="font-medium text-sm">{badge.name}</div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 rounded-full hover:bg-white/20 text-gray-700"
                                onClick={() => removeBadge(badge.id)}
                              >
                                <X size={14} />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                        
                        <h4 className="text-sm font-medium mb-2">Available Interests</h4>
                        <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                          {availableInterests
                            .filter(interest => !badges.find(b => b.id === interest.id))
                            .map((interest) => (
                              <motion.div 
                                key={interest.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`${interest.color} p-4 rounded-2xl flex items-center justify-between cursor-pointer`}
                                onClick={() => addBadge(interest)}
                              >
                                <div className="flex items-center space-x-2">
                                  <div className="text-2xl">{interest.icon}</div>
                                  <div className="font-medium text-sm">{interest.name}</div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 rounded-full hover:bg-white/20 text-gray-700"
                                >
                                  <Plus size={14} />
                                </Button>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                      
                      <DialogClose asChild>
                        <Button className="rounded-full w-full">Done</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <AnimatePresence initial={false}>
                    {badges.map((badge, index) => (
                      <motion.div 
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`${badge.color} p-4 rounded-2xl flex items-center shadow-sm space-x-3`}
                      >
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <p className="font-medium">{badge.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>
              
              <TabsContent value="activity">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm"
                  >
                    <p className="font-medium">You joined Joople!</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm"
                  >
                    <p className="font-medium">You earned the Early Adopter badge</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
