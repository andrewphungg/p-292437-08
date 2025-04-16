
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
import { EventList } from "@/components/events/EventList";
import { ApiKeySetup } from "@/components/settings/ApiKeySetup";

const Index = () => {
  const { user } = useUser();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Use Ticketmaster API to get events
  const { data: ticketmasterEvents = [], isLoading, refetch } = useTicketmasterEvents();
  
  // For weekend events
  const { data: weekendEvents = [], isLoading: isLoadingWeekend } = useFilteredEvents({
    dateRange: 'this-weekend'
  });

  // For trending events
  const { data: trendingEvents = [], isLoading: isLoadingTrending } = useFilteredEvents({
    dateRange: 'trending'
  });

  const handleApiKeyUpdate = (apiKey: string) => {
    // Refresh events after API key update
    refetch();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
    { id: "Sports", name: "Sports", icon: <Tag size={16} /> },
    { id: "Arts", name: "Arts", icon: <Tag size={16} /> },
    { id: "Family", name: "Family", icon: <Tag size={16} /> },
    { id: "Miscellaneous", name: "Misc", icon: <Tag size={16} /> },
  ];

  // Filter events based on search query, selected categories, and active filter
  const filteredEvents = (ticketmasterEvents).filter(event => {
    // Match search query (case insensitive)
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof event.location === 'object' && event.location.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Match selected categories
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => 
        event.category === category || 
        event.tags.some(tag => tag && tag.toLowerCase() === category.toLowerCase())
      );

    // Match active filter tab
    let matchesActiveFilter = false;
    
    switch(activeFilter) {
      case "all":
        matchesActiveFilter = true;
        break;
      case "trending":
        matchesActiveFilter = event.isTrending;
        break;
      case "weekend":
        matchesActiveFilter = isWeekendEvent(event.date);
        break;
      case "upcoming":
        matchesActiveFilter = isUpcomingEvent(event.date);
        break;
      default:
        matchesActiveFilter = true;
    }
      
    return matchesSearch && matchesCategories && matchesActiveFilter;
  });

  // Helper functions for date filtering
  const isWeekendEvent = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    
    // Get next Friday
    const friday = new Date(now);
    const dayOfWeek = friday.getDay(); // 0 is Sunday, 6 is Saturday
    friday.setDate(now.getDate() + ((5 - dayOfWeek + 7) % 7)); // Next Friday
    
    // Get next Sunday
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    
    // Check if date is between next Friday and Sunday inclusive
    return date >= friday && date <= sunday;
  };
  
  const isUpcomingEvent = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const twoWeeksLater = new Date(now);
    twoWeeksLater.setDate(now.getDate() + 14);
    
    return date >= now && date <= twoWeeksLater;
  };

  useEffect(() => {
    // Show a toast when events are loaded
    if (ticketmasterEvents.length > 0 && !isLoading) {
      toast.success(`Loaded ${ticketmasterEvents.length} events from Ticketmaster`);
    }
  }, [ticketmasterEvents.length, isLoading]);
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="relative text-center py-6">
        <div className="flex justify-between items-center px-4">
          <div></div>
          <h1 
            className="text-5xl font-bold bg-gradient-to-r from-sunset-orange via-sunset-yellow to-sunset-peach bg-clip-text text-transparent pb-1"
          >
            Joople
          </h1>
          <div className="flex space-x-2">
            <ApiKeySetup onSave={handleApiKeyUpdate} />
            <ThemeToggle variant="modern" />
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover Events For You
        </p>
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
            
            <EventList 
              events={filteredEvents.slice(0, 5)}
              loading={isLoading}
              emptyMessage="No events match your search criteria"
            />
          </section>
          
          {/* Trending Section */}
          <section>
            <h2 className="section-title font-bold mb-4">Trending</h2>
            <EventList 
              events={trendingEvents.filter(e => e.isTrending).slice(0, 6)}
              loading={isLoadingTrending}
              variant="grid"
              emptyMessage="No trending events available"
            />
          </section>
          
          {/* Weekend Section */}
          <section>
            <h2 className="section-title font-bold mb-4">This Weekend</h2>
            <EventList 
              events={weekendEvents.slice(0, 3)}
              loading={isLoadingWeekend}
              emptyMessage="No events scheduled for this weekend"
            />
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
