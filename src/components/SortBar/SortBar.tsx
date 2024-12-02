import React from "react";

interface SortBarProps {
  onSortChange: (sortField: string, sortOrder: string) => void;
  currentSort: {
    field: string;
    order: string;
  };
}

const SortBar: React.FC<SortBarProps> = ({ onSortChange, currentSort }) => {
  const handleSortChange = (field: string, order: string) => {
    onSortChange(field, order);
  };

  return (
    <div className="flext items-center space-x-4 mb-4 dark:text-black">
      <p className="font-medium">Sort by:</p>
      <button
        onClick={() => handleSortChange("price", "asc")}
        className={`px-4 py-2 border rounded ${
          currentSort.field === "price" && currentSort.order === "asc"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Price ↑
      </button>
      <button
        onClick={() => handleSortChange("price", "desc")}
        className={`px-4 py-2 border rounded ${
          currentSort.field === "price" && currentSort.order === "desc"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Price ↓
      </button>
      <button
        onClick={() => handleSortChange("rating", "asc")}
        className={`px-4 py-2 border rounded ${
          currentSort.field === "rating" && currentSort.order === "asc"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Rating ↑
      </button>
      <button
        onClick={() => handleSortChange("rating", "desc")}
        className={`px-4 py-2 border rounded ${
          currentSort.field === "rating" && currentSort.order === "desc"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Rating ↓
      </button>
    </div>
  );
};

export default SortBar;
