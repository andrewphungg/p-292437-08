
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Tag } from "../ui/tag";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-h-[80vh] w-full max-w-lg overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between z-10 rounded-t-3xl">
          <h3 className="font-medium text-lg">Filter Events</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>
        
        <div className="p-5 space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Tag
                  key={category}
                  variant="category"
                  interactive={true}
                  selected={selectedCategories.includes(category)}
                  onClick={() => toggleCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Tag>
              ))}
            </div>
          </div>

          <Separator />
          
          {/* Moods */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Mood</h4>
            <div className="flex flex-wrap gap-2">
              {moods.map(mood => (
                <Tag
                  key={mood}
                  variant="mood"
                  interactive={true}
                  selected={selectedMoods.includes(mood)}
                  onClick={() => toggleMood(mood)}
                  className="rounded-full"
                >
                  {mood}
                </Tag>
              ))}
            </div>
          </div>

          <Separator />
          
          {/* Price Range */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm text-gray-700">Price Range</h4>
              <span className="text-sm text-gray-500">
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
            <div className="flex justify-between text-xs text-gray-500">
              <span>Free</span>
              <span>$100+</span>
            </div>
          </div>

          <Separator />
          
          {/* Distance */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm text-gray-700">Distance</h4>
              <span className="text-sm text-gray-500">{distance} miles</span>
            </div>
            <Slider 
              defaultValue={[10]} 
              max={50} 
              step={1}
              value={[distance]}
              onValueChange={(value) => setDistance(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Nearby</span>
              <span>50 miles</span>
            </div>
          </div>

          <Separator />
          
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">When</h4>
            <div className="grid grid-cols-3 gap-2">
              {dateRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => setDateRange(range.id)}
                  className={`py-2 px-3 rounded-2xl text-sm ${
                    dateRange === range.id
                      ? 'bg-sunset-orange/10 text-sunset-orange border border-sunset-orange/20'
                      : 'bg-gray-100 text-gray-700 border border-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white p-4 border-t flex items-center justify-between gap-4 rounded-b-3xl">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1 rounded-2xl"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-sunset-orange hover:bg-sunset-pink rounded-2xl"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
