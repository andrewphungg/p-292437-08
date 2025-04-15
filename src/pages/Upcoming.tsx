
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EventList } from "@/components/events/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEvents } from "@/hooks/useEvents";
import { FilterOptions } from "@/components/events/FilterMenu";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Upcoming() {
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  
  // Get events data
  const { data: allEvents = [], isLoading } = useEvents(filters);
  
  // Mock user's upcoming events (In a real app, these would come from the user profile)
  const upcomingEvents = allEvents.slice(0, 3);
  const pastEvents = allEvents.slice(3, 6);
  
  const header = (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="text-center py-6">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-sunset-orange via-sunset-yellow to-sunset-peach bg-clip-text text-transparent pb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Joople
        </motion.h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your Upcoming Events
        </p>
      </div>
      
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 pb-4">
        <Button variant="ghost" className="text-sunset-orange flex items-center gap-2">
          <Calendar size={18} />
          <span>Sync Calendar</span>
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
    </AppLayout>
  );
}
