
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Award, Calendar, Clock } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/components/ui/tag";
import { useEvents } from "@/hooks/useEvents";

export default function Profile() {
  const { data: allEvents = [] } = useEvents();
  
  // Mocked user data - in a real app this would come from context/API
  const user = {
    id: "1",
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?img=33",
    points: 450,
    university: "Stanford University",
    graduationYear: 2023,
    personality: "outgoing" as const,
    interests: ["Music", "Tech", "Hiking", "Photography", "Food"],
    badges: [
      { id: "b1", name: "Early Adopter", icon: "🌟" },
      { id: "b2", name: "Social Butterfly", icon: "🦋" },
      { id: "b3", name: "Concert Lover", icon: "🎵" },
      { id: "b4", name: "Foodie", icon: "🍜" }
    ],
    attendedEvents: [allEvents[0]?.id, allEvents[2]?.id].filter(Boolean),
    savedEvents: [allEvents[1]?.id, allEvents[3]?.id, allEvents[4]?.id].filter(Boolean)
  };
  
  // Filter events based on user data
  const attendedEvents = allEvents.filter(event => user.attendedEvents.includes(event.id));
  const savedEvents = allEvents.filter(event => user.savedEvents.includes(event.id));
  
  const header = (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white pt-8 pb-20 px-4">
      <div className="flex justify-between items-center max-w-xl mx-auto">
        <h1 className="text-xl font-bold">My Profile</h1>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Settings size={20} />
        </Button>
      </div>
    </div>
  );
  
  return (
    <AppLayout header={header}>
      <div className="-mt-16 relative z-10 max-w-xl mx-auto">
        <Card className="p-5 shadow-lg border-none bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500">
                {user.university}, Class of {user.graduationYear}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {user.personality}
                </Badge>
                <span className="text-sm text-indigo-600 font-medium flex items-center">
                  <Award size={14} className="mr-1" /> {user.points} points
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Tag key={interest} variant="category">{interest}</Tag>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Badges</h3>
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg">
                      {badge.icon}
                    </div>
                    <span className="text-xs mt-1">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="upcoming">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="upcoming">
              <Calendar size={16} className="mr-1.5" /> Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">
              <Clock size={16} className="mr-1.5" /> Past
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Award size={16} className="mr-1.5" /> Saved
            </TabsTrigger>
          </TabsList>
          
          <CardContent className="px-0 py-4">
            <TabsContent value="upcoming" className="space-y-4 mt-0">
              {attendedEvents.length > 0 ? (
                attendedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center py-10 text-gray-500">
                  No upcoming events. Explore and join some!
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4 mt-0">
              <p className="text-center py-10 text-gray-500">
                You haven't attended any events yet
              </p>
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-4 mt-0">
              {savedEvents.length > 0 ? (
                savedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center py-10 text-gray-500">
                  No saved events. Find some events you like and save them!
                </p>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </div>
      
      <Separator className="my-8" />
      
      <div>
        <Button variant="outline" className="w-full">Sign Out</Button>
      </div>
    </AppLayout>
  );
}
