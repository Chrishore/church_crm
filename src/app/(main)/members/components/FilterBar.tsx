"use client";
import { useState } from "react";

const options = {
    gender: ["Male", "Female", "Unassigned"],
    classification: ["Member", "Visitor", "Unassigned"],
    role: ["Admin", "Usher", "Member"],
};

export default function FilterBar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
    const [filters, setFilters] = useState({
        gender: "",
        classification: "",
        role: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const cleared = { gender: "", classification: "", role: "" };
        setFilters(cleared);
        onFilterChange(cleared);
    };

    return (
        <div className="bg-white rounded-lg shadow mb-6">
            <div className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-t-lg">
                Filter and Cart
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Gender</option>
                    {options.gender.map((g) => (
                        <option key={g}>{g}</option>
                    ))}
                </select>

                <select
                    name="classification"
                    value={filters.classification}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Classification</option>
                    {options.classification.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>

                <select
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Role</option>
                    {options.role.map((r) => (
                        <option key={r}>{r}</option>
                    ))}
                </select>

                <button
                    onClick={clearFilters}
                    className="border border-gray-400 rounded px-3 py-2 hover:bg-gray-100"
                >
                    Clear Filter
                </button>
            </div>
        </div>
    );
}
