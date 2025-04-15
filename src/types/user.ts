
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  points: number;
  badges?: string[];
  interests: string[];
  attendedEvents: string[];
  sharedEvents: string[];
  savedEvents: string[]; // IDs of saved events
  friends: {
    id: string;
    name: string;
    avatar?: string;
    points: number;
    interests: string[];
  }[];
  createdAt?: string;
  bio?: string; // User biography
  location?: string; // User location
  role?: string;
  settings?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
    emailUpdates?: boolean;
    language?: string;
  };
}
