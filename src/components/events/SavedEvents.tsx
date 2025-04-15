
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface SavedEventsProps {
  savedEvents: Event[];
}

export function SavedEvents({ savedEvents: initialEvents }: SavedEventsProps) {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialEvents);
  
  const handleRemoveEvent = (id: string) => {
    setSavedEvents(savedEvents.filter(event => event.id !== id));
    
    toast("Event removed", {
      description: "Event has been removed from your saved list.",
      position: "top-center",
      action: {
        label: "Undo",
        onClick: () => setSavedEvents(prev => [...prev, initialEvents.find(e => e.id === id)!])
      }
    });
  };
  
  if (savedEvents.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 dark:text-gray-400">No saved events found.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Events you save will appear here.</p>
      </div>
    );
  }
  
  return (
    <div>
      <AnimatePresence>
        {savedEvents.map(event => (
          <motion.div
            key={event.id}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            layout
            transition={{ duration: 0.3, type: "spring" }}
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
