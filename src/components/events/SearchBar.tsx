
import React, { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import { FilterMenu } from "./FilterMenu";
import { cn } from "@/lib/utils";

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
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-gray-400">
            <Search size={18} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className={cn(
              "w-full py-3 pl-10 pr-16 rounded-2xl bg-white shadow-sm",
              "border border-gray-200 placeholder:text-gray-400 text-gray-800",
              "focus:outline-none focus:ring-2 focus:ring-sunset-orange/30 focus:border-transparent"
            )}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleFilterMenu}
            className="absolute right-2 text-sunset-orange hover:text-sunset-pink hover:bg-transparent"
          >
            <SlidersHorizontal size={18} />
          </Button>
        </div>
      </form>
      
      {isFilterMenuOpen && <FilterMenu onClose={toggleFilterMenu} />}
    </div>
  );
}
