
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  graduationYear: number;
  university: string;
  personality: PersonalityType;
  points: number;
  interests: string[];
  followingCategories: string[];
  followingArtists: string[];
  followingTags: string[];
  attendedEvents: string[];
  savedEvents: string[];
  sharedEvents: string[];
  badges: Badge[];
  premium: boolean;
  notifications: Notification[];
}

export type PersonalityType = 'outgoing' | 'chill' | 'party' | 'artsy' | 'athletic' | 'intellectual';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  dateEarned: string;
}

export interface Notification {
  id: string;
  type: 'event' | 'points' | 'badge' | 'friend' | 'system';
  title: string;
  message: string;
  read: boolean;
  date: string;
  action?: {
    type: 'link' | 'button';
    text: string;
    url?: string;
    callback?: () => void;
  };
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  personality: PersonalityType;
  sharedInterests: string[];
  sharedEvents: number;
  university: string;
  graduationYear: number;
}
