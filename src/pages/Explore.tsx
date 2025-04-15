
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/events/SearchBar";
import { EventList } from "@/components/events/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { FilterOptions } from "@/components/events/FilterMenu";
import { Button } from "@/components/ui/button";
import { Compass, MapPin, Music, Tag } from "lucide-react";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get events data
  const { data: allEvents = [], isLoading } = useEvents(filters);
  
  // Filter events based on search query and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      event.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || 
      event.category === selectedCategory ||
      event.tags.includes(selectedCategory);
      
    return matchesSearch && matchesCategory;
  });
  
  const categories = [
    { id: "all", name: "All", icon: <Compass size={16} /> },
    { id: "Music", name: "Music", icon: <Music size={16} /> },
    { id: "Food", name: "Food", icon: <Tag size={16} /> },
    { id: "Sports", name: "Sports", icon: <Tag size={16} /> },
    { id: "Arts", name: "Arts", icon: <Tag size={16} /> },
    { id: "Tech", name: "Tech", icon: <Tag size={16} /> },
  ];
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sunset-purple via-sunset-orange to-sunset-peach bg-clip-text text-transparent pb-1">
          Joople
        </h1>
        <p className="text-sm text-gray-500">
          Explore events around you
        </p>
      </div>
      
      <div className="border-b border-gray-200 pb-4 px-4">
        <SearchBar onSearch={handleSearch} placeholder="Explore events and places" />
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`rounded-full flex items-center gap-1 ${
                selectedCategory === category.id 
                  ? "bg-sunset-purple text-white" 
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header}>
      <div className="py-6 space-y-8">
        <Tabs defaultValue="nearby" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 rounded-xl">
            <TabsTrigger value="nearby" className="rounded-xl">Nearby</TabsTrigger>
            <TabsTrigger value="popular" className="rounded-xl">Popular</TabsTrigger>
            <TabsTrigger value="new" className="rounded-xl">New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nearby">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Events Near You</h2>
              <Button variant="link" size="sm" className="text-sunset-purple flex items-center gap-1">
                <MapPin size={14} /> Change Location
              </Button>
            </div>
            <EventList 
              events={filteredEvents} 
              loading={isLoading}
              emptyMessage={
                searchQuery 
                  ? `No events matching "${searchQuery}"` 
                  : "No nearby events found with your filters"
              }
            />
          </TabsContent>
          
          <TabsContent value="popular">
            <EventList 
              events={filteredEvents.filter(event => event.attendees > 50)} 
              loading={isLoading}
              title="Popular Events"
              subtitle="Events with high attendance"
              variant="grid"
            />
          </TabsContent>
          
          <TabsContent value="new">
            <EventList 
              events={filteredEvents.slice(0, 5)} 
              loading={isLoading}
              title="Newly Added"
              subtitle="The latest events added to Joople"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
