
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowUpRight, Heart, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  event: Event;
  variant?: "default" | "compact";
  className?: string;
  onRemove?: () => void;
  isSaved?: boolean;
}

// Heart confetti component
const HeartConfetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500"
          initial={{
            opacity: 1,
            scale: Math.random() * 0.4 + 0.8,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            x: (Math.random() - 0.5) * 150,
            y: Math.random() * -150 - 50,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

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
  const { toast } = useToast();

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  
  const formattedPrice = price.isFree
    ? "Free"
    : `${price.currency}${price.min}${price.max ? ` - ${price.currency}${price.max}` : ""}`;

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasSaved = saved;
    setSaved(!saved);
    
    if (!wasSaved && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
      setTimeout(() => setShowConfetti(false), 800);
    }
    
    toast({
      title: wasSaved ? "Event removed from saved" : "Event saved",
      description: wasSaved ? "The event has been removed from your saved list." : "The event has been added to your saved list.",
      variant: wasSaved ? "destructive" : "default",
      className: "top-center-toast",
    });
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) onRemove();
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
        <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className={cn(
            "overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-3xl shadow-sm border-gray-100 dark:border-gray-800", 
            className
          )}>
            <div className="relative">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-32 object-cover rounded-t-3xl"
              />
              {isTrending && (
                <Tag variant="trending" className="absolute top-2 left-2 text-xs">
                  <span className="mr-1">🔥</span> Trending
                </Tag>
              )}
              {isEditorsPick && (
                <Tag variant="editors" className="absolute top-2 right-2 text-xs">
                  <span className="mr-1">✨</span> Editor's Pick
                </Tag>
              )}
              <button 
                onClick={handleSave}
                className={cn(
                  "absolute bottom-2 right-2 p-1.5 rounded-full transition-colors shadow-sm",
                  saved ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:text-gray-700"
                )}
                aria-label={saved ? "Unsave event" : "Save event"}
              >
                <Heart size={14} fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-1">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <Calendar size={12} className="mr-1 text-primary" /> {formattedDate}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <MapPin size={12} className="mr-1 text-primary" /> {location.name}
              </p>
            </div>
          </Card>
        </motion.div>
      </Link>
    );
  }
  
  return (
    <Link to={`/event/${id}`} className="block mb-6">
      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
        <Card className={cn(
          "overflow-hidden hover:shadow-md transition-all duration-300 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm", 
          className
        )}>
          <div className="flex flex-col md:flex-row relative">
            {showConfetti && <HeartConfetti />}
            <div className="relative md:w-1/3">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-48 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
              />
              {isTrending && (
                <Tag variant="trending" className="absolute top-2 left-2 text-xs">
                  <span className="mr-1">🔥</span> Trending
                </Tag>
              )}
              {isEditorsPick && (
                <Tag variant="editors" className="absolute top-2 right-2 text-xs">
                  <span className="mr-1">✨</span> Editor's Pick
                </Tag>
              )}
            </div>
            
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                  <div className="flex">
                    {onRemove && (
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={handleRemove}
                        className="p-1.5 rounded-full text-gray-400 hover:text-destructive hover:bg-destructive/10 mr-1 transition-colors"
                        aria-label="Remove from saved"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    )}
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSave}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        saved ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                    {location.name}
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
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center text-sm text-primary font-medium"
                >
                  View Details 
                  <ArrowUpRight size={14} className="ml-1" />
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
