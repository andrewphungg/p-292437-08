
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin, Users, Heart, Share2, ExternalLink, Check, Clock } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/event";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: events = [] } = useEvents();
  const [isAttending, setIsAttending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Find the event by id
  const event = events.find(e => e.id === id);

  // Find similar events (based on same category or shared tags)
  const similarEvents = events
    .filter(e => 
      e.id !== id && 
      (e.category === event?.category || 
       e.tags.some(tag => event?.tags.includes(tag)))
    )
    .slice(0, 3);
  
  // Also attended events (people who attended this event also attended these)
  const alsoAttendedEvents = events
    .filter(e => e.id !== id && e.attendees > 40)
    .slice(0, 2);
  
  // Mock attendees data
  const attendees = [
    { id: "u1", name: "Jamie Smith", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: "u2", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=33" },
    { id: "u3", name: "Sam Taylor", avatar: "https://i.pravatar.cc/150?img=34" },
    // More would be here in a real app
  ];
  
  const handleAttend = () => {
    setIsAttending(!isAttending);
    if (!isAttending) {
      toast.success("You're now attending this event!");
    } else {
      toast.info("You're no longer attending this event.");
    }
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSaved = !saved;
    setSaved(newSaved);
    
    if (newSaved && !hasAnimated) {
      // Show heart confetti only on first save
      setHasAnimated(true);
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        shapes: ['heart'],
        colors: ['#ff6b6b', '#ff8e8e', '#ffb3b3'],
      });
      
      toast.success("Event saved to your collection!");
    } else if (!newSaved) {
      toast.info("Event removed from your collection");
    }
  };
  
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
    <div className="sticky top-0 z-20 bg-white/80 dark:bg-background/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-medium truncate flex-1 text-center">Event Details</h1>
        <motion.button 
          onClick={handleSave}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300"
        >
          <Heart size={20} fill={saved ? "#ef4444" : "none"} stroke={saved ? "#ef4444" : "currentColor"} />
        </motion.button>
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
  
  // Format time from startTime and endTime if they exist
  const formattedTime = event.startTime ? 
    (event.endTime ? `${event.startTime} - ${event.endTime}` : event.startTime) : 
    "Time TBD";
  
  // Format price
  const formattedPrice = typeof event.price === 'object' ? 
    (event.price.isFree ? 
      "Free" : 
      `${event.price.currency}${event.price.min}${event.price.max ? ` - ${event.price.currency}${event.price.max}` : ""}`) :
    event.price;
  
  return (
    <AppLayout header={header}>
      <div className="pb-10">
        {/* Hero Image */}
        <motion.div 
          className="relative w-full h-64 overflow-hidden rounded-3xl mt-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.div>
        
        {/* Event Title & Basic Info */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
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
        </motion.div>
        
        {/* Tags */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Tag key={tag} variant="default">{tag}</Tag>
            ))}
            {event.mood && event.mood.map((mood) => (
              <Tag key={mood} variant="mood">{mood}</Tag>
            ))}
          </div>
        </motion.div>
        
        {/* Event Details */}
        <motion.div 
          className="bg-white/90 dark:bg-card/90 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-5 shadow-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-start">
            <Calendar size={22} className="shrink-0 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold dark:text-white">Date & Time</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{formattedDate}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
                <Clock size={14} className="mr-1.5 text-gray-400" /> 
                {formattedTime}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin size={22} className="shrink-0 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold dark:text-white">Location</h3>
              {typeof event.location === 'string' ? (
                <p className="text-gray-600 dark:text-gray-300 text-sm">{event.location}</p>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{event.location.name}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {event.location.address}, {event.location.city}
                  </p>
                </>
              )}
            </div>
          </div>
          
          {event.description && (
            <div className="flex items-start pt-2">
              <div className="w-full">
                <h3 className="font-semibold mb-3 dark:text-white text-lg border-b pb-2 border-gray-100 dark:border-gray-800">
                  About This Event
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          className="flex gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button 
            onClick={handleAttend}
            className={`flex-1 rounded-full py-6 ${isAttending ? 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}`}
          >
            {isAttending ? (
              <>
                <Check size={18} className="mr-2" /> Going
              </>
            ) : (
              <>
                <Calendar size={18} className="mr-2" /> Attend
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1 rounded-full py-6">
            <Share2 size={18} className="mr-2" /> Share
          </Button>
        </motion.div>
        
        {/* Attendees */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-3 dark:text-white">Who's Going</h2>
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
        </motion.div>
        
        {/* External Link */}
        {event.url && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Button variant="outline" asChild className="w-full rounded-full">
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Visit Official Page <ExternalLink size={16} className="ml-1.5" />
              </a>
            </Button>
          </motion.div>
        )}
        
        {/* People Also Attended */}
        {alsoAttendedEvents.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Separator className="mb-6 dark:bg-gray-800" />
            
            <h2 className="text-lg font-semibold mb-4 dark:text-white">People Who Attended Also Went To</h2>
            <div className="grid grid-cols-2 gap-4">
              {alsoAttendedEvents.map(event => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={`/event/${event.id}`}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-md transition-shadow block"
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
                        <span className="text-xs text-gray-500 dark:text-gray-400">{typeof event.date === 'string' ? event.date : new Date(event.date).toLocaleDateString()}</span>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          {typeof event.price === 'object' ? (event.price.isFree ? "Free" : `${event.price.currency}${event.price.min}+`) : event.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Separator className="mb-6 dark:bg-gray-800" />
            
            <h2 className="text-lg font-semibold mb-4 dark:text-white">You Might Also Like</h2>
            <div className="grid grid-cols-2 gap-4">
              {similarEvents.map(event => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={`/event/${event.id}`}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-md transition-shadow block"
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
                        <span className="text-xs text-gray-500 dark:text-gray-400">{typeof event.date === 'string' ? event.date : new Date(event.date).toLocaleDateString()}</span>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          {typeof event.price === 'object' ? (event.price.isFree ? "Free" : `${event.price.currency}${event.price.min}+`) : event.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
