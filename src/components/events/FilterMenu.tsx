
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Tag } from "../ui/tag";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FilterMenuProps {
  onClose: () => void;
  onApplyFilters?: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  categories: string[];
  moods: string[];
  priceRange: [number, number];
  distance: number;
  dateRange: string;
}

export function FilterMenu({ onClose, onApplyFilters }: FilterMenuProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [distance, setDistance] = useState<number>(10);
  const [dateRange, setDateRange] = useState<string>("all");
  
  // Enhanced category data with icons
  const categories = [
    { id: "music", name: "Music", icon: "🎵" },
    { id: "food", name: "Food", icon: "🍽️" },
    { id: "sports", name: "Sports", icon: "🏀" }, 
    { id: "arts", name: "Arts", icon: "🎨" },
    { id: "tech", name: "Tech", icon: "💻" },
    { id: "networking", name: "Networking", icon: "🤝" },
    { id: "education", name: "Education", icon: "📚" },
    { id: "outdoors", name: "Outdoors", icon: "🌳" },
    { id: "wellness", name: "Wellness", icon: "🧘‍♀️" },
    { id: "nightlife", name: "Nightlife", icon: "🌃" }
  ];
  
  const moods = [
    { id: "chill", name: "Chill", icon: "😌" },
    { id: "hype", name: "Hype", icon: "🔥" },
    { id: "networking", name: "Networking", icon: "👥" },
    { id: "social", name: "Social", icon: "🎉" }, 
    { id: "intimate", name: "Intimate", icon: "💞" },
    { id: "educational", name: "Educational", icon: "🧠" },
    { id: "energetic", name: "Energetic", icon: "⚡" },
    { id: "creative", name: "Creative", icon: "✨" }
  ];
  
  const dateRanges = [
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "this-week", label: "This Week" },
    { id: "this-weekend", label: "This Weekend" },
    { id: "next-week", label: "Next Week" },
    { id: "next-month", label: "Next Month" },
    { id: "all", label: "All Dates" }
  ];
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };
  
  const handleApply = () => {
    onApplyFilters?.({
      categories: selectedCategories,
      moods: selectedMoods,
      priceRange,
      distance,
      dateRange
    });
    onClose();
  };
  
  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedMoods([]);
    setPriceRange([0, 100]);
    setDistance(10);
    setDateRange("all");
  };
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-3xl max-h-[85vh] w-full max-w-lg overflow-hidden shadow-xl"
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b dark:border-gray-800 flex items-center justify-between z-10 rounded-t-3xl">
            <h3 className="font-bold text-lg">Filter Events</h3>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close filter menu"
            >
              <X size={18} />
            </motion.button>
          </div>
          
          <div className="p-5 space-y-6 overflow-y-auto max-h-[calc(85vh-160px)]">
            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag
                      variant="category"
                      interactive={true}
                      selected={selectedCategories.includes(category.id)}
                      onClick={() => toggleCategory(category.id)}
                      className="rounded-full px-3 py-1.5 text-sm"
                    >
                      <span className="mr-1.5">{category.icon}</span>
                      {category.name}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Moods */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Mood</h4>
              <div className="flex flex-wrap gap-2">
                {moods.map(mood => (
                  <motion.div
                    key={mood.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Tag
                      variant="mood"
                      interactive={true}
                      selected={selectedMoods.includes(mood.id)}
                      onClick={() => toggleMood(mood.id)}
                      className="rounded-full px-3 py-1.5 text-sm"
                    >
                      <span className="mr-1.5">{mood.icon}</span>
                      {mood.name}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Price Range</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ${priceRange[0]} - {priceRange[1] === 100 ? "$100+" : `$${priceRange[1]}`}
                </span>
              </div>
              <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={5} 
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Free</span>
                <span>$100+</span>
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Distance */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Distance</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{distance} miles</span>
              </div>
              <Slider 
                defaultValue={[10]} 
                max={50} 
                step={1}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Nearby</span>
                <span>50 miles</span>
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Date Range */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">When</h4>
              <div className="grid grid-cols-3 gap-2">
                {dateRanges.map(range => (
                  <motion.button
                    key={range.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setDateRange(range.id)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-sm transition-all font-medium",
                      dateRange === range.id
                        ? 'bg-primary/15 text-primary border border-primary/20 shadow-sm'
                        : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-700'
                    )}
                  >
                    {range.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t dark:border-gray-800 flex items-center justify-between gap-4 rounded-b-3xl">
            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                variant="outline"
                onClick={handleClear}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700"
              >
                Clear All
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                onClick={handleApply}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                Apply Filters
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
