import { User, Friend } from "../types/user";
import { Event } from "../types/event";

export const currentUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?auto=format&fit=crop&w=100&q=80",
  email: "alex@example.com",
  graduationYear: 2023,
  university: "Stanford University",
  points: 450,
  interests: ["Music", "Fun", "Networking", "Tech"],
  friends: [
    {
      id: "user-2",
      name: "Taylor Swift",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      points: 780,
      interests: ["Music", "Fun", "Concerts"]
    },
    {
      id: "user-3",
      name: "Jordan Lee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      points: 320,
      interests: ["Bars", "Drinks", "Random"]
    },
    {
      id: "user-4",
      name: "Casey Kim",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      points: 600,
      interests: ["Tech", "Networking", "Career"]
    }
  ],
  attendedEvents: ["event-1", "event-3"],
  sharedEvents: ["event-1"],
};

export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Sullivan King",
    description: "Sullivan King live in concert",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-15",
    startTime: "20:00",
    location: {
      name: "Bill Graham, SF",
      address: "99 Grove St",
      city: "San Francisco"
    },
    price: {
      min: 70,
      currency: "$",
      isFree: false
    },
    category: "Music",
    tags: ["Music", "Fun", "Concerts"],
    mood: ["Energetic", "Loud"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 45,
    source: "ticketmaster",
    url: "https://example.com/event1",
    pointsForAttending: 100,
    pointsForSharing: 50
  },
  {
    id: "event-2",
    title: "Stanford + Princeton + Yale Mixer for Singles",
    description: "Meet fellow alumni from top universities",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-15",
    startTime: "19:00",
    location: {
      name: "San Francisco",
      address: "123 Main St",
      city: "San Francisco"
    },
    price: {
      min: 25,
      currency: "$",
      isFree: false
    },
    category: "Social",
    tags: ["Music", "Fun", "Random"],
    mood: ["Social", "Networking"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 78,
    source: "internal",
    url: "https://example.com/event2",
    pointsForAttending: 80,
    pointsForSharing: 40
  },
  {
    id: "event-3",
    title: "San Francisco St. Patrick's Day",
    description: "Annual St. Patrick's Day celebration",
    image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-16",
    startTime: "12:00",
    location: {
      name: "San Francisco",
      address: "Union Square",
      city: "San Francisco"
    },
    price: {
      min: 25,
      currency: "$",
      isFree: false
    },
    category: "Festival",
    tags: ["Bars", "Drinks", "Friends"],
    mood: ["Festive", "Social"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 120,
    source: "internal",
    url: "https://example.com/event3",
    pointsForAttending: 75,
    pointsForSharing: 30
  },
  {
    id: "event-4",
    title: "New Grad Tech Networking",
    description: "Networking event for new grads in tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-19",
    startTime: "18:30",
    location: {
      name: "Palo Alto",
      address: "456 University Ave",
      city: "Palo Alto"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Networking",
    tags: ["Networking", "Tech", "Career"],
    mood: ["Professional", "Networking"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 35,
    source: "meetup",
    url: "https://example.com/event4",
    pointsForAttending: 150,
    pointsForSharing: 60
  },
  
  {
    id: "event-5",
    title: "Rooftop Jazz Night",
    description: "Enjoy jazz music on a rooftop lounge",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-21",
    startTime: "19:30",
    location: {
      name: "The View Lounge, SF",
      address: "780 Mission St",
      city: "San Francisco"
    },
    price: {
      min: 40,
      currency: "$",
      isFree: false
    },
    category: "Music",
    tags: ["Music", "Jazz", "Networking"],
    mood: ["Relaxed", "Sophisticated"],
    isTrending: false,
    isEditorsPick: true,
    attendees: 55,
    source: "eventbrite",
    url: "https://example.com/event5",
    pointsForAttending: 90,
    pointsForSharing: 45
  },
  {
    id: "event-6",
    title: "Bay Area Symphony Orchestra",
    description: "Enjoy a classical music concert",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23",
    startTime: "6:00",
    location: {
      name: "Davies Symphony Hall, SF",
      address: "123 Symphony St",
      city: "San Francisco"
    },
    price: {
      min: 60,
      currency: "$",
      isFree: false
    },
    category: "Music",
    tags: ["Music", "Classical", "Arts"],
    mood: ["Serene", "Artistic"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 62,
    source: "ticketmaster",
    url: "https://example.com/event6",
    pointsForAttending: 85,
    pointsForSharing: 40
  },
  {
    id: "event-7",
    title: "Indie Band Showcase",
    description: "Enjoy a concert featuring indie bands",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-22",
    startTime: "9:00",
    location: {
      name: "Bottom of the Hill, SF",
      address: "456 Hill St",
      city: "San Francisco"
    },
    price: {
      min: 20,
      currency: "$",
      isFree: false
    },
    category: "Music",
    tags: ["Music", "Indie", "Concerts"],
    mood: ["Energetic", "Live"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 75,
    source: "eventbrite",
    url: "https://example.com/event7",
    pointsForAttending: 70,
    pointsForSharing: 35
  },
  
  {
    id: "event-8",
    title: "Escape Room Challenge",
    description: "Enjoy a fun escape room challenge",
    image: "https://images.unsplash.com/photo-1569701813229-33284b643e3c?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-20",
    startTime: "19:00",
    location: {
      name: "Escape SF, Union Square",
      address: "780 Union St",
      city: "San Francisco"
    },
    price: {
      min: 35,
      currency: "$",
      isFree: false
    },
    category: "Fun",
    tags: ["Fun", "Games", "Group Activity"],
    mood: ["Engaging", "Social"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 30,
    source: "ticketmaster",
    url: "https://example.com/event8",
    pointsForAttending: 80,
    pointsForSharing: 35
  },
  {
    id: "event-9",
    title: "Beach Volleyball Tournament",
    description: "Enjoy a beach volleyball tournament",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-24",
    startTime: "11:00",
    location: {
      name: "Ocean Beach, SF",
      address: "123 Beach St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Fun",
    tags: ["Fun", "Sports", "Outdoors"],
    mood: ["Exciting", "Outdoor"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 48,
    source: "ticketmaster",
    url: "https://example.com/event9",
    pointsForAttending: 65,
    pointsForSharing: 30
  },
  {
    id: "event-10",
    title: "Comedy Night for Young Professionals",
    description: "Enjoy a comedy night for young professionals",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-21",
    startTime: "20:30",
    location: {
      name: "Punch Line Comedy Club, SF",
      address: "123 Comedy St",
      city: "San Francisco"
    },
    price: {
      min: 25,
      currency: "$",
      isFree: false
    },
    category: "Fun",
    tags: ["Fun", "Comedy", "Nightlife"],
    mood: ["Entertaining", "Social"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 65,
    source: "ticketmaster",
    url: "https://example.com/event10",
    pointsForAttending: 75,
    pointsForSharing: 35
  },
  
  {
    id: "event-11",
    title: "Women in Tech Mixer",
    description: "Enjoy a networking event for women in tech",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-18",
    startTime: "18:00",
    location: {
      name: "WeWork, Downtown SF",
      address: "123 WeWork St",
      city: "San Francisco"
    },
    price: {
      min: 10,
      currency: "$",
      isFree: false
    },
    category: "Networking",
    tags: ["Networking", "Tech", "Women"],
    mood: ["Professional", "Networking"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 42,
    source: "ticketmaster",
    url: "https://example.com/event11",
    pointsForAttending: 100,
    pointsForSharing: 50
  },
  {
    id: "event-12",
    title: "Startup Pitch Night",
    description: "Enjoy a startup pitch night",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-19",
    startTime: "19:00",
    location: {
      name: "Founders Space, SOMA",
      address: "123 SOMA St",
      city: "San Francisco"
    },
    price: {
      min: 15,
      currency: "$",
      isFree: false
    },
    category: "Networking",
    tags: ["Networking", "Startups", "Business"],
    mood: ["Professional", "Networking"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 85,
    source: "ticketmaster",
    url: "https://example.com/event12",
    pointsForAttending: 120,
    pointsForSharing: 60
  },
  {
    id: "event-13",
    title: "Alumni Happy Hour",
    description: "Enjoy an alumni happy hour",
    image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-22",
    startTime: "17:30",
    location: {
      name: "Hotel Vitale, SF",
      address: "123 Hotel St",
      city: "San Francisco"
    },
    price: {
      min: 20,
      currency: "$",
      isFree: false
    },
    category: "Social",
    tags: ["Networking", "Social", "Alumni"],
    mood: ["Professional", "Networking"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 60,
    source: "ticketmaster",
    url: "https://example.com/event13",
    pointsForAttending: 90,
    pointsForSharing: 45
  },
  
  {
    id: "event-14",
    title: "AI and Machine Learning Workshop",
    description: "Enjoy an AI and machine learning workshop",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23",
    startTime: "10:00",
    location: {
      name: "Google Campus, Mountain View",
      address: "123 Google St",
      city: "Mountain View"
    },
    price: {
      min: 50,
      currency: "$",
      isFree: false
    },
    category: "Tech",
    tags: ["Tech", "Workshop", "Career"],
    mood: ["Professional", "Learning"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 70,
    source: "ticketmaster",
    url: "https://example.com/event14",
    pointsForAttending: 130,
    pointsForSharing: 65
  },
  {
    id: "event-15",
    title: "Full Stack Developer Hackathon",
    description: "Enjoy a full stack developer hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23-24",
    startTime: "9:00",
    location: {
      name: "GitHub HQ, SF",
      address: "123 GitHub St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Tech",
    tags: ["Tech", "Hackathon", "Coding"],
    mood: ["Professional", "Learning"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 120,
    source: "ticketmaster",
    url: "https://example.com/event15",
    pointsForAttending: 200,
    pointsForSharing: 80
  },
  {
    id: "event-16",
    title: "UX/UI Design Trends Seminar",
    description: "Enjoy a UX/UI design trends seminar",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-21",
    startTime: "17:00",
    location: {
      name: "Adobe HQ, SF",
      address: "123 Adobe St",
      city: "San Francisco"
    },
    price: {
      min: 25,
      currency: "$",
      isFree: false
    },
    category: "Tech",
    tags: ["Tech", "Design", "Career"],
    mood: ["Professional", "Learning"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 45,
    source: "ticketmaster",
    url: "https://example.com/event16",
    pointsForAttending: 90,
    pointsForSharing: 40
  },
  
  {
    id: "event-17",
    title: "Craft Beer Festival",
    description: "Enjoy a craft beer festival",
    image: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23",
    startTime: "14:00",
    location: {
      name: "Fort Mason, SF",
      address: "123 Fort Mason St",
      city: "San Francisco"
    },
    price: {
      min: 45,
      currency: "$",
      isFree: false
    },
    category: "Bars",
    tags: ["Bars", "Drinks", "Festival"],
    mood: ["Festive", "Social"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 200,
    source: "ticketmaster",
    url: "https://example.com/event17",
    pointsForAttending: 85,
    pointsForSharing: 40
  },
  {
    id: "event-18",
    title: "Wine Tasting Tour",
    description: "Enjoy a wine tasting tour",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-24",
    startTime: "12:00",
    location: {
      name: "Napa Valley",
      address: "123 Napa Valley St",
      city: "Napa Valley"
    },
    price: {
      min: 90,
      currency: "$",
      isFree: false
    },
    category: "Drinks",
    tags: ["Drinks", "Wine", "Tour"],
    mood: ["Relaxed", "Artistic"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 35,
    source: "ticketmaster",
    url: "https://example.com/event18",
    pointsForAttending: 110,
    pointsForSharing: 50
  },
  {
    id: "event-19",
    title: "Mixology Class: Craft Cocktails",
    description: "Enjoy a mixology class for craft cocktails",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-20",
    startTime: "18:00",
    location: {
      name: "Bourbon & Branch, SF",
      address: "123 Bourbon & Branch St",
      city: "San Francisco"
    },
    price: {
      min: 60,
      currency: "$",
      isFree: false
    },
    category: "Drinks",
    tags: ["Drinks", "Class", "Social"],
    mood: ["Relaxed", "Social"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 25,
    source: "ticketmaster",
    url: "https://example.com/event19",
    pointsForAttending: 95,
    pointsForSharing: 45
  },
  
  {
    id: "event-20",
    title: "Sunset Silent Disco",
    description: "Enjoy a sunset silent disco",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23",
    startTime: "19:30",
    location: {
      name: "Dolores Park, SF",
      address: "123 Dolores Park St",
      city: "San Francisco"
    },
    price: {
      min: 15,
      currency: "$",
      isFree: false
    },
    category: "Random",
    tags: ["Random", "Music", "Outdoors"],
    mood: ["Relaxed", "Outdoor"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 110,
    source: "ticketmaster",
    url: "https://example.com/event20",
    pointsForAttending: 70,
    pointsForSharing: 35
  },
  {
    id: "event-21",
    title: "Midnight Mystery Bike Tour",
    description: "Enjoy a midnight mystery bike tour",
    image: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-22",
    startTime: "23:00",
    location: {
      name: "Meet at Ferry Building, SF",
      address: "123 Ferry Building St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Random",
    tags: ["Random", "Adventure", "Nightlife"],
    mood: ["Exciting", "Nightlife"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 40,
    source: "ticketmaster",
    url: "https://example.com/event21",
    pointsForAttending: 100,
    pointsForSharing: 50
  },
  {
    id: "event-22",
    title: "Urban Treasure Hunt",
    description: "Enjoy an urban treasure hunt",
    image: "https://images.unsplash.com/photo-1569399078436-da10fbd60f12?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-24",
    startTime: "13:00",
    location: {
      name: "Union Square, SF",
      address: "123 Union Square St",
      city: "San Francisco"
    },
    price: {
      min: 30,
      currency: "$",
      isFree: false
    },
    category: "Random",
    tags: ["Random", "Games", "Outdoors"],
    mood: ["Exciting", "Outdoor"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 50,
    source: "ticketmaster",
    url: "https://example.com/event22",
    pointsForAttending: 85,
    pointsForSharing: 40
  },
  
  {
    id: "event-23",
    title: "Local Indie Bands Night",
    description: "Enjoy a local indie bands night",
    image: "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-21",
    startTime: "20:00",
    location: {
      name: "The Independent, SF",
      address: "123 Independent St",
      city: "San Francisco"
    },
    price: {
      min: 25,
      currency: "$",
      isFree: false
    },
    category: "Concerts",
    tags: ["Concerts", "Music", "Indie"],
    mood: ["Energetic", "Live"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 80,
    source: "ticketmaster",
    url: "https://example.com/event23",
    pointsForAttending: 80,
    pointsForSharing: 40
  },
  {
    id: "event-24",
    title: "Classical String Quartet",
    description: "Enjoy a classical string quartet",
    image: "https://images.unsplash.com/photo-1514913274516-4aa04f176f8c?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-18",
    startTime: "18:00",
    location: {
      name: "Herbst Theatre, SF",
      address: "123 Herbst Theatre St",
      city: "San Francisco"
    },
    price: {
      min: 35,
      currency: "$",
      isFree: false
    },
    category: "Concerts",
    tags: ["Concerts", "Classical", "Arts"],
    mood: ["Serene", "Artistic"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 45,
    source: "ticketmaster",
    url: "https://example.com/event24",
    pointsForAttending: 75,
    pointsForSharing: 35
  },
  {
    id: "event-25",
    title: "EDM Night: DJ Showcase",
    description: "Enjoy an EDM night with a DJ showcase",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-23",
    startTime: "21:30",
    location: {
      name: "1015 Folsom, SF",
      address: "123 Folsom St",
      city: "San Francisco"
    },
    price: {
      min: 40,
      currency: "$",
      isFree: false
    },
    category: "Concerts",
    tags: ["Concerts", "EDM", "Nightlife"],
    mood: ["Energetic", "Live"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 150,
    source: "ticketmaster",
    url: "https://example.com/event25",
    pointsForAttending: 90,
    pointsForSharing: 45
  },
  
  {
    id: "event-26",
    title: "Resume Workshop for New Grads",
    description: "Enjoy a resume workshop for new grads",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-19",
    startTime: "14:00",
    location: {
      name: "SF Public Library",
      address: "123 Public Library St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Career",
    tags: ["Career", "Workshop", "Education"],
    mood: ["Professional", "Learning"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 30,
    source: "ticketmaster",
    url: "https://example.com/event26",
    pointsForAttending: 100,
    pointsForSharing: 50
  },
  {
    id: "event-27",
    title: "Tech Industry Job Fair",
    description: "Enjoy a tech industry job fair",
    image: "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-21",
    startTime: "10:00",
    location: {
      name: "Moscone Center, SF",
      address: "123 Moscone Center St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Career",
    tags: ["Career", "Job Fair", "Networking"],
    mood: ["Professional", "Networking"],
    isTrending: true,
    isEditorsPick: false,
    attendees: 250,
    source: "ticketmaster",
    url: "https://example.com/event27",
    pointsForAttending: 150,
    pointsForSharing: 70
  },
  {
    id: "event-28",
    title: "Finance Career Panel",
    description: "Enjoy a finance career panel",
    image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-20",
    startTime: "18:00",
    location: {
      name: "Wells Fargo HQ, SF",
      address: "123 Wells Fargo St",
      city: "San Francisco"
    },
    price: {
      min: 0,
      currency: "$",
      isFree: true
    },
    category: "Career",
    tags: ["Career", "Finance", "Panel"],
    mood: ["Professional", "Learning"],
    isTrending: false,
    isEditorsPick: false,
    attendees: 65,
    source: "ticketmaster",
    url: "https://example.com/event28",
    pointsForAttending: 120,
    pointsForSharing: 55
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
      interests: ["Music", "Concerts", "Art", "Fashion"],
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
      interests: ["Sports", "Bars", "Drinks", "Gaming"],
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
      interests: ["Tech", "Networking", "Career", "Books"],
      friends: [],
      attendedEvents: ["event-1", "event-4"],
      sharedEvents: ["event-1", "event-4"],
    },
    {
      id: "user-5",
      name: "Morgan Rivera",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      email: "morgan@example.com",
      graduationYear: 2023,
      university: "UC Berkeley",
      points: 420,
      interests: ["Tech", "Gaming", "Movies", "Networking"],
      friends: [],
      attendedEvents: ["event-4"],
      sharedEvents: [],
    },
    {
      id: "user-6",
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      email: "jamie@example.com",
      graduationYear: 2023,
      university: "MIT",
      points: 550,
      interests: ["Music", "Tech", "Photography", "Travel"],
      friends: [],
      attendedEvents: ["event-1", "event-4"],
      sharedEvents: ["event-4"],
    }
  ];
};

export const getFriendLeaderboard = () => {
  return getAllFriends().sort((a, b) => b.points - a.points);
};
