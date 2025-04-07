
export interface Friend {
  id: string;
  name: string;
  avatar: string;
  points: number;
  interests?: string[];
  // Adding missing properties to make Friend compatible with User where needed
  email?: string;
  graduationYear?: number;
  university?: string;
  attendedEvents?: string[];
  sharedEvents?: string[];
  friends?: Friend[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  graduationYear: number;
  university: string;
  points: number;
  interests: string[];
  friends: Friend[];
  attendedEvents: string[];
  sharedEvents: string[];
}
