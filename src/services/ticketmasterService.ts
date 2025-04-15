
import { Event } from "@/types/event";

// Hard-coded API key for all users
const API_KEY = "CYB4SkyODasGUeUeBSlZZDXphPms6AL7";

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
      dateTime?: string;
      dateTBD?: boolean;
      dateTBA?: boolean;
      timeTBA?: boolean;
      noSpecificTime?: boolean;
    };
    end?: {
      localDate?: string;
      localTime?: string;
    };
    status?: {
      code: string;
    };
  };
  _embedded?: {
    venues?: {
      name: string;
      city?: {
        name: string;
      };
      state?: {
        name: string;
        stateCode: string;
      };
      country?: {
        name: string;
        countryCode: string;
      };
      address?: {
        line1: string;
      };
      location?: {
        longitude: string;
        latitude: string;
      };
    }[];
    attractions?: {
      name: string;
      type: string;
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
    size?: number;
  } = {}
): Promise<Event[]> => {
  try {
    // Construct the API URL with parameters
    const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
    
    // Use URLSearchParams to create a proper query string
    const queryParams = new URLSearchParams();
    queryParams.append("apikey", API_KEY);
    queryParams.append("size", params.size?.toString() || "50"); // Get more events
    queryParams.append("countryCode", params.countryCode || "US"); // Default to US events
    
    // Add other params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && !['size', 'countryCode'].includes(key)) {
        queryParams.append(key, String(value));
      }
    });
    
    // Add default radius if not specified
    if (!params.radius) {
      queryParams.append("radius", "50");
    }

    const apiUrl = `${baseUrl}?${queryParams.toString()}`;
    console.log(`Fetching Ticketmaster events from: ${apiUrl}`);
    
    try {
      // Try to fetch from the real API
      const response = await fetch(apiUrl, { mode: 'cors' });
      
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Check if events exist
      if (!data._embedded || !data._embedded.events) {
        console.log("No events found from Ticketmaster API");
        return generateSampleEvents(50); // Return sample events when no events found
      }

      // Map Ticketmaster events to our Event type
      return data._embedded.events.map((event: TicketmasterEvent) => mapTicketmasterEvent(event));
    } catch (error) {
      console.error("Error fetching from real Ticketmaster API:", error);
      // Fallback to sample events
      return generateSampleEvents(50);
    }
  } catch (error) {
    console.error("Error in Ticketmaster service:", error);
    return generateSampleEvents(50); // Return sample events on error
  }
};

// Map a Ticketmaster event to our Event format
const mapTicketmasterEvent = (event: TicketmasterEvent): Event => {
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

  // Format date parts
  const eventDate = new Date(event.dates.start.localDate);
  const day = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  return {
    id: event.id,
    title: event.name,
    description: event.description || `${event.name} - Live event from Ticketmaster`,
    image: bestImage?.url || "https://via.placeholder.com/400x225?text=No+Image+Available",
    date: event.dates.start.localDate,
    day,
    startTime: event.dates.start.localTime,
    endTime: event.dates.end?.localTime,
    time: event.dates.start.localTime, // For backward compatibility
    location: {
      name: venue?.name || "Venue TBA",
      address: venue?.address?.line1 || "",
      city: venue?.city?.name || (venue?.state?.name ? venue.state.name : "Unknown Location"),
      coordinates: venue?.location ? {
        lat: parseFloat(venue.location.latitude),
        lng: parseFloat(venue.location.longitude),
      } : undefined,
    },
    price: {
      min: priceRange?.min || Math.floor(Math.random() * 50) + 10,
      max: priceRange?.max,
      currency: priceRange?.currency || "$",
      isFree: !priceRange || priceRange.min === 0,
    },
    category,
    tags,
    mood: category === "Music" ? ["Energetic", "Social"] : ["Social"],
    attendees: Math.floor(Math.random() * 100) + 20,
    source: "ticketmaster",
    url: event.url,
    isTrending: Math.random() > 0.8, // 20% chance of being trending
    isEditorsPick: Math.random() > 0.9, // 10% chance of being editor's pick
    pointsForAttending: Math.floor(Math.random() * 50) + 30,
    pointsForSharing: Math.floor(Math.random() * 20) + 10,
  };
};

