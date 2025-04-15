
import React, { useState } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedFriends } from "@/components/friends/RecommendedFriends";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FilterOptions } from "@/components/events/FilterMenu";
import { cn } from "@/lib/utils";

const Index = () => {
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
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-sunset-purple/5 to-sunset-pink/10 dark:from-background dark:via-background dark:to-background/95 transition-colors duration-300">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] dark:text-white text-[40px] sm:text-[55px] font-semibold text-center w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-5 shadow-sm relative">
          <span className="bg-gradient-to-r from-primary via-secondary to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
          <div className="absolute top-4 right-4">
            <ThemeToggle variant="modern" />
          </div>
        </header>

        <div className="bg-primary/20 dark:bg-primary/10 w-full py-2 text-center backdrop-blur-sm shadow-sm">
          <h1 className="text-xl font-bold text-primary dark:text-primary-foreground">
            Connect with Fellow Graduates
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-center mt-[15px] mb-2 text-[#303030] dark:text-white">
          Welcome, {user.name || "Graduate"}!
        </h2>
        <p className="text-sm text-center mb-3 text-[#333] dark:text-gray-300 max-w-xs">
          Find fun events to meet other graduates!
        </p>

        <div className="w-full px-5 mb-2">
          <SearchBar 
            onSearch={handleSearch} 
          />
        </div>

        <div className="w-full max-w-[720px] mt-2 px-5">
          <Tabs 
            defaultValue="events" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm rounded-2xl">
              <TabsTrigger value="events" className="rounded-xl">Events</TabsTrigger>
              <TabsTrigger value="friends" className="rounded-xl">Find Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-0 space-y-8">
              {/* For You Section */}
              <section>
                <h2 className="section-title">For You</h2>
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
                <h2 className="section-title">Trending</h2>
                <div className="grid grid-cols-2 gap-4">
                  {trendingEvents.map(event => (
                    <div key={event.id} className="rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                      <div className="h-24 overflow-hidden relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{event.date}</span>
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">
                            {typeof event.price === 'string' ? event.price : (event.price.isFree ? 'Free' : `$${event.price.min}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Weekend Section */}
              <section>
                <h2 className="section-title">This Weekend</h2>
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
      </div>
    </div>
  );
};

export default Index;
