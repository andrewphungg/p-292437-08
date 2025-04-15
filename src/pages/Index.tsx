
import React, { useState, useEffect } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { useUser } from "@/context/UserContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { FilterMenu, FilterOptions } from "@/components/events/FilterMenu";
import { cn } from "@/lib/utils";
import { AppLayout } from "@/components/layout/AppLayout";
import { MapPin, Music, Tag, Compass, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTicketmasterEvents, useFilteredEvents } from "@/hooks/useTicketmasterEvents";
import { toast } from "sonner";

const Index = () => {
  const { user } = useUser();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Use Ticketmaster API to get events
  const { data: ticketmasterEvents = [], isLoading } = useTicketmasterEvents();
  
  // For trending events
  const { data: weekendEvents = [], isLoading: isLoadingWeekend } = useFilteredEvents({
    dateRange: 'this-weekend'
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setSelectedCategories(filters.categories);
    setFilterMenuOpen(false);
  };

  const openFilterMenu = () => {
    setFilterMenuOpen(true);
  };

  const closeFilterMenu = () => {
    setFilterMenuOpen(false);
  };

  // Add default filtering options
  const filterOptions = [
    { id: "all", label: "All", icon: <Compass size={16} /> },
    { id: "trending", label: "Trending", icon: <TrendingUp size={16} /> },
    { id: "weekend", label: "This Weekend", icon: <Calendar size={16} /> },
    { id: "upcoming", label: "Upcoming", icon: <Clock size={16} /> },
  ];

  // Categories for quick filtering
  const categories = [
    { id: "all", name: "All", icon: <Compass size={16} /> },
    { id: "Music", name: "Music", icon: <Music size={16} /> },
    { id: "Food", name: "Food", icon: <Tag size={16} /> },
    { id: "Sports", name: "Sports", icon: <Tag size={16} /> },
    { id: "Arts", name: "Arts", icon: <Tag size={16} /> },
    { id: "Tech", name: "Tech", icon: <Tag size={16} /> },
  ];

  // Filter events based on search query, selected categories, and active filter
  const filteredEvents = (ticketmasterEvents).filter(event => {
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof event.location === 'object' && event.location.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => event.tags.includes(category) || event.category === category);

    // Additional filter based on the active filter tab
    const matchesActiveFilter = 
      (activeFilter === "all") || 
      (activeFilter === "trending" && event.isTrending) ||
      (activeFilter === "weekend" && isWeekendEvent(event.date)) ||
      (activeFilter === "upcoming" && isUpcomingEvent(event.date));
      
    return matchesSearch && matchesCategories && matchesActiveFilter;
  });

  // Helper functions for date filtering
  const isWeekendEvent = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    const now = new Date();
    const nextWeekend = new Date(now);
    
    // Set to upcoming weekend
    nextWeekend.setDate(now.getDate() + (day === 0 ? 7 : 7 - now.getDay()));
    
    // Check if event is on a weekend (0 = Sunday, 6 = Saturday)
    return (day === 0 || day === 6) && date <= nextWeekend;
  };
  
  const isUpcomingEvent = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const twoWeeksLater = new Date(now);
    twoWeeksLater.setDate(now.getDate() + 14);
    
    return date >= now && date <= twoWeeksLater;
  };

  // Get trending events
  const trendingEvents = ticketmasterEvents.filter(event => event.isTrending).slice(0, 6);

  useEffect(() => {
    // Show a toast when events are loaded
    if (ticketmasterEvents.length > 0 && !isLoading) {
      toast.success(`Loaded ${ticketmasterEvents.length} events from Ticketmaster`);
    }
  }, [ticketmasterEvents.length, isLoading]);
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="relative text-center py-6">
        <h1 
          className="text-5xl font-bold bg-gradient-to-r from-sunset-orange via-sunset-yellow to-sunset-peach bg-clip-text text-transparent pb-1"
        >
          Joople
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover Events For You
        </p>
        <div 
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <ThemeToggle variant="modern" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search Events & Places" 
          onFilterClick={openFilterMenu}
        />
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filterOptions.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-1",
                activeFilter === filter.id 
                  ? "bg-primary text-white" 
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </Button>
          ))}
          
          {categories.slice(1).map((category) => (
            <Button
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full flex items-center gap-1",
                selectedCategories.includes(category.id) 
                  ? "bg-primary text-white" 
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={() => {
                if (selectedCategories.includes(category.id)) {
                  setSelectedCategories(prev => prev.filter(c => c !== category.id));
                } else {
                  setSelectedCategories(prev => [...prev, category.id]);
                }
              }}
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
        <div className="space-y-8">
          {/* For You Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">For You</h2>
              <Button variant="link" size="sm" className="text-primary flex items-center gap-1 -mr-2">
                <MapPin size={14} /> Near You
              </Button>
            </div>
            <div className="flex flex-col gap-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mb-2"></div>
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-2 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.slice(0, 5).map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
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
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                ))
              ) : trendingEvents.length > 0 ? (
                trendingEvents.map(event => (
                  <EventCard key={event.id} event={event} variant="compact" />
                ))
              ) : (
                <p className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
                  No trending events available
                </p>
              )}
            </div>
          </section>
          
          {/* Weekend Section */}
          <section>
            <h2 className="section-title font-bold">This Weekend</h2>
            <div className="flex flex-col gap-6">
              {isLoadingWeekend ? (
                Array(2).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                ))
              ) : weekendEvents.length > 0 ? (
                weekendEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No events scheduled for this weekend
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Filter Menu */}
        <FilterMenu 
          onClose={closeFilterMenu} 
          onApplyFilters={handleApplyFilters}
          open={filterMenuOpen}
        />
      </div>
    </AppLayout>
  );
};

export default Index;
