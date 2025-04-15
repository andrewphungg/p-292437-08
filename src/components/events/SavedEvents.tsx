
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

interface SavedEventsProps {
  savedEvents: Event[];
}

export function SavedEvents({ savedEvents: initialEvents }: SavedEventsProps) {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialEvents);
  const [lastRemovedEvent, setLastRemovedEvent] = useState<Event | null>(null);
  
  const handleRemoveEvent = (id: string) => {
    const eventToRemove = savedEvents.find(event => event.id === id);
    if (eventToRemove) {
      setLastRemovedEvent(eventToRemove);
    }
    
    setSavedEvents(savedEvents.filter(event => event.id !== id));
    
    toast(
      <div className="undo-toast">
        <span>Event removed from saved</span>
        <button
          className="undo-toast-button"
          onClick={() => {
            if (eventToRemove) {
              setSavedEvents(prev => [...prev, eventToRemove]);
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
  
  if (savedEvents.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground mb-2">No saved events found.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">Events you save will appear here.</p>
        <Button 
          variant="outline" 
          className="mt-6 rounded-full shadow-sm"
          onClick={() => window.location.href = '/'}
        >
          Browse Events
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {savedEvents.map(event => (
        <div 
          key={event.id}
          className="transition-all duration-300"
        >
          <EventCard 
            event={event} 
            isSaved={true}
            onRemove={() => handleRemoveEvent(event.id)}
          />
        </div>
      ))}
    </div>
  );
}
