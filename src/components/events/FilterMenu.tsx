
import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
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
  
  const categories = [
    "Music", "Food", "Sports", "Arts", "Tech", 
    "Networking", "Education", "Outdoors", "Wellness",
    "Nightlife"
  ];
  
  const moods = [
    "Chill", "Hype", "Networking", "Social", 
    "Intimate", "Educational", "Energetic", "Creative"
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
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="bg-white dark:bg-card rounded-3xl max-h-[85vh] w-full max-w-lg overflow-y-auto shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white dark:bg-card p-4 border-b flex items-center justify-between z-10 rounded-t-3xl dark:border-gray-800">
            <h3 className="font-bold text-xl">Filter Events</h3>
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close filter menu"
            >
              <X size={20} />
            </motion.button>
          </div>
          
          <div className="p-5 space-y-6">
            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Tag
                      variant="category"
                      interactive={true}
                      selected={selectedCategories.includes(category)}
                      onClick={() => toggleCategory(category)}
                      className="rounded-full pl-2.5 pr-2.5 py-1.5 text-sm"
                    >
                      {selectedCategories.includes(category) && (
                        <CheckCircle2 size={14} className="mr-1" />
                      )}
                      {category}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Moods */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Mood</h4>
              <div className="flex flex-wrap gap-2">
                {moods.map(mood => (
                  <motion.div key={mood} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Tag
                      variant="mood"
                      interactive={true}
                      selected={selectedMoods.includes(mood)}
                      onClick={() => toggleMood(mood)}
                      className="rounded-full pl-2.5 pr-2.5 py-1.5 text-sm"
                    >
                      {selectedMoods.includes(mood) && (
                        <CheckCircle2 size={14} className="mr-1" />
                      )}
                      {mood}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-gray-800" />
            
            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Price Range</h4>
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
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Distance</h4>
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
              <h4 className="font-medium text-gray-700 dark:text-gray-300">When</h4>
              <div className="grid grid-cols-3 gap-2">
                {dateRanges.map(range => (
                  <motion.button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={cn(
                      "py-2 px-3 rounded-2xl text-sm transition-colors",
                      dateRange === range.id
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-700'
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {range.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white dark:bg-card p-4 border-t dark:border-gray-800 flex items-center justify-between gap-4 rounded-b-3xl">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                variant="outline"
                onClick={handleClear}
                className="w-full rounded-2xl py-6 font-medium"
              >
                Clear All
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={handleApply}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-6 font-medium"
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
