
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  day?: string; // Added day field
  startTime: string;
  endTime?: string;
  time?: string; // Added time field for backward compatibility
  location: {
    name: string;
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  price: {
    min: number;
    max?: number;
    currency: string;
    isFree: boolean;
  };
  category: string;
  tags: string[];
  mood: string[];
  attendees: number;
  source: "ticketmaster" | "eventbrite" | "seatgeek" | "songkick" | "meetup" | "internal";
  url: string;
  isTrending: boolean;
  isEditorsPick: boolean;
  pointsForAttending: number;
  pointsForSharing: number;
}
