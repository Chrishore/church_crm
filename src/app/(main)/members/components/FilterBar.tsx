"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const options = {
    gender: ["Male", "Female", "Unassigned"],
    classification: ["Member", "Visitor", "Unassigned"],
    role: ["Admin", "Usher", "Member", "Security Team"],
};

export default function FilterBar({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
    const router = useRouter();
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
        <div className="bg-white dark:bg-surface rounded-lg shadow-lg border border-border dark:border-[#334155] mb-6">
            <div className="bg-primary text-white px-4 py-2 font-semibold rounded-t-lg">
                Filter and Cart
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleChange}
                    className="border border-border dark:border-[#334155] p-2 rounded bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
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
                    className="border border-border dark:border-[#334155] p-2 rounded bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
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
                    className="border border-border dark:border-[#334155] p-2 rounded bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
                >
                    <option value="">Select Role</option>
                    {options.role.map((r) => (
                        <option key={r}>{r}</option>
                    ))}
                </select>

                <button
                    onClick={clearFilters}
                    className="border border-border dark:border-[#334155] rounded px-3 py-2 hover:bg-surface dark:hover:bg-[#334155] text-textPrimary dark:text-[#f1f5f9] transition-colors"
                >
                    Clear Filter
                </button>
                <button
                    onClick={() => router.push("/members/add")}
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors col-span-1 sm:col-span-2 md:col-span-1"
                >
                    + Add Member
                </button>
            </div>
        </div>
    );
}
