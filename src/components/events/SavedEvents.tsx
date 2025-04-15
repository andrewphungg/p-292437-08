
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";

interface SavedEventsProps {
  savedEvents: Event[];
}

export function SavedEvents({ savedEvents: initialEvents }: SavedEventsProps) {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialEvents);
  const { toast } = useToast();
  
  const handleRemoveEvent = (id: string) => {
    setSavedEvents(savedEvents.filter(event => event.id !== id));
    
    toast({
      title: "Event removed",
      description: "Event has been removed from your saved list.",
      variant: "default",
    });
  };
  
  if (savedEvents.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 dark:text-gray-400">No saved events found.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Events you save will appear here.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {savedEvents.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          isSaved={true}
          onRemove={() => handleRemoveEvent(event.id)}
        />
      ))}
    </div>
  );
}
