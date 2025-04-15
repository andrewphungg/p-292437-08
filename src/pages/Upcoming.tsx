
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EventList } from "@/components/events/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { FilterOptions } from "@/components/events/FilterMenu";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check } from "lucide-react";

export default function Upcoming() {
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);
  
  // Get events data
  const { data: allEvents = [], isLoading } = useEvents(filters);
  
  // Mock user's upcoming events (In a real app, these would come from the user profile)
  const upcomingEvents = allEvents.slice(0, 3);
  const pastEvents = allEvents.slice(3, 6);
  
  // Calendar sync functionality
  const availableCalendars = [
    { id: "google", name: "Google Calendar", icon: "🗓️" },
    { id: "outlook", name: "Microsoft Outlook", icon: "📅" },
    { id: "apple", name: "Apple Calendar", icon: "📆" },
  ];
  
  const toggleCalendarSelection = (calendarId: string) => {
    setSelectedCalendars(prev => 
      prev.includes(calendarId) 
        ? prev.filter(id => id !== calendarId) 
        : [...prev, calendarId]
    );
  };
  
  const handleCalendarSync = () => {
    setCalendarSyncEnabled(true);
    setCalendarDialogOpen(false);
  };
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="text-center py-6">
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-sunset-orange via-sunset-yellow to-sunset-peach bg-clip-text text-transparent pb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Joople
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your Upcoming Events
        </p>
      </div>
      
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 pb-4">
        <Button 
          variant="ghost" 
          className="text-sunset-orange flex items-center gap-2"
          onClick={() => setCalendarDialogOpen(true)}
        >
          <Calendar size={18} />
          <span>{calendarSyncEnabled ? "Calendar Synced" : "Sync Calendar"}</span>
          {calendarSyncEnabled && <Check size={14} className="text-green-500" />}
        </Button>
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header}>
      <div className="py-6 space-y-8">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 rounded-xl">
            <TabsTrigger value="upcoming" className="rounded-xl">
              <Calendar size={16} className="mr-1.5" /> Upcoming
            </TabsTrigger>
            <TabsTrigger value="attending" className="rounded-xl">
              <CheckCircle size={16} className="mr-1.5" /> Attending
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-xl">
              <Clock size={16} className="mr-1.5" /> Past
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <EventList 
              events={upcomingEvents} 
              loading={isLoading}
              title="Your Upcoming Events"
              subtitle="Events you have saved or are interested in"
              emptyMessage="No upcoming events. Explore and save some events you're interested in!"
            />
          </TabsContent>
          
          <TabsContent value="attending">
            <EventList 
              events={upcomingEvents.slice(0, 2)} 
              loading={isLoading}
              title="Events You're Attending"
              subtitle="You've confirmed attendance for these events"
              emptyMessage="You haven't confirmed attendance for any upcoming events yet."
            />
          </TabsContent>
          
          <TabsContent value="past">
            <EventList 
              events={pastEvents} 
              loading={isLoading}
              title="Past Events"
              subtitle="Events you've attended"
              emptyMessage="No past events found."
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Calendar Sync Dialog */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Connect Your Calendars</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sync your events with your favorite calendar apps to never miss an event.
            </p>
            
            <div className="space-y-3">
              {availableCalendars.map(calendar => (
                <div 
                  key={calendar.id}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                    selectedCalendars.includes(calendar.id)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => toggleCalendarSelection(calendar.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{calendar.icon}</div>
                    <div className="font-medium">{calendar.name}</div>
                  </div>
                  
                  {selectedCalendars.includes(calendar.id) && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl"
              onClick={() => setCalendarDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 rounded-xl"
              onClick={handleCalendarSync}
              disabled={selectedCalendars.length === 0}
            >
              Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
