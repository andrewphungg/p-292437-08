
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
  joinedAt?: Date;
}

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  interests?: string[];
};
