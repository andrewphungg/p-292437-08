
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowUpRight, Heart, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
  className?: string;
  onRemove?: () => void;
  isSaved?: boolean;
}

export function EventCard({ 
  event, 
  variant = "default", 
  className,
  onRemove,
  isSaved 
}: EventCardProps) {
  const {
    id,
    title,
    image,
    date,
    location,
    price,
    category,
    tags,
    attendees,
    isTrending,
    isEditorsPick
  } = event;
  
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  
  const formattedPrice = price.isFree
    ? "Free"
    : `${price.currency}${price.min}${price.max ? ` - ${price.currency}${price.max}` : ""}`;

  const [saved, setSaved] = React.useState(isSaved || false);
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove();
  };
  
  if (variant === "compact") {
    return (
      <Link to={`/event/${id}`}>
        <Card className={cn(
          "overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-3xl", 
          className
        )}>
          <div className="relative">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-32 object-cover"
            />
            {isTrending && (
              <Tag variant="trending" className="absolute top-2 left-2">
                Trending
              </Tag>
            )}
            {isEditorsPick && (
              <Tag variant="editors" className="absolute top-2 right-2">
                Editor's Pick
              </Tag>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <Calendar size={12} className="mr-1 text-primary" /> {formattedDate}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              <MapPin size={12} className="mr-1 text-primary" /> {location.name}
            </p>
          </div>
        </Card>
      </Link>
    );
  }
  
  return (
    <Link to={`/event/${id}`} className="block mb-6">
      <Card className={cn(
        "overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-3xl border border-gray-100 dark:border-gray-800", 
        className
      )}>
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 md:h-full object-cover"
            />
            {isTrending && (
              <Tag variant="trending" className="absolute top-2 left-2">
                Trending
              </Tag>
            )}
            {isEditorsPick && (
              <Tag variant="editors" className="absolute top-2 right-2">
                Editor's Pick
              </Tag>
            )}
          </div>
          
          <div className="p-4 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
                <div className="flex">
                  {onRemove && (
                    <button 
                      onClick={handleRemove}
                      className="p-1.5 rounded-full text-gray-400 hover:text-destructive hover:bg-destructive/10 mr-1 transition-colors"
                      aria-label="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button 
                    onClick={handleSave}
                    className={cn(
                      "p-1.5 rounded-full transition-colors",
                      saved ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                    aria-label={saved ? "Unsave event" : "Save event"}
                  >
                    <Heart size={18} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1.5 mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <Calendar size={14} className="mr-2 text-primary" />
                  {formattedDate}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <MapPin size={14} className="mr-2 text-primary" />
                  {location.name}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                  <Users size={14} className="mr-2 text-primary" />
                  {attendees} attending
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-3">
                <Tag variant="category">{category}</Tag>
                {tags.slice(0, 3).map(tag => (
                  <Tag key={tag} variant="default">{tag}</Tag>
                ))}
                {tags.length > 3 && <span className="text-xs text-gray-500">+{tags.length - 3}</span>}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-primary">{formattedPrice}</p>
              </div>
              
              <div className="flex items-center text-sm text-primary font-medium">
                View Details 
                <ArrowUpRight size={14} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
