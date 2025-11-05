"use client";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-pink-600">Pixisphere 📸</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by name, location or tag..."
        className="border border-gray-300 rounded-full px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </nav>
  );
}