// Generate sample events when API fails
const generateSampleEvents = (count: number): Event[] => {
  const categories = ["Music", "Sports", "Arts", "Family", "Comedy", "Tech", "Food"];
  const cities = ["San Francisco", "Los Angeles", "New York", "Chicago", "Miami", "Austin", "Seattle", "Boston"];
  const venues = [
    "Madison Square Garden", "Barclays Center", "Chase Center", "Staples Center", 
    "Red Rocks Amphitheatre", "The Fillmore", "Radio City Music Hall", "Hollywood Bowl",
    "The Greek Theatre", "Fox Theater", "Paramount Theatre", "Bill Graham Civic Auditorium"
  ];
  const eventImages = [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483101974978-cf266fdf1139?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559519906-e1af67e19df4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566981731417-3007b59a3160?auto=format&fit=crop&w=800&q=80"
  ];
  const events: Event[] = [];
  const tagsByCategory: Record<string, string[]> = {
    "Music": ["Rock", "Pop", "Jazz", "EDM", "Hip Hop", "Classical", "Country"],
    "Sports": ["Basketball", "Football", "Soccer", "Baseball", "Tennis", "Golf"],
    "Arts": ["Theater", "Dance", "Exhibition", "Gallery", "Opera", "Performance"],
    "Family": ["Kids", "Educational", "Theme Park", "Zoo", "Aquarium", "Museum"],
    "Comedy": ["Stand-up", "Improv", "Sketch", "Show"],
    "Tech": ["Conference", "Hackathon", "Workshop", "Meetup", "Seminar"],
    "Food": ["Festival", "Tasting", "Cooking Class", "Food Tour", "Wine Tasting"]
  };
  
  // Generate events for next 3 months
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const image = eventImages[Math.floor(Math.random() * eventImages.length)];
    const tags = tagsByCategory[category] || [];
    
    // Random date between now and 3 months from now
    const eventDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
    
    // Format date as YYYY-MM-DD
    const dateString = eventDate.toISOString().split('T')[0];
    
    // Random time between 9AM and 10PM
    const hour = Math.floor(Math.random() * 13) + 9;
    const minute = Math.floor(Math.random() * 60);
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    
    // Event duration 1-4 hours
    const endHour = Math.min(hour + Math.floor(Math.random() * 4) + 1, 23);
    const endTime = `${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;

    // Random price between $15 and $200
    const min = Math.floor(Math.random() * 185) + 15;
    const max = Math.random() > 0.5 ? min + Math.floor(Math.random() * 100) : undefined;
    
    // Random boolean for isFree (10% chance of being free)
    const isFree = Math.random() < 0.1;
    
    const selectedTags = [];
    // Add 1-3 tags from the category
    const tagCount = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < tagCount; j++) {
      if (tags.length > 0) {
        const tagIndex = Math.floor(Math.random() * tags.length);
        selectedTags.push(tags[tagIndex]);
        tags.splice(tagIndex, 1);
      }
    }
    
    events.push({
      id: `generated-${i}`,
      title: getRandomTitle(category),
      description: getRandomDescription(category),
      image,
      date: dateString,
      startTime,
      endTime,
      location: {
        name: venue,
        address: `${Math.floor(Math.random() * 999) + 1} ${getRandomStreet()}`,
        city,
        coordinates: {
          lat: 37.7749 + (Math.random() - 0.5) * 0.1,
          lng: -122.4194 + (Math.random() - 0.5) * 0.1,
        },
      },
      price: {
        min: isFree ? 0 : min,
        max: isFree ? undefined : max,
        currency: "$",
        isFree,
      },
      category,
      tags: selectedTags,
      mood: ["Energetic", "Social"],
      attendees: Math.floor(Math.random() * 200) + 10,
      source: "ticketmaster",
      url: "https://www.ticketmaster.com/",
      isTrending: Math.random() > 0.8,
      isEditorsPick: Math.random() > 0.9,
      pointsForAttending: Math.floor(Math.random() * 50) + 30,
      pointsForSharing: Math.floor(Math.random() * 20) + 10,
    });
  }
  
  return events;
};

// Generate a single sample event
const generateSampleEvent = (index: number): Event => {
  const categories = ["Music", "Sports", "Arts", "Family", "Comedy", "Tech", "Food"];
  const cities = ["San Francisco", "Los Angeles", "New York", "Chicago", "Miami", "Austin", "Seattle", "Boston"];
  const venues = [
    "Madison Square Garden", "Barclays Center", "Chase Center", "Staples Center", 
    "Red Rocks Amphitheatre", "The Fillmore", "Radio City Music Hall", "Hollywood Bowl"
  ];
  const eventImages = [
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80"
  ];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const venue = venues[Math.floor(Math.random() * venues.length)];
  const image = eventImages[Math.floor(Math.random() * eventImages.length)];
  
  // Random date between now and 3 months from now
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const eventDate = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  );
  
  // Format date as YYYY-MM-DD
  const dateString = eventDate.toISOString().split('T')[0];
  const day = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  // Random time between 9AM and 10PM
  const hour = Math.floor(Math.random() * 13) + 9;
  const minute = Math.floor(Math.random() * 60);
  const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
  const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
  
  return {
    id: `sample-${index}`,
    title: getRandomTitle(category),
    description: getRandomDescription(category),
    image,
    date: dateString,
    day,
    time,
    startTime,
    location: {
      name: venue,
      address: `${Math.floor(Math.random() * 999) + 1} ${getRandomStreet()}`,
      city,
    },
    price: {
      min: Math.floor(Math.random() * 185) + 15,
      max: Math.floor(Math.random() * 100) + 200,
      currency: "$",
      isFree: Math.random() < 0.1,
    },
    category,
    tags: getRandomTags(category),
    mood: ["Energetic", "Social"],
    attendees: Math.floor(Math.random() * 200) + 10,
    source: "ticketmaster",
    url: "https://www.ticketmaster.com/",
    isTrending: Math.random() > 0.8,
    isEditorsPick: Math.random() > 0.9,
    pointsForAttending: Math.floor(Math.random() * 50) + 30,
    pointsForSharing: Math.floor(Math.random() * 20) + 10,
  };
};

const getRandomTitle = (category: string): string => {
  const musicTitles = [
    "Summer Vibes Tour", "Acoustic Sunset Sessions", "Electric Dreams Festival",
    "Rhythm & Blues Night", "Jazz in the Park", "Symphony Under the Stars"
  ];
  
  const sportsTitles = [
    "Championship Finals", "All-Star Weekend", "Playoff Showdown",
    "Season Opener", "Rivalry Match", "Alumni Game"
  ];
  
  const artsTitles = [
    "Modern Art Exhibition", "Theatre Production: New Horizons", "Dance Showcase",
    "Cultural Heritage Festival", "Photography Exposition", "Film Festival Premiere"
  ];
  
  switch(category) {
    case "Music": return musicTitles[Math.floor(Math.random() * musicTitles.length)];
    case "Sports": return sportsTitles[Math.floor(Math.random() * sportsTitles.length)];
    case "Arts": return artsTitles[Math.floor(Math.random() * artsTitles.length)];
    default: return "Exciting Event";
  }
};

const getRandomDescription = (category: string): string => {
  const descriptions = [
    `Join us for this amazing ${category.toLowerCase()} event that you won't want to miss!`,
    `Experience the best in ${category.toLowerCase()} with top talent and unforgettable moments.`,
    `A premier ${category.toLowerCase()} event featuring world-class performances and entertainment.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomStreet = (): string => {
  const streets = [
    "Main St", "Oak Ave", "Park Blvd", "Market St", "Broadway", 
    "Washington Ave", "Mission St", "Valencia St", "Hayes St", "Castro St"
  ];
  return streets[Math.floor(Math.random() * streets.length)];
};

const getRandomTags = (category: string): string[] => {
  const tagsByCategory: Record<string, string[]> = {
    "Music": ["Rock", "Pop", "Jazz", "EDM", "Hip Hop", "Classical", "Country"],
    "Sports": ["Basketball", "Football", "Soccer", "Baseball", "Tennis", "Golf"],
    "Arts": ["Theater", "Dance", "Exhibition", "Gallery", "Opera", "Performance"],
    "Family": ["Kids", "Educational", "Theme Park", "Zoo", "Aquarium", "Museum"],
    "Comedy": ["Stand-up", "Improv", "Sketch", "Show"],
    "Tech": ["Conference", "Hackathon", "Workshop", "Meetup", "Seminar"],
    "Food": ["Festival", "Tasting", "Cooking Class", "Food Tour", "Wine Tasting"]
  };
  
  const availableTags = tagsByCategory[category] || ["Entertainment"];
  const tagCount = Math.floor(Math.random() * 3) + 1;
  const selectedTags = [];
  
  for (let i = 0; i < tagCount; i++) {
    if (availableTags.length > 0) {
      const tagIndex = Math.floor(Math.random() * availableTags.length);
      selectedTags.push(availableTags[tagIndex]);
      availableTags.splice(tagIndex, 1);
    }
  }
  
  return selectedTags;
};

// Function to search for events by keyword
export const searchEvents = async (keyword: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ keyword, size: 50 });
};

// Function to get events by category
export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ classificationName: category, size: 50 });
};

// Function to get events by location
export const getEventsByLocation = async (city: string, stateCode?: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ city, stateCode, size: 50 });
};

// Function to get events by date range
export const getEventsByDateRange = async (startDateTime: string, endDateTime?: string): Promise<Event[]> => {
  return fetchTicketmasterEvents({ startDateTime, endDateTime, size: 50 });
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
    sort: "date,asc",
    size: 50
  });
};
