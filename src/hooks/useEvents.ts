
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";
import { FilterOptions } from "@/components/events/FilterMenu";

// Mock API function - in a real app, this would connect to your event APIs
const fetchEvents = async (filters?: Partial<FilterOptions>): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This would be an actual API call
  const mockEvents = getMockEvents();
  
  // Filter the events based on provided filters
  if (!filters) return mockEvents;
  
  return mockEvents.filter(event => {
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(event.category) && 
         !filters.categories.some(cat => event.tags.includes(cat))) {
        return false;
      }
    }
    
    // Filter by moods
    if (filters.moods && filters.moods.length > 0) {
      if (!filters.moods.some(mood => event.mood.includes(mood))) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (event.price.isFree && min > 0) return false;
      if (!event.price.isFree && event.price.min < min) return false;
      if (max < 100 && event.price.min > max) return false;
    }
    
    // Filter by date range
    if (filters.dateRange && filters.dateRange !== 'all') {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const thisWeekend = new Date(today);
      thisWeekend.setDate(thisWeekend.getDate() + (6 - today.getDay()));
      
      switch (filters.dateRange) {
        case 'today':
          if (eventDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'tomorrow':
          if (eventDate.toDateString() !== tomorrow.toDateString()) return false;
          break;
        case 'this-week':
          if (eventDate < today || eventDate > nextWeek) return false;
          break;
        case 'this-weekend':
          if (eventDate < thisWeekend || eventDate > new Date(thisWeekend.getTime() + 2 * 24 * 60 * 60 * 1000)) return false;
          break;
        case 'next-week':
          if (eventDate < nextWeek || eventDate > new Date(nextWeek.getTime() + 7 * 24 * 60 * 60 * 1000)) return false;
          break;
        case 'next-month':
          const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const twoMonths = new Date(today.getFullYear(), today.getMonth() + 2, 1);
          if (eventDate < nextMonth || eventDate >= twoMonths) return false;
          break;
      }
    }
    
    return true;
  });
};

export function useEvents(filters?: Partial<FilterOptions>) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => fetchEvents(filters),
    staleTime: 300000, // 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

// For trending events
export function useTrendingEvents() {
  return useQuery({
    queryKey: ['events', 'trending'],
    queryFn: async () => {
      const allEvents = await fetchEvents();
      return allEvents.filter(event => event.isTrending);
    },
    staleTime: 300000,
  });
}

// For editor's picks
export function useEditorsPicksEvents() {
  return useQuery({
    queryKey: ['events', 'editors-picks'],
    queryFn: async () => {
      const allEvents = await fetchEvents();
      return allEvents.filter(event => event.isEditorsPick);
    },
    staleTime: 300000,
  });
}

// For weekend events
export function useWeekendEvents() {
  return useQuery({
    queryKey: ['events', 'weekend'],
    queryFn: async () => {
      const allEvents = await fetchEvents();
      const today = new Date();
      const friday = new Date();
      friday.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7));
      const sunday = new Date(friday);
      sunday.setDate(friday.getDate() + 2);
      
      return allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= friday && eventDate <= sunday;
      });
    },
    staleTime: 300000,
  });
}

