"use client";
import { useState } from "react";
import FilterBar from "./components/FilterBar";
import MembersTable from "./components/MembersTable";

export default function MembersPage() {
    const [filters, setFilters] = useState({});

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Person Listing</h1>
            <FilterBar onFilterChange={setFilters} />
            <MembersTable filters={filters} />
        </div>
    );
}
