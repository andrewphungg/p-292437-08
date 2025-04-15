
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowUpRight, Heart, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import confetti from "canvas-confetti";

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
  isSaved: initialSaved = false
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
  
  const formattedPrice = typeof price === 'object' 
    ? (price.isFree
      ? "Free"
      : `${price.currency}${price.min}${price.max ? ` - ${price.currency}${price.max}` : ""}`)
    : price;

  const [saved, setSaved] = useState(initialSaved);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newSaved = !saved;
    setSaved(newSaved);
    
    if (newSaved && !hasAnimated) {
      // Show heart confetti only on first save
      setHasAnimated(true);
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        shapes: ['heart'],
        colors: ['#ff6b6b', '#ff8e8e', '#ffb3b3'],
      });
      
      toast.success("Event saved to your collection!");
    } else if (!newSaved) {
      toast.info("Event removed from your collection");
    }
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove();
  };
  
  if (variant === "compact") {
    return (
      <Link to={`/event/${id}`}>
        <motion.div
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className={cn(
            "overflow-hidden rounded-3xl", 
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
                <MapPin size={12} className="mr-1 text-primary" /> {typeof location === 'object' ? location.name : location}
              </p>
            </div>
          </Card>
        </motion.div>
      </Link>
    );
  }
  
  return (
    <Link to={`/event/${id}`} className="block mb-8">
      <motion.div
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className={cn(
          "overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800", 
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
            
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg line-clamp-2 text-gray-900 dark:text-white">{title}</h3>
                  <div className="flex">
                    {onRemove && (
                      <motion.button 
                        onClick={handleRemove}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full text-gray-400 hover:text-destructive hover:bg-destructive/10 mr-1 transition-colors"
                        aria-label="Remove from saved"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    )}
                    <motion.button 
                      onClick={handleSave}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        saved ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                      aria-label={saved ? "Unsave event" : "Save event"}
                    >
                      <Heart size={20} fill={saved ? "currentColor" : "none"} />
                      <AnimatePresence>
                        {saved && !hasAnimated && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.5 }}
                            exit={{ scale: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          >
                            <Heart size={24} fill="red" stroke="none" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-2.5 mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <Calendar size={16} className="mr-2 text-primary" />
                    {formattedDate}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <MapPin size={16} className="mr-2 text-primary" />
                    {typeof location === 'object' ? location.name : location}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <Users size={16} className="mr-2 text-primary" />
                    {attendees} attending
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <Tag variant="category">{category}</Tag>
                  {tags.slice(0, 3).map(tag => (
                    <Tag key={tag} variant="default">{tag}</Tag>
                  ))}
                  {tags.length > 3 && <span className="text-xs text-gray-500">+{tags.length - 3}</span>}
                </div>
              </div>
              
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary dark:text-primary-foreground">{formattedPrice}</p>
                </div>
                
                <motion.div 
                  className="flex items-center text-sm text-primary font-medium"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  View Details 
                  <ArrowUpRight size={16} className="ml-1" />
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
