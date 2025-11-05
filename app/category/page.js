"use client";

import { useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import PhotographerCard from "../components/PhotographerCard";


export default function CategoryPage() {
    const [photographers, setPhotographers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch API data
    useEffect(() => {
        fetch("http://localhost:3001/photographers")
            .then(res => res.json())
            .then((data) => {
                setPhotographers(data)
                setFiltered(data)
                setLoading(false)
            });
    }, [])

    // Search filter
    const handleSearch = (query) => {
        const q = query.toLowerCase();
        const result = photographers.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.location.toLowerCase().includes(q) ||
                p.tags.some((tag) => tag.toLowerCase().includes(q))
        );
        setFiltered(result);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onSearch={handleSearch} />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Maternity Photographers in Bengaluru
                </h1>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((p) => (
                            <PhotographerCard key={p.id} photographer={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}