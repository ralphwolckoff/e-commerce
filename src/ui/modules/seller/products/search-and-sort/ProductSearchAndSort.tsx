// src/components/admin/ProductSearchAndSort.tsx
import React from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

interface ProductSearchAndSortProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: () => void;
}

export default function ProductSearchAndSort({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: ProductSearchAndSortProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded-md p-2 w-full sm:w-1/3"
      />
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
        <label htmlFor="sortBy" className="text-sm text-gray-600">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="border rounded-md p-2 text-sm"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <button
          onClick={onSortOrderChange}
          className="bg-gray-200 p-2 rounded-md transition-colors hover:bg-gray-300"
        >
          {sortOrder === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
        </button>
      </div>
    </div>
  );
}
