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
            {/* <div className="mb-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                // Capitalize the first letter for a nice header
                                <th key={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                {columns.map((column) => (
                                    <td key={column}>{row[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div> */}
            <FilterBar onFilterChange={setFilters} />
            <MembersTable filters={filters} />
        </div>
    );
}
