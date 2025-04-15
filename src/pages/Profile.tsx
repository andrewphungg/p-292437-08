
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavedEvents } from "@/components/events/SavedEvents";
import { useUser } from "@/context/UserContext";
import { useTicketmasterEvents } from "@/hooks/useTicketmasterEvents";
import { BadgeCheck, Calendar, MapPin, Calendar as CalendarIcon, Settings, HistoryIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Event } from "@/types/event";

export default function Profile() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("saved");
  const [userSavedEvents, setUserSavedEvents] = useState<Event[]>([]);
  
  // Get events from Ticketmaster
  const { data: allEvents = [], isLoading } = useTicketmasterEvents();
  
  // Default bio text if user hasn't set one
  const bioText = user.bio || "No bio set. Add a short description about yourself in the settings.";
  
  // Fetch saved events based on user's saved event IDs
  useEffect(() => {
    if (user.savedEvents && user.savedEvents.length > 0 && allEvents.length > 0) {
      const savedEventsList = user.savedEvents
        .map(eventId => allEvents.find(event => String(event.id) === eventId))
        .filter((event): event is Event => !!event);
      
      setUserSavedEvents(savedEventsList);
    } else {
      setUserSavedEvents([]);
    }
  }, [user.savedEvents, allEvents]);
  
  const header = (
    <header className="bg-gradient-to-b from-sunset-purple/20 to-transparent py-8 text-center relative">
      <div className="relative z-10">
        <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-lg">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-sunset-purple to-sunset-orange flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold">{user.name || "Your Name"}</h1>
        <div className="flex items-center justify-center mt-1">
          <MapPin size={14} className="text-gray-500 mr-1" />
          <span className="text-gray-500 text-sm">{user.location || "Add your location in settings"}</span>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Link to="/settings">
            <Button variant="outline" size="sm" className="rounded-full">
              <Settings size={14} className="mr-1.5" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
  
  return (
    <AppLayout header={header}>
      <div className="py-4">
        {/* Bio Section - Enhanced to be more distinct */}
        <Card className="mb-6 overflow-hidden border-none shadow-md">
          <div className="bg-gradient-to-r from-sunset-purple/10 via-sunset-orange/10 to-sunset-peach/10 px-4 py-3 border-b">
            <h2 className="font-semibold text-lg flex items-center">
              <BadgeCheck size={18} className="mr-2 text-primary" />
              About Me
            </h2>
          </div>
          <CardContent className="p-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 italic text-gray-700 dark:text-gray-300">
              {bioText}
            </div>
          </CardContent>
        </Card>

        <Tabs 
          defaultValue="saved" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 mb-6 rounded-xl">
            <TabsTrigger value="saved" className="rounded-xl">
              <Calendar size={16} className="mr-1.5" /> Saved
            </TabsTrigger>
            <TabsTrigger value="attending" className="rounded-xl">
              <CalendarIcon size={16} className="mr-1.5" /> Attending
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl">
              <HistoryIcon size={16} className="mr-1.5" /> History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved" className="space-y-4">
            {isLoading ? (
              <div className="py-10 text-center">
                <p className="text-muted-foreground">Loading saved events...</p>
              </div>
            ) : (
              <SavedEvents savedEvents={userSavedEvents} />
            )}
          </TabsContent>
          
          <TabsContent value="attending">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 text-center"
            >
              <div className="mb-6">
                <Calendar size={64} className="mx-auto text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Upcoming Events</h3>
              <p className="text-muted-foreground mb-6">You haven't confirmed attendance for any events yet.</p>
              <Link to="/">
                <Button>Browse Events</Button>
              </Link>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="history">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 text-center"
            >
              <div className="mb-6">
                <HistoryIcon size={64} className="mx-auto text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Event History</h3>
              <p className="text-muted-foreground mb-6">Your attended events will appear here.</p>
              <Link to="/">
                <Button>Browse Events</Button>
              </Link>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
