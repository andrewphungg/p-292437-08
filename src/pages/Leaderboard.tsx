
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Medal, Search, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { getFriendLeaderboard } from "@/data/mockData";
import { User } from "@/types/user";
import { cn } from "@/lib/utils";

export default function Leaderboard() {
  const allFriends = getFriendLeaderboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "monthly" | "weekly">("all");
  
  // Filter friends by search query
  const filteredFriends = allFriends.filter(
    friend => friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get top 3 friends
  const topFriends = filteredFriends.slice(0, 3);
  const remainingFriends = filteredFriends.slice(3);
  
  const filterOptions = [
    { value: "all", label: "All Time" },
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" },
  ];
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Points Leaderboard</h1>
        
        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
            <div className="flex justify-between items-center">
              <TabsList className="grid grid-cols-3 w-72">
                {filterOptions.map((option) => (
                  <TabsTrigger key={option.value} value={option.value} className="text-sm">
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search friends..."
                  className="pl-8 w-48"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            {filterOptions.map((option) => (
              <TabsContent key={option.value} value={option.value} className="mt-6">
                {/* Top 3 Podium */}
                {topFriends.length > 0 && (
                  <div className="relative h-56 mb-10">
                    {/* Second Place */}
                    {topFriends.length > 1 && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="absolute left-0 bottom-0 w-1/3 flex flex-col items-center"
                      >
                        <FriendAvatar friend={topFriends[1]} position={2} />
                        <div className="bg-violet-100 dark:bg-violet-900/30 h-32 w-full rounded-t-xl flex flex-col items-center justify-end pb-4 px-2">
                          <p className="font-semibold text-sm truncate max-w-full">{topFriends[1].name}</p>
                          <p className="text-xs text-muted-foreground mb-1 truncate max-w-full">
                            {topFriends[1].university || "University not specified"}
                          </p>
                          <p className="font-bold text-violet-600 dark:text-violet-400">{topFriends[1].points} pts</p>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* First Place */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-1/3 bottom-0 w-1/3 flex flex-col items-center"
                    >
                      <FriendAvatar friend={topFriends[0]} position={1} />
                      <div className="bg-amber-100 dark:bg-amber-900/30 h-44 w-full rounded-t-xl flex flex-col items-center justify-end pb-4 px-2">
                        <p className="font-semibold text-sm truncate max-w-full">{topFriends[0].name}</p>
                        <p className="text-xs text-muted-foreground mb-1 truncate max-w-full">
                          {topFriends[0].university || "University not specified"}
                        </p>
                        <p className="font-bold text-amber-600 dark:text-amber-400">{topFriends[0].points} pts</p>
                      </div>
                    </motion.div>
                    
                    {/* Third Place */}
                    {topFriends.length > 2 && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute right-0 bottom-0 w-1/3 flex flex-col items-center"
                      >
                        <FriendAvatar friend={topFriends[2]} position={3} />
                        <div className="bg-orange-100 dark:bg-orange-900/30 h-24 w-full rounded-t-xl flex flex-col items-center justify-end pb-4 px-2">
                          <p className="font-semibold text-sm truncate max-w-full">{topFriends[2].name}</p>
                          <p className="text-xs text-muted-foreground mb-1 truncate max-w-full">
                            {topFriends[2].university || "University not specified"}
                          </p>
                          <p className="font-bold text-orange-600 dark:text-orange-400">{topFriends[2].points} pts</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                
                {/* Remaining Friends List */}
                <div className="space-y-3">
                  {remainingFriends.map((friend, index) => (
                    <FriendRankCard 
                      key={friend.id}
                      friend={friend}
                      rank={index + 4}
                      animationDelay={(index + 1) * 0.05}
                    />
                  ))}
                  
                  {filteredFriends.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No friends found matching your search</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

interface FriendAvatarProps {
  friend: User;
  position: number;
}

function FriendAvatar({ friend, position }: FriendAvatarProps) {
  const medalColors = {
    1: "from-amber-300 to-yellow-500",
    2: "from-slate-300 to-slate-400",
    3: "from-amber-700 to-amber-800"
  };
  
  return (
    <div className="mb-3 relative">
      <Avatar className="w-16 h-16 border-4 border-white dark:border-gray-900">
        <AvatarImage src={friend.avatar} />
        <AvatarFallback>{friend.name[0]}</AvatarFallback>
      </Avatar>
      
      {/* Medal icon */}
      <div className={cn(
        "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full p-1.5 bg-gradient-to-r",
        position === 1 ? "from-amber-300 to-yellow-500" : 
        position === 2 ? "from-slate-300 to-slate-400" :
        "from-amber-700 to-amber-800"
      )}>
        {position === 1 ? (
          <Trophy size={14} className="text-white" />
        ) : (
          <Medal size={14} className="text-white" />
        )}
      </div>
    </div>
  );
}

interface FriendRankCardProps {
  friend: User;
  rank: number;
  animationDelay?: number;
}

function FriendRankCard({ friend, rank, animationDelay = 0 }: FriendRankCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4 flex items-center">
          <div className="font-bold text-lg w-8">{rank}</div>
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={friend.avatar} />
            <AvatarFallback>{friend.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{friend.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {friend.university || "University not specified"}
            </p>
          </div>
          <div className="font-bold text-primary">{friend.points} pts</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
