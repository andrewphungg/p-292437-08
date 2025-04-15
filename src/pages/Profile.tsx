
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedEvents } from "@/components/events/SavedEvents";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useUser } from "@/context/UserContext";
import { PencilLine, X, Plus, CheckCircle2 } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { user } = useUser();
  const { data: allEvents = [] } = useEvents();
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests || []);
  
  // Filter to find events the user has attended
  const attendedEvents = allEvents.filter(event => user.attendedEvents.includes(event.id));
  
  // Filter to find events the user has shared
  const savedEvents = allEvents.filter(event => user.sharedEvents.includes(event.id));
  
  // Get popular interest categories for suggestions
  const allInterestCategories = [
    "Music", "Art", "Tech", "Sports", "Food", "Travel", "Books", "Movies", 
    "Fashion", "Gaming", "Fitness", "Photography", "Dance", "Cooking", 
    "Nature", "Science", "History", "Politics", "Design", "Business"
  ];
  
  // Group related interests
  const interestGroups: Record<string, string[]> = {
    "Music": ["Rock", "Jazz", "Hip Hop", "Classical", "EDM", "Pop", "Indie", "Country"],
    "Art": ["Painting", "Sculpture", "Photography", "Digital Art", "Street Art", "Galleries"],
    "Tech": ["AI", "Coding", "Startups", "Web3", "Data Science", "UX Design", "Cybersecurity"],
    "Sports": ["Basketball", "Soccer", "Tennis", "Hiking", "Yoga", "Running", "Swimming", "Cycling"],
    "Food": ["Cuisine", "Wine", "Coffee", "Baking", "BBQ", "Vegetarian", "Fine Dining", "Food Trucks"],
    "Gaming": ["Video Games", "Board Games", "RPGs", "Strategy Games", "Puzzles", "Esports"],
    "Fitness": ["Crossfit", "Weightlifting", "HIIT", "Pilates", "Meditation", "Wellness"],
    "Movies": ["Action", "Comedy", "Horror", "Documentary", "Sci-Fi", "Drama", "International Film"]
  };

  // Get suggested interests based on current selections
  const suggestedInterests = React.useMemo(() => {
    // Find matching categories for current interests
    const relatedCategories = new Set<string>();
    
    selectedInterests.forEach(interest => {
      for (const [category, interests] of Object.entries(interestGroups)) {
        if (interests.includes(interest) || category === interest) {
          relatedCategories.add(category);
        }
      }
    });
    
    // Get related interests from those categories
    const related = new Set<string>();
    relatedCategories.forEach(category => {
      if (interestGroups[category]) {
        interestGroups[category].forEach(interest => {
          if (!selectedInterests.includes(interest)) {
            related.add(interest);
          }
        });
      }
    });
    
    // Add some from general categories if we don't have enough
    if (related.size < 8) {
      allInterestCategories.forEach(category => {
        if (!selectedInterests.includes(category) && related.size < 12) {
          related.add(category);
        }
      });
    }
    
    return Array.from(related).slice(0, 12);
  }, [selectedInterests]);
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  const saveInterests = () => {
    // In a real app, this would save to the backend
    setIsEditingInterests(false);
    // For now we just pretend it saved
  };
  
  // Profile header component
  const header = (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl pt-6 pb-4 shadow-sm border-b dark:border-gray-800">
      <div className="flex justify-end px-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center mt-2">
        <Avatar className="h-24 w-24 ring-4 ring-primary/20 ring-offset-2">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mt-3 dark:text-white">{user.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {user.university}, Class of {user.graduationYear}
        </p>
        <div className="flex items-center gap-1 mt-1 text-sm">
          <span className="font-medium text-primary">{user.points} points</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 dark:text-gray-400">Joined April 2024</span>
        </div>
      </div>
    </div>
  );
  
  return (
    <AppLayout header={header}>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Interests Section */}
        <motion.section layout className="animate-fade-in">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold dark:text-white">Interests</h2>
            {!isEditingInterests ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full"
                onClick={() => setIsEditingInterests(true)}
              >
                <PencilLine size={16} className="mr-1" /> Edit
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="rounded-full"
                onClick={saveInterests}
              >
                <CheckCircle2 size={16} className="mr-1" /> Save
              </Button>
            )}
          </div>
          
          <AnimatePresence mode="wait">
            {!isEditingInterests ? (
              <motion.div 
                className="flex flex-wrap gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                key="interests"
              >
                {selectedInterests.map((interest) => (
                  <Badge key={interest} className="rounded-full py-1.5 px-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    {interest}
                  </Badge>
                ))}
                {selectedInterests.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No interests added yet. Click edit to add some!
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                key="edit-interests"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterests.map((interest) => (
                      <motion.div
                        key={interest}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          className="rounded-full py-1.5 px-1.5 pl-3 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 cursor-pointer flex items-center gap-1"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                          <button className="ml-1 rounded-full bg-primary/20 hover:bg-primary/30 p-1">
                            <X size={12} />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Suggested Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {suggestedInterests.map((interest) => (
                      <motion.div
                        key={interest}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          className="rounded-full py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-700 cursor-pointer flex items-center gap-1"
                          onClick={() => toggleInterest(interest)}
                        >
                          <Plus size={14} className="mr-1" /> {interest}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
        
        {/* Stats Cards */}
        <motion.section 
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{user.points}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Points</span>
            </CardContent>
          </Card>
          <Card className="rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-pink-500">{user.friends.length}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Friends</span>
            </CardContent>
          </Card>
          <Card className="rounded-3xl overflow-hidden bg-white dark:bg-gray-800">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-amber-500">{user.attendedEvents.length}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Events</span>
            </CardContent>
          </Card>
        </motion.section>
        
        {/* Tabs for events */}
        <motion.div 
          layout 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs defaultValue="saved">
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl">
              <TabsTrigger value="saved" className="rounded-xl">Saved</TabsTrigger>
              <TabsTrigger value="attended" className="rounded-xl">Attended</TabsTrigger>
            </TabsList>
            <TabsContent value="saved">
              <SavedEvents savedEvents={savedEvents} />
            </TabsContent>
            <TabsContent value="attended">
              <SavedEvents savedEvents={attendedEvents} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppLayout>
  );
}
