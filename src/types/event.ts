
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime?: string;
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
