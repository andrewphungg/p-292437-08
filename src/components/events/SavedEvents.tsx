
import React, { useState } from "react";
import { EventCard } from "./EventCard";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";

interface SavedEventsProps {
  savedEvents: Event[];
}

interface RemovedEvent {
  event: Event;
  index: number;
}

export function SavedEvents({ savedEvents: initialEvents }: SavedEventsProps) {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialEvents);
  const [lastRemovedEvent, setLastRemovedEvent] = useState<RemovedEvent | null>(null);
  const [undoToastId, setUndoToastId] = useState<string | null>(null);
  
  const handleRemoveEvent = (id: string) => {
    const eventIndex = savedEvents.findIndex(event => event.id === id);
    const eventToRemove = savedEvents[eventIndex];
    
    if (eventToRemove) {
      setLastRemovedEvent({
        event: eventToRemove,
        index: eventIndex
      });
      
      // Remove event from list
      setSavedEvents(prev => prev.filter(event => event.id !== id));
      
      // Dismiss any existing toast to prevent duplicates
      if (undoToastId) {
        toast.dismiss(undoToastId);
      }
      
      // Show toast with undo button
      const toastId = toast(
        <div className="flex justify-between w-full items-center">
          <span>Event removed from saved</span>
          <button
            className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm flex items-center transition-colors"
            onClick={() => handleUndo()}
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
      
      setUndoToastId(toastId);
    }
  };
  
  const handleUndo = () => {
    // If we have a removed event, restore it at its previous position
    if (lastRemovedEvent) {
      const { event, index } = lastRemovedEvent;
      
      // Insert back at original position if possible
      const newEvents = [...savedEvents];
      newEvents.splice(
        Math.min(index, savedEvents.length), 
        0, 
        event
      );
      
      setSavedEvents(newEvents);
      setLastRemovedEvent(null);
      
      // Dismiss toast
      if (undoToastId) {
        toast.dismiss(undoToastId);
        setUndoToastId(null);
      }
    }
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
