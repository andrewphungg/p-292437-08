
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchTicketmasterEvents, 
  refreshEventsData,
  searchEvents,
  getEventsByCategory,
  getEventsByLocation,
  getEventsByDateRange
} from '@/services/ticketmasterService';
import { Event } from '@/types/event';
import { toast } from 'sonner';

// The API key is now managed solely in the backend
export const checkApiKey = (): boolean => {
  return true;
};

export const setApiKey = (key: string): void => {
  // This function is kept for backward compatibility but no longer stores keys
  console.log("API keys are now managed in the backend");
};

export function useTicketmasterEvents(options?: {
  keyword?: string;
  category?: string;
  city?: string;
  stateCode?: string;
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
  size?: number;
}) {
  const {
    keyword,
    category,
    city,
    stateCode = "CA", // Default to California events
    startDate,
    endDate,
    enabled = true,
    size = 50
  } = options || {};

  const queryFn = async () => {
    if (keyword) {
      return searchEvents(keyword);
    } else if (category) {
      return getEventsByCategory(category);
    } else if (city) {
      return getEventsByLocation(city, stateCode);
    } else if (startDate) {
      return getEventsByDateRange(startDate, endDate);
    } else {
      return refreshEventsData();
    }
  };

  const query = useQuery({
    queryKey: ['ticketmasterEvents', { keyword, category, city, stateCode, startDate, endDate, size }],
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    meta: {
      errorHandler: (error: Error) => {
        console.error('Error fetching events:', error);
        toast.error('Failed to fetch events. Please try again later.');
      }
    }
  });

  // Log successful results
  useEffect(() => {
    if (query.data) {
      console.log(`Fetched ${query.data.length} events from Ticketmaster`);
    }
  }, [query.data]);

  return query;
}

// This hook will be used to sync events daily
export function useEventSync(enabled = true) {
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  
  const { data: events, isLoading, error, refetch } = useQuery({
    queryKey: ['eventSync'],
    queryFn: refreshEventsData,
    enabled: enabled,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (events && events.length > 0) {
      setLastSynced(new Date());
    }
  }, [events]);

  const manualSync = async () => {
    const result = await refetch();
    if (result.data) {
      setLastSynced(new Date());
    }
    return result.data;
  };

  return {
    events,
    isLoading,
    error,
    lastSynced,
    manualSync
  };
}

// This hook provides filtered events based on user preferences
export function useFilteredEvents(filters: {
  category?: string;
  location?: string;
  dateRange?: string;
  keyword?: string;
}) {
  const { category, location, dateRange, keyword } = filters;
  
  // Parse date range
  let startDate, endDate;
  if (dateRange === 'today') {
    startDate = new Date().toISOString().split('T')[0];
    endDate = startDate;
  } else if (dateRange === 'this-weekend') {
    const now = new Date();
    const dayOfWeek = now.getDay();
    // Calculate days until Friday (day 5)
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
    const friday = new Date(now);
    friday.setDate(now.getDate() + daysUntilFriday);
    startDate = friday.toISOString().split('T')[0];
    
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    endDate = sunday.toISOString().split('T')[0];
  } else if (dateRange === 'this-week') {
    const now = new Date();
    startDate = now.toISOString().split('T')[0];
    
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    endDate = nextWeek.toISOString().split('T')[0];
  } else if (dateRange === 'upcoming') {
    const now = new Date();
    startDate = now.toISOString().split('T')[0];
    
    const threeMonths = new Date(now);
    threeMonths.setMonth(now.getMonth() + 3);
    endDate = threeMonths.toISOString().split('T')[0];
  } else if (dateRange === 'trending') {
    // For trending, we'll get all events and filter by isTrending in useTicketmasterEvents
    const now = new Date();
    startDate = now.toISOString().split('T')[0];
    
    const oneMonth = new Date(now);
    oneMonth.setMonth(now.getMonth() + 1);
    endDate = oneMonth.toISOString().split('T')[0];
  }
  
  return useTicketmasterEvents({
    category,
    city: location,
    keyword,
    startDate,
    endDate,
    size: 50
  });
}
