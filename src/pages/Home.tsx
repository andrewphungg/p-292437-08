
import React, { useState } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedFriends } from "@/components/friends/RecommendedFriends";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FilterOptions } from "@/components/events/FilterMenu";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

const Home = () => {
  const { events, suggestedEvents, user } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setSelectedCategories(filters.categories);
  };

  // Filter events based on search query and selected categories
  const filteredEvents = (suggestedEvents.length > 0 ? suggestedEvents : events).filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof event.location === 'object' && event.location.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => event.tags.includes(category));
      
    return matchesSearch && matchesCategories;
  });

  // Get trending events
  const trendingEvents = events.filter(event => event.isTrending).slice(0, 6);
  
  // Get weekend events (mock implementation)
  const weekendEvents = events.filter((_, index) => index % 3 === 0).slice(0, 4);
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-slate-100 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 pb-24">
      <motion.div 
        className="flex flex-col items-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <header className="text-gray-900 dark:text-white text-[40px] sm:text-[55px] font-semibold text-center w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl py-5 shadow-md relative">
          <span className="bg-gradient-to-r from-primary via-secondary to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
          <div className="absolute top-4 right-4">
            <ThemeToggle variant="modern" />
          </div>
        </header>

        <div className="bg-primary/20 dark:bg-primary/10 w-full py-2 text-center backdrop-blur-sm shadow-sm">
          <h1 className="text-xl font-bold text-primary dark:text-primary-foreground">
            Connect With Fellow Graduates
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-center mt-[15px] mb-2 text-gray-900 dark:text-white">
          Welcome, {user.name || "Graduate"}!
        </h2>
        <p className="text-sm text-center mb-3 text-gray-700 dark:text-gray-300 max-w-xs">
          Find Events To Meet Other Graduates!
        </p>

        <div className="w-full px-5 mb-2">
          <SearchBar 
            onSearch={handleSearch} 
          />
        </div>

        <div className="w-full max-w-[720px] mt-4 px-5">
          <Tabs 
            defaultValue="events" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-md rounded-2xl">
              <TabsTrigger value="events" className="rounded-xl">Events</TabsTrigger>
              <TabsTrigger value="friends" className="rounded-xl">Find Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-0 space-y-8">
              {/* For You Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="animate-fade-in"
              >
                <h2 className="section-title text-xl font-bold">For You</h2>
                <div className="flex flex-col gap-6">
                  {filteredEvents.slice(0, 5).map(event => (
                    <motion.div 
                      key={event.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                  {filteredEvents.length === 0 && (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No events match your search criteria
                    </p>
                  )}
                </div>
              </motion.section>
              
              {/* Trending Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="animate-fade-in"
              >
                <h2 className="section-title text-xl font-bold">Trending</h2>
                <div className="grid grid-cols-2 gap-4">
                  {trendingEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-md"
                    >
                      <div className="h-24 overflow-hidden relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{typeof event.date === 'string' ? event.date : new Date(event.date).toLocaleDateString()}</span>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            {typeof event.price === 'object' ? (event.price.isFree ? 'Free' : `$${event.price.min}`) : event.price}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
              
              {/* Weekend Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="animate-fade-in"
              >
                <h2 className="section-title text-xl font-bold">This Weekend</h2>
                <div className="flex flex-col gap-6">
                  {weekendEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </TabsContent>
            
            <TabsContent value="friends" className="mt-0">
              <RecommendedFriends />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      
      <BottomNav />
    </div>
  );
};

export default Home;
