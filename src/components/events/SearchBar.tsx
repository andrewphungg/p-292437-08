
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
  onFilterToggle?: () => void;
}

export function SearchBar({ 
  onSearch, 
  defaultQuery = "", 
  placeholder = "Search events", 
  onFilterToggle 
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
    onFilterToggle?.();
  };
  
  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.form 
        onSubmit={handleSubmit} 
        className="relative"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search size={18} />
          </div>
          
          <motion.input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-full py-4 pl-12 pr-16 rounded-full bg-white dark:bg-gray-800 shadow-md",
              "border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "text-gray-800 dark:text-gray-100 text-base",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
            )}
            whileFocus={{ scale: 1.01 }}
          />
          
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="absolute right-14 text-gray-400 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          )}
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleFilterMenu}
              className="text-primary hover:text-primary/80 hover:bg-transparent"
            >
              <SlidersHorizontal size={20} />
            </Button>
          </motion.div>
        </div>
      </motion.form>
      
      {isFilterMenuOpen && <FilterMenu onClose={() => setIsFilterMenuOpen(false)} />}
    </div>
  );
}
