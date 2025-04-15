
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  graduationYear: number;
  university: string;
  points: number;
  interests: string[];
  friends: {
    id: string;
    name: string;
    avatar: string;
    points: number;
    interests?: string[];
  }[];
  attendedEvents: string[];
  sharedEvents: string[];
}
