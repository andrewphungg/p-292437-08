
import React, { useState } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedFriends } from "@/components/friends/RecommendedFriends";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FilterOptions } from "@/components/events/FilterMenu";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar, MapPin, Music, Tag, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventList } from "@/components/events/EventList";
import { motion } from "framer-motion";

const Index = () => {
  const { events, suggestedEvents, user } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
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
      
    const matchesCategory = selectedCategory === "all" || 
      event.category === selectedCategory ||
      event.tags.includes(selectedCategory);
      
    return matchesSearch && matchesCategories && matchesCategory;
  });

  // Get trending events
  const trendingEvents = events.filter(event => event.isTrending).slice(0, 6);
  
  // Get weekend events (mock implementation)
  const weekendEvents = events.filter((_, index) => index % 3 === 0).slice(0, 4);

  // Categories for quick filtering
  const categories = [
    { id: "all", name: "All", icon: <Compass size={16} /> },
    { id: "Music", name: "Music", icon: <Music size={16} /> },
    { id: "Food", name: "Food", icon: <Tag size={16} /> },
    { id: "Sports", name: "Sports", icon: <Tag size={16} /> },
    { id: "Arts", name: "Arts", icon: <Tag size={16} /> },
    { id: "Tech", name: "Tech", icon: <Tag size={16} /> },
  ];
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="relative text-center py-6">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-sunset-orange via-sunset-yellow to-sunset-peach bg-clip-text text-transparent pb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Joople
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover Events For You
        </p>
        <motion.div 
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ThemeToggle variant="modern" />
        </motion.div>
      </div>
      
      <div className="px-4 pb-4">
        <SearchBar onSearch={handleSearch} placeholder="Search Events & Places" />
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className={`rounded-full flex items-center gap-1 ${
                  selectedCategory === category.id 
                    ? "bg-primary text-white" 
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header}>
      <div className="py-6 space-y-8">
        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 rounded-xl">
            <TabsTrigger value="events" className="rounded-xl">Events</TabsTrigger>
            <TabsTrigger value="friends" className="rounded-xl">Find Friends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="mt-0 space-y-8">
            {/* For You Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">For You</h2>
                <Button variant="link" size="sm" className="text-primary flex items-center gap-1 -mr-2">
                  <MapPin size={14} /> Near You
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {filteredEvents.slice(0, 5).map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
                {filteredEvents.length === 0 && (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No events match your search criteria
                  </p>
                )}
              </div>
            </section>
            
            {/* Trending Section */}
            <section>
              <h2 className="section-title font-bold">Trending</h2>
              <div className="grid grid-cols-2 gap-4">
                {trendingEvents.map(event => (
                  <EventCard key={event.id} event={event} variant="compact" />
                ))}
              </div>
            </section>
            
            {/* Weekend Section */}
            <section>
              <h2 className="section-title font-bold">This Weekend</h2>
              <div className="flex flex-col gap-6">
                {weekendEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="friends" className="mt-0">
            <RecommendedFriends />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Index;
