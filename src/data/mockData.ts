
import { Event } from "@/types/event";
import { User } from "@/types/user";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
  email: "alex.johnson@example.com",
  graduationYear: 2025,
  university: "Stanford University",
  points: 2750,
  interests: ["Music", "Tech", "Sports", "Food"],
  friends: [
    {
      id: "user-2",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      points: 1800,
      interests: ["Music", "Photography", "Travel"]
    },
    {
      id: "user-3",
      name: "Taylor Wong",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      points: 2200,
      interests: ["Sports", "Food", "Movies"]
    }
  ],
  attendedEvents: ["event-1", "event-3"],
  sharedEvents: ["event-2", "event-5"],
  savedEvents: ["event-1", "event-3", "event-5"],
  joinedAt: new Date("2023-09-01")
};

// We'll use the Ticketmaster API instead of mock events
export const mockEvents: Event[] = [];

// Add the missing functions that are being imported
export const getAllFriends = (): User[] => {
  // Return a list of mock friends including the current user
  return [
    currentUser,
    {
      id: "user-2",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      email: "jordan.lee@example.com",
      graduationYear: 2024,
      university: "UCLA",
      points: 1800,
      interests: ["Music", "Photography", "Travel"],
      friends: [],
      attendedEvents: [],
      sharedEvents: [],
      savedEvents: [],
    },
    {
      id: "user-3",
      name: "Taylor Wong",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      email: "taylor.wong@example.com",
      graduationYear: 2023,
      university: "Berkeley",
      points: 2200,
      interests: ["Sports", "Food", "Movies"],
      friends: [],
      attendedEvents: [],
      sharedEvents: [],
      savedEvents: [],
    },
    {
      id: "user-4",
      name: "Sam Rivera",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      email: "sam.rivera@example.com",
      graduationYear: 2025,
      university: "Stanford University",
      points: 1950,
      interests: ["Tech", "Gaming", "Art"],
      friends: [],
      attendedEvents: [],
      sharedEvents: [],
      savedEvents: [],
    },
  ];
};

export const getFriendLeaderboard = (): User[] => {
  // Return a sorted list of friends by points
  const allFriends = getAllFriends();
  return [...allFriends].sort((a, b) => b.points - a.points);
};
