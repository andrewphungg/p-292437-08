
import { User } from "../types/user";
import { Event } from "../types/event";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?auto=format&fit=crop&w=100&q=80",
  email: "alex@example.com",
  graduationYear: 2023,
  university: "Stanford University",
  points: 450,
  friends: [
    {
      id: "user-2",
      name: "Taylor Swift",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      points: 780,
    },
    {
      id: "user-3",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      points: 320,
    },
    {
      id: "user-4",
      name: "Casey Kim",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      points: 600,
    }
  ],
  attendedEvents: ["event-1", "event-3"],
  sharedEvents: ["event-1"],
};

export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Sullivan King",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    day: "Friday",
    date: "Mar 15",
    time: "8:00 PM",
    location: "Bill Graham, SF",
    price: "~$70",
    tags: ["Music", "Fun", "Concerts"],
    isTrending: true,
    attendees: 45,
    pointsForAttending: 100,
    pointsForSharing: 50
  },
  {
    id: "event-2",
    title: "Stanford + Princeton + Yale Mixer for Singles",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=800&q=80",
    day: "Friday",
    date: "Mar 15",
    time: "7:00 PM",
    location: "San Francisco",
    price: "~$25",
    tags: ["Music", "Fun", "Random"],
    isTrending: true,
    attendees: 78,
    pointsForAttending: 80,
    pointsForSharing: 40
  },
  {
    id: "event-3",
    title: "San Francisco St. Patrick's Day",
    image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=800&q=80",
    day: "Saturday",
    date: "Mar 16",
    time: "12:00 PM",
    location: "San Francisco",
    price: "~$25",
    tags: ["Bars", "Drinks", "Friends"],
    isTrending: true,
    attendees: 120,
    pointsForAttending: 75,
    pointsForSharing: 30
  },
  {
    id: "event-4",
    title: "New Grad Tech Networking",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    day: "Tuesday",
    date: "Mar 19",
    time: "6:30 PM",
    location: "Palo Alto",
    price: "Free",
    tags: ["Networking", "Tech", "Career"],
    isTrending: false,
    attendees: 35,
    pointsForAttending: 150,
    pointsForSharing: 60
  }
];

export const getAllFriends = (): User[] => {
  return [
    currentUser,
    {
      id: "user-2",
      name: "Taylor Swift",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      email: "taylor@example.com",
      graduationYear: 2023,
      university: "Princeton University",
      points: 780,
      friends: [],
      attendedEvents: ["event-1", "event-2", "event-3"],
      sharedEvents: ["event-1", "event-2"],
    },
    {
      id: "user-3",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      email: "jordan@example.com",
      graduationYear: 2023,
      university: "Yale University",
      points: 320,
      friends: [],
      attendedEvents: ["event-2"],
      sharedEvents: ["event-2"],
    },
    {
      id: "user-4",
      name: "Casey Kim",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      email: "casey@example.com",
      graduationYear: 2022,
      university: "Harvard University",
      points: 600,
      friends: [],
      attendedEvents: ["event-1", "event-4"],
      sharedEvents: ["event-1", "event-4"],
    }
  ];
};

export const getFriendLeaderboard = () => {
  return getAllFriends().sort((a, b) => b.points - a.points);
};
