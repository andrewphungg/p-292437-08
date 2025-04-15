
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

export function useTicketmasterEvents(options?: {
  keyword?: string;
  category?: string;
  city?: string;
  stateCode?: string;
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}) {
  const {
    keyword,
    category,
    city,
    stateCode,
    startDate,
    endDate,
    enabled = true
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

  return useQuery({
    queryKey: ['ticketmasterEvents', { keyword, category, city, stateCode, startDate, endDate }],
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
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
    const friday = new Date(now);
    friday.setDate(now.getDate() + (5 - dayOfWeek + 7) % 7);
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
  }
  
  return useTicketmasterEvents({
    category,
    city: location,
    keyword,
    startDate,
    endDate,
  });
}
