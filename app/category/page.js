"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import PhotographerCard from "../components/PhotographerCard";
import FiltersSidebar from "./FiltersSidebar";
import useDebounce from "../hooks/useDebounce";
import { usePhotographerStore } from "../store/photographerStore";

export default function CategoryPage() {
    const { photographers, setPhotographers } = usePhotographerStore();
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({});
    const [visibleCount, setVisibleCount] = useState(9);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 500);

    // Fetch data once and store globally
    useEffect(() => {
        if (photographers.length === 0) {
            fetch("http://localhost:3001/photographers")
                .then((res) => res.json())
                .then((data) => {
                    setPhotographers(data);
                    setFiltered(data);
                    setLoading(false);
                });
        } else {
            setFiltered(photographers);
            setLoading(false);
        }
    }, [photographers.length, setPhotographers]);

    // Combine filters + search + sorting
    useEffect(() => {
        let result = [...photographers];

        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.location.toLowerCase().includes(q) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(q))
            );
        }

        if (filters.price) result = result.filter((p) => p.price <= filters.price);
        if (filters.rating)
            result = result.filter((p) => p.rating >= Number(filters.rating));
        if (filters.city) result = result.filter((p) => p.location === filters.city);
        if (filters.styleFilters?.length > 0)
            result = result.filter((p) =>
                filters.styleFilters.every((s) => p.styles.includes(s))
            );

        if (filters.sortBy === "priceLow") result.sort((a, b) => a.price - b.price);
        if (filters.sortBy === "ratingHigh") result.sort((a, b) => b.rating - a.rating);
        if (filters.sortBy === "recent") result.sort((a, b) => b.id - a.id);

        setFiltered(result);
        setVisibleCount(9);
    }, [debouncedSearch, filters, photographers]);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 200;

            if (bottom && !isLoadingMore && visibleCount < filtered.length) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount((prev) => prev + 6);
                    setIsLoadingMore(false);
                }, 400);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleCount, filtered.length, isLoadingMore]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onSearch={setSearchTerm} />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Maternity Photographers in Bengaluru
                </h1>

                <div className="flex flex-col sm:flex-row gap-8">
                    <FiltersSidebar onFilterChange={setFilters} />

                    <div className="flex-1">
                        {loading ? (
                            <Loader />
                        ) : filtered.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filtered.slice(0, visibleCount).map((p) => (
                                        <PhotographerCard key={p.id} photographer={p} />
                                    ))}
                                </div>

                                {isLoadingMore && (
                                    <div className="flex justify-center mt-6">
                                        <Loader />
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-center text-gray-500 mt-10">
                                No photographers match your filters.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
