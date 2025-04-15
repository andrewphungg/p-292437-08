
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { SearchBar } from "@/components/events/SearchBar";
import { EventList } from "@/components/events/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents, useTrendingEvents, useEditorsPicksEvents, useWeekendEvents } from "@/hooks/useEvents";
import { FilterOptions } from "@/components/events/FilterMenu";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  
  // Queries
  const { data: allEvents = [], isLoading } = useEvents(filters);
  const { data: trendingEvents = [] } = useTrendingEvents();
  const { data: editorsPicks = [] } = useEditorsPicksEvents();
  const { data: weekendEvents = [] } = useWeekendEvents();
  
  // Filter events based on search query
  const filteredEvents = allEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    event.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.city.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
          EventCircle
        </h1>
        <p className="text-sm text-gray-500">
          Connect through shared experiences
        </p>
      </div>
      
      <div className="border-b border-gray-200 pb-4 px-4">
        <SearchBar onSearch={handleSearch} />
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header}>
      <div className="py-6 space-y-8">
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="weekend">Weekend</TabsTrigger>
            <TabsTrigger value="editors">Editor's</TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you">
            <EventList 
              events={filteredEvents} 
              loading={isLoading}
              title="Recommended for You"
              subtitle="Based on your interests and preferences"
              emptyMessage={
                searchQuery 
                  ? `No events matching "${searchQuery}"` 
                  : "No events found with your filters"
              }
            />
          </TabsContent>
          
          <TabsContent value="trending">
            <EventList 
              events={trendingEvents} 
              title="Trending Events"
              subtitle="Popular with people like you"
            />
          </TabsContent>
          
          <TabsContent value="weekend">
            <EventList 
              events={weekendEvents} 
              title="This Weekend"
              subtitle="Plans for your weekend"
              variant="grid"
            />
          </TabsContent>
          
          <TabsContent value="editors">
            <EventList 
              events={editorsPicks} 
              title="Editor's Picks"
              subtitle="Curated selection of the best events"
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
