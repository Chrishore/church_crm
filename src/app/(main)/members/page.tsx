"use client";
import { useState } from "react";
import FilterBar from "./components/FilterBar";
import MembersTable from "./components/MembersTable";

export default function MembersPage() {
    const [filters, setFilters] = useState({});
    type Person = {
        id: number;
        name: string;
        age: number;
        city: string;
    };
    const data: Person[] = [
        { id: 1, name: 'Alice', age: 28, city: 'New York' },
        { id: 2, name: 'Bob', age: 35, city: 'Los Angeles' },
        { id: 3, name: 'Charlie', age: 42, city: 'Chicago' }
    ];
    const columns = Object.keys(data[0]) as (keyof Person)[];
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Person Listing</h1>
            <FilterBar onFilterChange={setFilters} />
            <MembersTable filters={filters} />
        </div>
    );
}
