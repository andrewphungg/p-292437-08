
import React, { useState } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedFriends } from "@/components/friends/RecommendedFriends";

const Index = () => {
  const { events, suggestedEvents, user } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  // Filter events based on search query and selected categories
  const filteredEvents = (suggestedEvents.length > 0 ? suggestedEvents : events).filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => event.tags.includes(category));
      
    return matchesSearch && matchesCategories;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-sunset-purple/5 to-sunset-pink/10">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] text-[40px] sm:text-[55px] font-semibold text-center w-full bg-white/80 backdrop-blur-md py-5 shadow-sm">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>

        <div className="bg-sunset-orange/20 w-full py-2 text-center backdrop-blur-sm shadow-sm">
          <h1 className="text-xl font-bold text-sunset-orange">
            Connect with Fellow Graduates
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-center mt-[15px] mb-2 text-[#303030]">
          Welcome, {user.name || "Graduate"}!
        </h2>
        <p className="text-sm text-center mb-3 text-[#333] max-w-xs">
          Find fun events to meet other graduates and earn points!
        </p>

        <SearchBar onSearch={handleSearch} onFilterToggle={handleToggleFilter} />

        <div className="w-full max-w-[720px] mt-4 px-5">
          <Tabs 
            defaultValue="events" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4 bg-white/60 backdrop-blur-sm shadow-sm">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="friends">Find Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-0">
              {filterOpen && (
                <div className="mb-4">
                  <FilterCategories 
                    selectedCategories={selectedCategories} 
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              )}
              <main className="flex flex-col gap-5">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500">
                    No events match your search criteria
                  </p>
                )}
              </main>
            </TabsContent>
            
            <TabsContent value="friends" className="mt-0">
              <RecommendedFriends />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

// Filter categories component
const FilterCategories = ({ 
  selectedCategories, 
  onCategoryChange 
}: { 
  selectedCategories: string[], 
  onCategoryChange: (categories: string[]) => void 
}) => {
  const categories = ["Music", "Food", "Sports", "Networking", "Tech", "Arts", "Education", "Outdoor"];
  
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    onCategoryChange(newCategories);
  };
  
  return (
    <div className="p-4 bg-white/80 rounded-xl shadow-sm backdrop-blur-md border border-sunset-purple/10">
      <h3 className="font-medium text-sm mb-3 text-sunset-purple">Filter by category:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              selectedCategories.includes(category)
                ? "bg-sunset-purple text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
