
import React, { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import { FilterMenu } from "./FilterMenu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  defaultQuery?: string;
  placeholder?: string;
  onFilterClick?: () => void;
}

export function SearchBar({ 
  onSearch, 
  defaultQuery = "", 
  placeholder = "Search events", 
  onFilterClick
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Optionally trigger search on each keystroke
    onSearch?.(newQuery);
  };
  
  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };
  
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
    onFilterClick?.();
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search size={18} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-full py-3.5 pl-12 pr-16 rounded-full bg-white dark:bg-gray-800/80 shadow-sm",
              "border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "text-gray-800 dark:text-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent transition-all"
            )}
          />
          
          <AnimatedClearButton 
            isVisible={query.length > 0}
            onClick={handleClear}
          />
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleFilterMenu}
              className="absolute right-3 text-primary hover:text-primary/80 hover:bg-transparent"
            >
              <SlidersHorizontal size={18} />
            </Button>
          </motion.div>
        </div>
      </motion.form>
      
      {isFilterMenuOpen && <FilterMenu onClose={() => setIsFilterMenuOpen(false)} open={isFilterMenuOpen} />}
    </div>
  );
}

// Animated clear button component
function AnimatedClearButton({ isVisible, onClick }: { isVisible: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 dark:bg-gray-700 rounded-full p-1"
    >
      <X size={14} />
    </motion.button>
  );
}
