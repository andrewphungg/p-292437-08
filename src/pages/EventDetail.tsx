
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { LocationIcon, PriceIcon, TrendingIcon } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, attendEvent, shareEvent, isAttending, hasShared } = useUser();
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Event not found</p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Back to Events
        </Button>
      </div>
    );
  }
  
  const attending = isAttending(event.id);
  const shared = hasShared(event.id);

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(50%_50%_at_50%_50%,#C997D6_0%,#FF8DAF_30%,#EEC48F_75%,#FFF9C1_100%)]">
      <div className="flex flex-col w-full pb-24">
        <div className="relative h-72">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 bg-white/80 p-2 rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="bg-[#FEFFEC] rounded-t-3xl -mt-6 p-6 flex-1">
          <div className="flex justify-between items-start pt-4">
            <h1 className="text-2xl font-bold text-[#2A3F65]">{event.title}</h1>
            <div className="text-right">
              <div className="text-sm font-medium">{event.day}</div>
              <div className="text-xs text-gray-500 mt-1">{event.date}, {event.time}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <LocationIcon />
            <span className="text-sm">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <PriceIcon />
            <span className="text-sm">{event.price}</span>
          </div>

          {event.isTrending && (
            <div className="flex items-center gap-2 mt-3">
              <TrendingIcon />
              <span className="text-sm text-[#E0A000]">Trending Now</span>
            </div>
          )}

          <div className="flex gap-2 mt-5 flex-wrap">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white text-xs px-3 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-sunset-yellow/20 rounded-lg p-4 mt-6">
            <h2 className="font-bold text-lg mb-2">Event Points</h2>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sunset-orange/20 rounded-full flex items-center justify-center mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF8E50" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="#FF8E50" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs">Attend this event</p>
                  <p className="font-bold">{event.pointsForAttending} points</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-sunset-pink/20 rounded-full flex items-center justify-center mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8L8 16M8 8L16 16" stroke="#FF8DAF" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF8DAF" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs">Share this event</p>
                  <p className="font-bold">{event.pointsForSharing} points</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2">About</h2>
            <p className="text-sm">
              Join fellow graduates for this amazing event! Connect with peers who share your interests and 
              make meaningful friendships while having fun. This is a perfect opportunity to expand your network.
            </p>

            <div className="mt-4">
              <div className="flex items-center mb-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" fill="#C997D6" fillOpacity="0.2" stroke="#C997D6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5.5V8L9.5 9.5" stroke="#C997D6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm">{event.attendees} people attending</span>
              </div>
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Person" />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Person" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Person" />
                  <AvatarFallback>CK</AvatarFallback>
                </Avatar>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-sunset-orange text-white text-xs">
                  +{event.attendees - 3}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button 
              onClick={() => attendEvent(event.id)} 
              className={`flex-1 ${attending ? 'bg-sunset-orange' : 'bg-sunset-orange/80'} hover:bg-sunset-orange`}
            >
              {attending ? 'Not Going' : 'Attend'} 
              <span className="ml-1">{attending ? "-" : "+"}{event.pointsForAttending}pts</span>
            </Button>
            <Button 
              onClick={() => shareEvent(event.id)} 
              className={`flex-1 ${shared ? 'bg-sunset-pink' : 'bg-sunset-pink/80'} hover:bg-sunset-pink`}
            >
              {shared ? 'Unshare' : 'Share'} 
              <span className="ml-1">{shared ? "-" : "+"}{event.pointsForSharing}pts</span>
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default EventDetail;
