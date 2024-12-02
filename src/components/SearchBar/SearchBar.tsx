import React from "react";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <input
         type="text"
         value={searchTerm}
         onChange={(e) => onSearchChange(e.target.value)}
         placeholder="Search Products..."
         className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full sm:w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
        />
    )
};
export default SearchBar;