// Mock events data
function getMockEvents(): Event[] {
  return [
    {
      id: "1",
      title: "Jazz Night at Blue Note",
      description: "Experience an unforgettable night of jazz music featuring top local musicians in an intimate setting.",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-18",
      startTime: "20:00",
      endTime: "23:00",
      location: {
        name: "Blue Note Jazz Club",
        address: "131 W 3rd St",
        city: "New York",
        coordinates: {
          lat: 40.730712,
          lng: -74.000774
        }
      },
      price: {
        min: 25,
        max: 45,
        currency: "$",
        isFree: false
      },
      category: "Music",
      tags: ["Jazz", "Live Music", "Nightlife"],
      mood: ["Chill", "Intimate"],
      attendees: 78,
      source: "internal",
      url: "https://example.com/event/1",
      isTrending: true,
      isEditorsPick: false,
      pointsForAttending: 50,
      pointsForSharing: 25
    },
    {
      id: "2",
      title: "Tech Startup Networking Mixer",
      description: "Connect with like-minded entrepreneurs, investors, and tech enthusiasts at this monthly networking event.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-22",
      startTime: "18:30",
      endTime: "21:30",
      location: {
        name: "Innovation Hub",
        address: "123 Market St",
        city: "San Francisco",
        coordinates: {
          lat: 37.7749,
          lng: -122.4194
        }
      },
      price: {
        min: 0,
        currency: "$",
        isFree: true
      },
      category: "Networking",
      tags: ["Tech", "Startups", "Professional"],
      mood: ["Networking", "Social"],
      attendees: 120,
      source: "eventbrite",
      url: "https://example.com/event/2",
      isTrending: false,
      isEditorsPick: true,
      pointsForAttending: 75,
      pointsForSharing: 30
    },
    {
      id: "3",
      title: "Downtown Art Gallery Opening",
      description: "Be among the first to see this exciting new exhibition featuring works from emerging local artists.",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-20",
      startTime: "19:00",
      endTime: "22:00",
      location: {
        name: "Modern Art Space",
        address: "456 Gallery Way",
        city: "Chicago",
        coordinates: {
          lat: 41.8781,
          lng: -87.6298
        }
      },
      price: {
        min: 10,
        currency: "$",
        isFree: false
      },
      category: "Arts",
      tags: ["Art", "Exhibition", "Culture"],
      mood: ["Creative", "Social"],
      attendees: 65,
      source: "internal",
      url: "https://example.com/event/3",
      isTrending: true,
      isEditorsPick: true,
      pointsForAttending: 40,
      pointsForSharing: 20
    },
    {
      id: "4",
      title: "Weekend Beach Volleyball Tournament",
      description: "Join or watch teams compete in this fun beach volleyball tournament with food, music, and prizes.",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-19",
      startTime: "10:00",
      endTime: "18:00",
      location: {
        name: "Sunny Beach",
        address: "100 Shore Dr",
        city: "Los Angeles",
        coordinates: {
          lat: 34.0522,
          lng: -118.2437
        }
      },
      price: {
        min: 5,
        max: 15,
        currency: "$",
        isFree: false
      },
      category: "Sports",
      tags: ["Volleyball", "Beach", "Competition"],
      mood: ["Energetic", "Social", "Outdoor"],
      attendees: 200,
      source: "meetup",
      url: "https://example.com/event/4",
      isTrending: true,
      isEditorsPick: false,
      pointsForAttending: 60,
      pointsForSharing: 25
    },
    {
      id: "5",
      title: "Craft Beer Festival",
      description: "Sample over 50 craft beers from local and regional breweries along with food trucks and live music.",
      image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-17",
      startTime: "12:00",
      endTime: "20:00",
      location: {
        name: "City Park Pavilion",
        address: "789 Park Ave",
        city: "Denver",
        coordinates: {
          lat: 39.7392,
          lng: -104.9903
        }
      },
      price: {
        min: 35,
        max: 60,
        currency: "$",
        isFree: false
      },
      category: "Food",
      tags: ["Beer", "Festival", "Food"],
      mood: ["Social", "Hype", "Chill"],
      attendees: 450,
      source: "ticketmaster",
      url: "https://example.com/event/5",
      isTrending: false,
      isEditorsPick: true,
      pointsForAttending: 80,
      pointsForSharing: 35
    },
    {
      id: "6",
      title: "Outdoor Yoga in the Park",
      description: "Join us for a rejuvenating morning yoga session in the beautiful city park, suitable for all levels.",
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-19",
      startTime: "08:00",
      endTime: "09:30",
      location: {
        name: "Central Park",
        address: "5th Ave",
        city: "New York",
        coordinates: {
          lat: 40.7812,
          lng: -73.9665
        }
      },
      price: {
        min: 0,
        currency: "$",
        isFree: true
      },
      category: "Wellness",
      tags: ["Yoga", "Fitness", "Outdoor"],
      mood: ["Chill", "Wellness"],
      attendees: 40,
      source: "meetup",
      url: "https://example.com/event/6",
      isTrending: false,
      isEditorsPick: false,
      pointsForAttending: 30,
      pointsForSharing: 15
    },
    {
      id: "7",
      title: "Indie Film Premiere & Director Q&A",
      description: "Be among the first to see this award-winning indie film followed by a Q&A with the director.",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-21",
      startTime: "19:30",
      endTime: "22:30",
      location: {
        name: "Indie Cinema",
        address: "321 Film Blvd",
        city: "Austin",
        coordinates: {
          lat: 30.2672,
          lng: -97.7431
        }
      },
      price: {
        min: 12,
        currency: "$",
        isFree: false
      },
      category: "Arts",
      tags: ["Film", "Cinema", "Q&A"],
      mood: ["Creative", "Educational"],
      attendees: 85,
      source: "eventbrite",
      url: "https://example.com/event/7",
      isTrending: false,
      isEditorsPick: true,
      pointsForAttending: 45,
      pointsForSharing: 20
    },
    {
      id: "8",
      title: "AI and Machine Learning Workshop",
      description: "Learn the fundamentals of AI and machine learning in this hands-on workshop led by industry experts.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      date: "2025-04-23",
      startTime: "09:00",
      endTime: "17:00",
      location: {
        name: "Tech Campus",
        address: "555 Innovation Way",
        city: "Seattle",
        coordinates: {
          lat: 47.6062,
          lng: -122.3321
        }
      },
      price: {
        min: 99,
        max: 149,
        currency: "$",
        isFree: false
      },
      category: "Tech",
      tags: ["AI", "Workshop", "Education"],
      mood: ["Educational", "Professional"],
      attendees: 50,
      source: "internal",
      url: "https://example.com/event/8",
      isTrending: false,
      isEditorsPick: false,
      pointsForAttending: 100,
      pointsForSharing: 40
    }
  ];
}
