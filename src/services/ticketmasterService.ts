
import { Event } from "@/types/event";

// Default API key
const DEFAULT_API_KEY = "CYB4SkyODasGUeUeBSlZZDXphPms6AL7";

// Get API key from localStorage or use the default one
const getApiKey = () => {
  return localStorage.getItem("ticketmasterApiKey") || DEFAULT_API_KEY;
};

// This interface defines the structure of a Ticketmaster event
interface TicketmasterEvent {
  id: string;
  name: string;
  description?: string;
  url: string;
  images: {
    url: string;
    width: number;
    height: number;
    ratio?: string;
  }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
    end?: {
      localDate?: string;
      localTime?: string;
    };
  };
  _embedded?: {
    venues?: {
      name: string;
      city?: {
        name: string;
      };
      address?: {
        line1: string;
      };
      location?: {
        longitude: string;
        latitude: string;
      };
    }[];
  };
  classifications?: {
    segment?: {
      name: string;
    };
    genre?: {
      name: string;
    };
    subGenre?: {
      name: string;
    };
  }[];
  priceRanges?: {
    min: number;
    max: number;
    currency: string;
  }[];
}

export const fetchTicketmasterEvents = async (
  params: {
    keyword?: string;
    city?: string;
    stateCode?: string;
    countryCode?: string;
    classificationName?: string;
    startDateTime?: string;
    endDateTime?: string;
    radius?: number;
    sort?: string;
  } = {}
): Promise<Event[]> => {
  try {
    // Get the API key from localStorage or use default
    const apiKey = getApiKey();
    
    // Construct the API URL with parameters
    const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
    
    // Fix: Use proper URLSearchParams constructor
    const queryParams = new URLSearchParams();
    queryParams.append("apikey", apiKey);
    queryParams.append("size", "20");
    
    // Add other params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const response = await fetch(`${baseUrl}?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Ticketmaster API response:", data);
    
    // Check if events exist
    if (!data._embedded || !data._embedded.events) {
      console.log("No events found");
      return [];
    }

    // Map Ticketmaster events to our Event type
    return data._embedded.events.map((event: TicketmasterEvent) => {
      // Find the best image (prefer 16:9 ratio and larger sizes)
      const bestImage = event.images.find(img => img.ratio === "16_9" && img.width > 500) || 
                      event.images.find(img => img.width > 500) ||
                      event.images[0];
      
      // Get venue information
      const venue = event._embedded?.venues?.[0];
      
      // Get price information
      const priceRange = event.priceRanges?.[0];
      
      // Get the main category
      const category = event.classifications?.[0]?.segment?.name || "Event";
      
      // Get tags from genres and subgenres
      const tags = [
        event.classifications?.[0]?.genre?.name,
        event.classifications?.[0]?.subGenre?.name,
      ].filter(Boolean) as string[];

      return {
        id: event.id,
        title: event.name,
        description: event.description || `${event.name} - Live event from Ticketmaster`,
        image: bestImage?.url || "https://via.placeholder.com/400x225?text=No+Image+Available",
        date: event.dates.start.localDate,
        startTime: event.dates.start.localTime,
        endTime: event.dates.end?.localTime,
        location: {
          name: venue?.name || "Venue TBA",
          address: venue?.address?.line1 || "",
          city: venue?.city?.name || "",
          coordinates: venue?.location ? {
            lat: parseFloat(venue.location.latitude),
            lng: parseFloat(venue.location.longitude),
          } : undefined,
        },
        price: {
          min: priceRange?.min || 0,
          max: priceRange?.max,
          currency: priceRange?.currency || "$",
          isFree: !priceRange || priceRange.min === 0,
        },
        category,
        tags,
        mood: category === "Music" ? ["Energetic", "Social"] : ["Social"],
        attendees: Math.floor(Math.random() * 100) + 20, // Placeholder
        source: "ticketmaster",
        url: event.url,
        isTrending: Math.random() > 0.8, // 20% chance of being trending
        isEditorsPick: Math.random() > 0.9, // 10% chance of being editor's pick
        pointsForAttending: Math.floor(Math.random() * 50) + 30,
        pointsForSharing: Math.floor(Math.random() * 20) + 10,
      };
    });
  } catch (error) {
    console.error("Error fetching Ticketmaster events:", error);
    return [];
  }
};

// Function to search for events by keyword
export const searchEvents = async (keyword: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ keyword });
};

// Function to get events by category
export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ classificationName: category });
};

// Function to get events by location
export const getEventsByLocation = async (city: string, stateCode?: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ city, stateCode });
};

// Function to get events by date range
export const getEventsByDateRange = async (startDateTime: string, endDateTime?: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ startDateTime, endDateTime });
};

// Function to refresh events data (can be called by a scheduler)
export const refreshEventsData = async (): Promise<Event[]> => {
  console.log("Refreshing events data from Ticketmaster...");
  
  // Get events for the next 30 days
  const now = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(now.getDate() + 30);
  
  const startDateTime = now.toISOString().split('T')[0] + "T00:00:00Z";
  const endDateTime = thirtyDaysLater.toISOString().split('T')[0] + "T23:59:59Z";
  
  return fetchTicketmasterEvents({
    startDateTime,
    endDateTime,
    sort: "date,asc"
  });
};
