
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Heart, Share2, ExternalLink } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/types/event";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: events = [] } = useEvents();
  const [isAttending, setIsAttending] = useState(false);
  
  // Find the event by id
  const event = events.find(e => e.id === id) as Event | undefined;

  // Mock similar events
  const similarEvents = events
    .filter(e => 
      e.id !== id && 
      (e.category === event?.category || 
       e.tags.some(tag => event?.tags.includes(tag)))
    )
    .slice(0, 3);
  
  // Mock attendees data
  const attendees = [
    { id: "u1", name: "Jamie Smith", avatar: "https://i.pravatar.cc/150?img=32" },
    { id: "u2", name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=33" },
    { id: "u3", name: "Sam Taylor", avatar: "https://i.pravatar.cc/150?img=34" },
    // More would be here in a real app
  ];
  
  const handleAttend = () => {
    setIsAttending(!isAttending);
  };
  
  if (!event) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <h2 className="text-xl font-medium text-gray-700">Event not found</h2>
          <p className="text-gray-500 mt-2">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="mt-6">
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const header = (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="p-2 -ml-2 text-gray-700 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-medium truncate flex-1 text-center">Event Details</h1>
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>
    </div>
  );
  
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const formattedTime = `${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}`;
  
  const formattedPrice = event.price.isFree
    ? "Free"
    : `${event.price.currency}${event.price.min}${event.price.max ? ` - ${event.price.currency}${event.price.max}` : ""}`;
  
  return (
    <AppLayout header={header}>
      <div className="pb-10">
        {/* Hero Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-xl mt-4 mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.isTrending && (
            <div className="absolute top-4 left-4">
              <Tag variant="trending">Trending</Tag>
            </div>
          )}
          {event.isEditorsPick && (
            <div className="absolute top-4 right-4">
              <Tag variant="editors">Editor's Pick</Tag>
            </div>
          )}
        </div>
        
        {/* Event Title & Basic Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h1>
          
          <div className="flex items-center flex-wrap gap-y-2">
            <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
              {event.category}
            </Badge>
            <span className="text-sm text-gray-600 flex items-center mr-3">
              <Users size={16} className="mr-1 text-blue-600" />
              {event.attendees} attending
            </span>
            <span className="text-sm font-medium text-green-600">
              {formattedPrice}
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Tag key={tag} variant="default">{tag}</Tag>
            ))}
            {event.mood.map((mood) => (
              <Tag key={mood} variant="mood">{mood}</Tag>
            ))}
          </div>
        </div>
        
        {/* Event Details */}
        <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm mb-6">
          <div className="flex items-start">
            <Calendar size={20} className="shrink-0 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Date & Time</h3>
              <p className="text-gray-600 text-sm">{formattedDate}</p>
              <p className="text-gray-600 text-sm">{formattedTime}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin size={20} className="shrink-0 text-blue-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-gray-600 text-sm">{event.location.name}</p>
              <p className="text-gray-600 text-sm">{event.location.address}, {event.location.city}</p>
            </div>
          </div>
          
          {event.description && (
            <div className="flex items-start pt-2">
              <div className="w-full">
                <h3 className="font-medium mb-1">About this event</h3>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <Button 
            onClick={handleAttend}
            className={`flex-1 ${isAttending ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {isAttending ? (
              <>
                <Check size={18} className="mr-1" /> Going
              </>
            ) : (
              <>
                <Calendar size={18} className="mr-1" /> Attend
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1">
            <Share2 size={18} className="mr-1" /> Share
          </Button>
          
          <Button variant="outline" size="icon">
            <Heart size={18} />
          </Button>
        </div>
        
        {/* Attendees */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Who's going</h2>
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {attendees.slice(0, 3).map((attendee) => (
                <Avatar key={attendee.id} className="border-2 border-white w-8 h-8">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {event.attendees > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                  +{event.attendees - 3}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-600">
              {isAttending ? "You and " : ""}{event.attendees} {event.attendees === 1 ? "person" : "people"} attending
            </span>
          </div>
        </div>
        
        {/* Point Rewards */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
          <h3 className="font-medium text-blue-800">Earn Points</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">For attending this event</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                +{event.pointsForAttending} points
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">For sharing with friends</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                +{event.pointsForSharing} points
              </Badge>
            </div>
          </div>
        </div>
        
        {/* External Link */}
        {event.url && (
          <div className="mb-8">
            <Button variant="outline" asChild className="w-full">
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Visit Official Page <ExternalLink size={16} className="ml-1.5" />
              </a>
            </Button>
          </div>
        )}
        
        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div>
            <Separator className="mb-6" />
            
            <h2 className="text-lg font-semibold mb-4">You might also like</h2>
            <div className="grid grid-cols-2 gap-4">
              {similarEvents.map(event => (
                <Link 
                  key={event.id} 
                  to={`/event/${event.id}`}
                  className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2">{event.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-xs font-medium text-green-600">
                        {event.price.isFree ? "Free" : `${event.price.currency}${event.price.min}+`}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
