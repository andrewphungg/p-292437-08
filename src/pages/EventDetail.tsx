
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Share2, 
  ExternalLink, 
  Check,
  RefreshCcw
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Event } from "@/types/event";
import { toast } from "sonner";
import { HeartConfetti } from "@/components/animations/HeartConfetti";
import { motion, AnimatePresence } from "framer-motion";
import { useTicketmasterEvents } from "@/hooks/useTicketmasterEvents";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { savedEvents, addSavedEvent, removeSavedEvent } = useUser();
  const [isAttending, setIsAttending] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  
  // Get events from Ticketmaster
  const { data: allEvents = [], isLoading } = useTicketmasterEvents();
  
  // Find the event and similar events
  useEffect(() => {
    if (id && allEvents.length > 0) {
      const currentEvent = allEvents.find(e => String(e.id) === id);
      setEvent(currentEvent);
      
      if (currentEvent) {
        // Find similar events (based on same category or shared tags)
        const similar = allEvents
          .filter(e => 
            String(e.id) !== id && 
            (e.category === currentEvent.category || 
             e.tags.some(tag => currentEvent.tags.includes(tag)))
          )
          .slice(0, 3);
        
        setSimilarEvents(similar);
      }
      
      // Check if event is already saved
      if (savedEvents && savedEvents.includes(id)) {
        setIsSaved(true);
      }
    }
  }, [id, allEvents, savedEvents]);
  
  // Mock attendees data
  const attendees = [
    { id: "u1", name: "Jamie Smith", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: "u2", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=33" },
    { id: "u3", name: "Sam Taylor", avatar: "https://i.pravatar.cc/150?img=34" },
  ];
  
  const handleAttend = () => {
    setIsAttending(!isAttending);
    
    toast(
      <div className="flex justify-between w-full items-center">
        <span>{isAttending ? "You're no longer attending this event" : "You're now attending this event!"}</span>
        <button
          className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm flex items-center transition-colors"
          onClick={() => {
            setIsAttending(!isAttending);
          }}
        >
          <span className="flex items-center">
            <RefreshCcw size={14} className="mr-1" />
            Undo
          </span>
        </button>
      </div>,
      {
        position: "bottom-center",
        duration: 3000,
      }
    );
  };
  
  const handleSave = () => {
    if (!event || !id) return;
    
    const wasSaved = isSaved;
    setIsSaved(!wasSaved);
    
    if (!wasSaved) {
      addSavedEvent(id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 600);
    } else {
      removeSavedEvent(id);
    }
    
    toast(
      <div className="flex justify-between w-full items-center">
        <span>{wasSaved ? "Event removed from saved" : "Event saved!"}</span>
        <button
          className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm flex items-center transition-colors"
          onClick={() => {
            setIsSaved(wasSaved);
            if (wasSaved) {
              addSavedEvent(id);
            } else {
              removeSavedEvent(id);
            }
          }}
        >
          <span className="flex items-center">
            <RefreshCcw size={14} className="mr-1" />
            Undo
          </span>
        </button>
      </div>,
      {
        position: "bottom-center",
        duration: 3000,
      }
    );
  };
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (!event) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Event not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const header = (
    <div className="sticky top-0 z-20 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-medium truncate flex-1 text-center">Event Details</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>
    </div>
  );
  
  // Format date properly
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Format time - safely handle different structures
  const formattedTime = event.startTime 
    ? `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}` 
    : (event.time || "Time not specified");
  
  // Format price - safely handle different structures
  const formattedPrice = event.price 
    ? (typeof event.price === 'string' 
      ? event.price 
      : (event.price.isFree 
        ? "Free" 
        : `${event.price.currency || '$'}${event.price.min}${event.price.max ? ` - ${event.price.currency || '$'}${event.price.max}` : ""}`))
    : "Price not available";
  
  // Format location
  const locationName = typeof event.location === 'object' ? event.location.name : String(event.location);
  const locationAddress = typeof event.location === 'object' ? event.location.address : '';
  const locationCity = typeof event.location === 'object' ? event.location.city : '';
  
  return (
    <AppLayout header={header}>
      <div className="pb-10 relative">
        <AnimatePresence>{showConfetti && <HeartConfetti />}</AnimatePresence>
        
        {/* Hero Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-3xl mt-4 mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.isTrending && (
            <div className="absolute top-4 left-4">
              <Tag variant="trending">Trending</Tag>
            </div>
          )}
        </div>
        
        {/* Event Title & Basic Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{event.title}</h1>
          
          <div className="flex items-center flex-wrap gap-y-2">
            <Badge variant="outline" className="mr-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full">
              {event.category || event.tags[0]}
            </Badge>
            <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center mr-3">
              <Users size={16} className="mr-1 text-blue-600 dark:text-blue-400" />
              {event.attendees} attending
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {formattedPrice}
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Tag key={tag} variant="default">{tag}</Tag>
            ))}
            {event.mood && event.mood.map((mood) => (
              <Tag key={mood} variant="mood">{mood}</Tag>
            ))}
          </div>
        </div>
        
        {/* Event Details */}
        <div className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-4 space-y-5 shadow-sm mb-6">
          <div className="flex items-start">
            <Calendar size={20} className="shrink-0 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold dark:text-white">Date & Time</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{formattedDate}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{formattedTime}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin size={20} className="shrink-0 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold dark:text-white">Location</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{locationName}</p>
              {locationAddress && locationCity && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {locationAddress}, {locationCity}
                </p>
              )}
            </div>
          </div>
          
          {event.description && (
            <div className="flex items-start pt-2">
              <div className="w-full">
                <h3 className="font-semibold mb-2 dark:text-white text-lg border-b pb-1 border-gray-100 dark:border-gray-800">About this event</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{event.description}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Button 
            onClick={handleAttend}
            className={`flex-1 rounded-full ${isAttending ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}`}
          >
            {isAttending ? (
              <>
                <Check size={18} className="mr-1" /> Going
              </>
            ) : (
              <>
                <Calendar size={18} className="mr-1" /> Attend
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1 rounded-full">
            <Share2 size={18} className="mr-1" /> Share
          </Button>
          
          <motion.div whileTap={{ scale: 1.2 }}>
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full ${isSaved ? 'text-red-500 border-red-200 dark:border-red-800' : ''}`}
              onClick={handleSave}
            >
              <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
            </Button>
          </motion.div>
        </div>
        
        {/* Attendees */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 dark:text-white">Who's going</h2>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {attendees.slice(0, 3).map((attendee) => (
                <Avatar key={attendee.id} className="border-2 border-white dark:border-gray-800 w-8 h-8">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {event.attendees > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                  +{event.attendees - 3}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isAttending ? "You and " : ""}{event.attendees} {event.attendees === 1 ? "person" : "people"} attending
            </span>
          </div>
        </div>
        
        {/* External Link */}
        {event.url && (
          <div className="mb-8">
            <Button variant="outline" asChild className="w-full rounded-full">
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Get Tickets <ExternalLink size={16} className="ml-1.5" />
              </a>
            </Button>
          </div>
        )}
        
        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div>
            <Separator className="mb-6 dark:bg-gray-800" />
            
            <h2 className="text-lg font-semibold mb-4 dark:text-white">You might also like</h2>
            <div className="grid grid-cols-2 gap-4">
              {similarEvents.map(event => (
                <Link 
                  key={event.id} 
                  to={`/event/${event.id}`}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 dark:text-gray-100">{event.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">
                        {typeof event.price === 'string' ? event.price : 
                          (event.price.isFree ? "Free" : `${event.price.currency}${event.price.min}+`)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
