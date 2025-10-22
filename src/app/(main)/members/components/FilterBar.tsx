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
        <div
            className="rounded-lg shadow-lg border border-border mb-6 min-h-0 min-w-0"
            style={{ backgroundColor: 'var(--color-surface)' }}
        >
            <div className="bg-primary text-white px-4 py-2 font-semibold rounded-t-lg">
                Filter and Cart
            </div>

            {/* ensure grid is responsive and container can shrink inside a flex parent */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-h-0">
                <select
                    name="gender"
                    value={filters.gender}
                    onChange={handleChange}
                    className="border border-border p-2 rounded min-w-0"
                    style={{
                        backgroundColor: 'var(--color-bg-main)',
                        color: 'var(--color-textPrimary)'
                    }}
                >
                    <option value="">Select Gender</option>
                    {options.gender.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>

                <select
                    name="classification"
                    value={filters.classification}
                    onChange={handleChange}
                    className="border border-border p-2 rounded min-w-0"
                    style={{
                        backgroundColor: 'var(--color-bg-main)',
                        color: 'var(--color-textPrimary)'
                    }}
                >
                    <option value="">Select Classification</option>
                    {options.classification.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                    className="border border-border p-2 rounded min-w-0"
                    style={{
                        backgroundColor: 'var(--color-bg-main)',
                        color: 'var(--color-textPrimary)'
                    }}
                >
                    <option value="">Select Role</option>
                    {options.role.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>

                <button
                    onClick={clearFilters}
                    className="border border-border rounded px-3 py-2 hover:opacity-80 transition-colors min-w-0"
                    style={{ color: 'var(--color-textPrimary)' }}
                >
                    Clear Filter
                </button>

                <button
                    onClick={() => router.push("/members/add")}
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors col-span-1 sm:col-span-2 md:col-span-1 min-w-0 w-full sm:w-auto"
                >
                    + Add Member
                </button>
            </div>
        </div>
    );
}
