
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { ShareModal } from "@/components/events/ShareModal";
import { EventList } from "@/components/events/EventList";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  ExternalLink,
  ChevronLeft,
  Tag,
  Ticket,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { events, getEventById, addSavedEvent, removeSavedEvent, user } = useUser();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  
  // Get the current event
  const event = getEventById(id || "");
  
  useEffect(() => {
    if (event && user.savedEvents) {
      setIsSaved(user.savedEvents.includes(event.id));
    }
  }, [event, user.savedEvents]);
  
  useEffect(() => {
    if (event) {
      // Find similar events based on tags/categories
      const similar = events
        .filter(e => 
          e.id !== event.id && 
          e.tags.some(tag => event.tags.includes(tag))
        )
        .slice(0, 3);
      
      setSimilarEvents(similar);
    }
  }, [event, events]);
  
  if (!event) {
    return (
      <AppLayout>
        <div className="container max-w-4xl mx-auto py-6">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-2">Event not found</h1>
            <p className="mb-6">We couldn't find the event you're looking for.</p>
            <Button asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }
  
  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedEvent(event.id);
    } else {
      addSavedEvent(event.id);
    }
    setIsSaved(!isSaved);
  };
  
  const handleShare = () => {
    setIsShareModalOpen(true);
  };
  
  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Back button */}
        <div className="mb-4">
          <Button variant="ghost" asChild className="pl-1 hover:bg-transparent">
            <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft size={16} className="mr-1" />
              Back to events
            </Link>
          </Button>
        </div>
        
        {/* Event header with image */}
        <div className="relative rounded-3xl overflow-hidden mb-6">
          {event.image && (
            <div className="relative h-60 md:h-80 bg-gradient-to-b from-gray-900/70 to-gray-900/30">
              <img 
                src={event.image} 
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-[0]"></div>
            </div>
          )}
          
          <div className="relative p-6 md:p-8 text-white z-[1] -mt-32 pt-20 pb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-white/90">
              {event.date && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1.5" />
                  <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                </div>
              )}
              
              {event.time && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-1.5" />
                  <span>{event.time}</span>
                </div>
              )}
              
              {event.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1.5" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Event details */}
        <div className="md:flex gap-6">
          <div className="flex-1 mb-6 md:mb-0">
            {/* Event description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-6 shadow-sm mb-6"
            >
              <h2 className="text-xl font-bold mb-4">Event Details</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p>{event.description}</p>
              </div>
            </motion.div>
            
            {/* Additional event info */}
            {event.additionalInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-3xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p>{event.additionalInfo}</p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sidebar with actions */}
          <div className="w-full md:w-64">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-6 shadow-sm mb-6"
            >
              <div className="space-y-4">
                {/* Price info */}
                {event.price && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-1">Price</h3>
                    <p className="text-xl font-bold">{event.price}</p>
                  </div>
                )}
                
                {/* Points info */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">Earn Points</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">+{event.pointsForAttending} for attending</Badge>
                    <Badge className="bg-blue-500 hover:bg-blue-600">+{event.pointsForSharing} for sharing</Badge>
                  </div>
                </div>
                
                {/* Ticket link */}
                {event.url && (
                  <Button className="w-full mb-3" asChild>
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      <Ticket size={16} className="mr-2" />
                      Get Tickets
                    </a>
                  </Button>
                )}
                
                {/* Save button */}
                <Button 
                  variant={isSaved ? "outline" : "secondary"} 
                  className="w-full mb-3"
                  onClick={handleToggleSave}
                >
                  <Heart size={16} className={`mr-2 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  {isSaved ? "Saved" : "Save Event"}
                </Button>
                
                {/* Share button */}
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Share2 size={16} className="mr-2" />
                  Share with Friends
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Similar events */}
        {similarEvents.length > 0 && (
          <div className="mt-12">
            <EventList 
              events={similarEvents} 
              title="You might also like" 
              subtitle="Similar events happening soon" 
              variant="grid" 
            />
          </div>
        )}
      </div>
      
      {/* Share modal */}
      {event && ( // Only pass the event object when it exists
        <ShareModal 
          event={event} 
          open={isShareModalOpen} 
          onClose={() => setIsShareModalOpen(false)} 
        />
      )}
    </AppLayout>
  );
}
