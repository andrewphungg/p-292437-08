
import React, { useState } from "react";
import { SearchBar } from "@/components/events/SearchBar";
import { EventCard } from "@/components/events/EventCard";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useUser } from "@/context/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecommendedFriends } from "@/components/friends/RecommendedFriends";

const Index = () => {
  const { events, suggestedEvents, user } = useUser();
  const [activeTab, setActiveTab] = useState("events");
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const recommendedEvents = suggestedEvents.length > 0 ? suggestedEvents : events;

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col items-center w-full pb-24">
        <header className="text-[#303030] text-[55px] text-center w-full bg-[#FEFFEC] py-5">
          <span className="bg-gradient-to-r from-sunset-pink via-sunset-orange to-sunset-yellow bg-clip-text text-transparent">
            Joople
          </span>
        </header>

        <div className="bg-sunset-orange/20 w-full py-2 text-center">
          <h1 className="text-xl font-bold text-sunset-orange">
            Connect with Fellow Graduates
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-center mt-[15px] mb-2">
          Welcome, {user.name || "Graduate"}!
        </h2>
        <p className="text-sm text-center mb-3 text-[#333] max-w-xs">
          Find fun events to meet other graduates and earn points!
        </p>

        <SearchBar onSearch={handleSearch} />

        <div className="w-full max-w-[720px] mt-4 px-5">
          <Tabs 
            defaultValue="events" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="friends">Find Friends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-0">
              <main className="flex flex-col gap-5">
                {recommendedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </main>
            </TabsContent>
            
            <TabsContent value="friends" className="mt-0">
              <RecommendedFriends />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
