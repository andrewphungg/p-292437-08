
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowUpRight, Heart, Trash2, RefreshCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { HeartConfetti } from "@/components/animations/HeartConfetti";

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
  
  const [saved, setSaved] = useState(isSaved || false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);
  const [undoToastId, setUndoToastId] = useState<string | null>(null);

  // Format date properly
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  
  // Fix price formatting
  const formattedPrice = price && price.isFree 
    ? "Free" 
    : price && typeof price === 'object' && price.currency
      ? `${price.currency}${price.min}${price.max ? ` - ${price.currency}${price.max}` : ""}`
      : "Price not available";

  // Fix location display
  const locationName = typeof location === 'object' ? location.name : String(location);

  // Handle save/unsave with undo toast
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasSaved = saved;
    setSaved(!saved);
    
    if (!wasSaved && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
      setTimeout(() => setShowConfetti(false), 600);
    }
    
    // Dismiss any existing toast
    if (undoToastId) {
      toast.dismiss(undoToastId);
    }
    
    // Show a toast with undo button
    const toastId = toast(
      <div className="flex justify-between w-full items-center">
        <span>{wasSaved ? "Event removed" : "Event saved"}</span>
        <button
          className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm flex items-center transition-colors"
          onClick={() => {
            setSaved(wasSaved);
            toast.dismiss(toastId);
          }}
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
        id: `save-toast-${id}` // Give unique ID to prevent duplicates
      }
    );
    
    setUndoToastId(toastId);
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dismiss any existing toast
    if (undoToastId) {
      toast.dismiss(undoToastId);
    }
    
    // Show a toast with undo option
    if (onRemove) {
      const toastId = toast(
        <div className="flex justify-between w-full items-center">
          <span>Event removed from saved</span>
          <button
            className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm flex items-center transition-colors"
            onClick={() => {
              // This assumes onRemove has a callback for undoing
              if (onRemove && typeof onRemove === 'function') {
                // We'll implement proper undo functionality in SavedEvents
                toast.dismiss(toastId);
              }
            }}
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
          id: `remove-toast-${id}` // Give unique ID to prevent duplicates
        }
      );
      
      setUndoToastId(toastId);
      onRemove();
    }
  };

  // Category icon mapping
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      "Music": "🎵",
      "Food": "🍽️",
      "Sports": "🏀",
      "Arts": "🎨",
      "Tech": "💻",
      "Networking": "🤝",
      "Education": "📚",
      "Outdoors": "🌳",
      "Wellness": "🧘‍♀️",
      "Nightlife": "🌃",
      "Social": "👥",
      "Fitness": "💪",
    };
    
    return iconMap[category] || "🎟️";
  };
  
  if (variant === "compact") {
    return (
      <Link to={`/event/${id}`}>
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <Card className={cn(
            "overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-3xl shadow-sm border-gray-100 dark:border-gray-800", 
            className
          )}>
            <div className="relative">
              <AnimatePresence>{showConfetti && <HeartConfetti />}</AnimatePresence>
              <img 
                src={image} 
                alt={title} 
                className="w-full h-32 object-cover rounded-t-3xl"
              />
              <div className="flex flex-col gap-1 absolute top-2 left-2">
                {isTrending && (
                  <Tag variant="trending" className="text-xs">
                    <span className="mr-1">🔥</span> Trending
                  </Tag>
                )}
                {isEditorsPick && (
                  <Tag variant="editors" className="text-xs mt-1">
                    <span className="mr-1">✨</span> Editor's Pick
                  </Tag>
                )}
              </div>
              <motion.button 
                onClick={handleSave}
                whileTap={{ scale: 1.1 }}
                className={cn(
                  "absolute bottom-2 right-2 p-1.5 rounded-full transition-colors shadow-sm",
                  saved ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:text-gray-700 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:text-white"
                )}
                aria-label={saved ? "Unsave event" : "Save event"}
              >
                <Heart size={14} fill={saved ? "currentColor" : "none"} />
              </motion.button>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-1">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <Calendar size={12} className="mr-1 text-primary" /> {formattedDate}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <MapPin size={12} className="mr-1 text-primary" /> {locationName}
              </p>
              <p className="text-xs font-medium text-primary mt-1">{formattedPrice}</p>
            </div>
          </Card>
        </motion.div>
      </Link>
    );
  }
  
  return (
    <Link to={`/event/${id}`} className="block mb-6">
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
      >
        <Card className={cn(
          "overflow-hidden hover:shadow-md transition-all duration-300 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm", 
          className
        )}>
          <div className="flex flex-col md:flex-row relative">
            <AnimatePresence>{showConfetti && <HeartConfetti />}</AnimatePresence>
            <div className="relative md:w-1/3">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-48 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
              <div className="flex flex-col gap-1 absolute top-2 left-2">
                {isTrending && (
                  <Tag variant="trending" className="text-xs">
                    <span className="mr-1">🔥</span> Trending
                  </Tag>
                )}
                {isEditorsPick && (
                  <Tag variant="editors" className="text-xs mt-1">
                    <span className="mr-1">✨</span> Editor's Pick
                  </Tag>
                )}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                  <div className="flex">
                    {onRemove && (
                      <motion.button 
                        onClick={handleRemove}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-full text-gray-400 hover:text-destructive hover:bg-destructive/10 mr-1 transition-colors"
                        aria-label="Remove from saved"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    )}
                    <motion.button 
                      onClick={handleSave}
                      whileTap={{ scale: 1.1 }}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        saved ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
                      )}
                      aria-label={saved ? "Unsave event" : "Save event"}
                    >
                      <Heart size={18} fill={saved ? "currentColor" : "none"} />
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-1.5 mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <Calendar size={14} className="mr-2 text-primary" />
                    {formattedDate}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <MapPin size={14} className="mr-2 text-primary" />
                    {locationName}
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <Users size={14} className="mr-2 text-primary" />
                    {attendees} attending
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <Tag variant="category">
                    {getCategoryIcon(category)} {category}
                  </Tag>
                  {tags.slice(0, 3).map(tag => (
                    <Tag key={tag} variant="default">{tag}</Tag>
                  ))}
                  {tags.length > 3 && <span className="text-xs text-muted-foreground">+{tags.length - 3}</span>}
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
      </motion.div>
    </Link>
  );
}
