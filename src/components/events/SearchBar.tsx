
import React from "react";
import { MenuIcon, FilterIcon } from "@/components/icons";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterToggle?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterToggle }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const query = (form.elements.namedItem("search") as HTMLInputElement).value;
    onSearch?.(query);
  };

  const handleFilterClick = () => {
    onFilterToggle?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[360px] max-w-[720px] mx-auto px-4"
    >
      <div className="flex items-center gap-1 border bg-[#FEFFEC] p-1 rounded-[28px] border-[#E0E0E0] shadow-sm">
        <button type="button" className="p-2">
          <MenuIcon />
        </button>
        <input
          type="search"
          name="search"
          placeholder="Search Events"
          className="flex-1 text-base text-[#49454F] bg-transparent border-none focus:outline-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <button 
          type="button" 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleFilterClick}
        >
          <FilterIcon />
        </button>
      </div>
    </form>
  );
};
