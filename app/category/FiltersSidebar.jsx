"use client";
import { useState, useEffect } from "react";

export default function FiltersSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    price: 20000,
    rating: "",
    styleFilters: [],
    city: "",
    sortBy: "",
  });

  // Handle checkbox toggle
  const toggleStyle = (style) => {
    setFilters((prev) => ({
      ...prev,
      styleFilters: prev.styleFilters.includes(style)
        ? prev.styleFilters.filter((s) => s !== style)
        : [...prev.styleFilters, style],
    }));
  };

  // Notify parent whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <aside className="bg-white p-5 rounded-xl shadow-md w-full sm:w-64">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Price Range (up to ₹{filters.price})
        </label>
        <input
          type="range"
          min="5000"
          max="20000"
          value={filters.price}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, rating: e.target.value }))
          }
          className="w-full border rounded-md p-2"
        >
          <option value="">All</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
        </select>
      </div>

      {/* Styles */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Styles</label>
        {["Traditional", "Candid", "Studio", "Outdoor"].map((style) => (
          <div key={style} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={style}
              checked={filters.styleFilters.includes(style)}
              onChange={() => toggleStyle(style)}
              className="mr-2"
            />
            <label htmlFor={style}>{style}</label>
          </div>
        ))}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">City</label>
        <select
          value={filters.city}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, city: e.target.value }))
          }
          className="w-full border rounded-md p-2"
        >
          <option value="">All</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          className="w-full border rounded-md p-2"
        >
          <option value="">None</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="ratingHigh">Rating: High to Low</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </aside>
  );
}
