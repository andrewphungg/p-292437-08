
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SavedEventsProps {
  savedEvents: Event[];
}

export function SavedEvents({ savedEvents: initialEvents }: SavedEventsProps) {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialEvents);
  const { toast } = useToast();
  
  const handleRemoveEvent = (id: string) => {
    setSavedEvents(savedEvents.filter(event => event.id !== id));
    
    toast({
      title: "Event Removed",
      description: "Event has been removed from your saved list.",
      variant: "default",
      className: "top-center-toast",
    });
  };
  
  if (savedEvents.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="py-10 text-center"
      >
        <p className="text-muted-foreground mb-2">No saved events found.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Events you save will appear here.</p>
        <Button 
          variant="outline" 
          className="mt-6 rounded-full shadow-sm"
          onClick={() => window.location.href = '/'}
        >
          Browse Events
        </Button>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {savedEvents.map(event => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EventCard 
              event={event} 
              isSaved={true}
              onRemove={() => handleRemoveEvent(event.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
