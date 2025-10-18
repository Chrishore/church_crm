"use client";
import { useEffect, useState } from "react";

interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    homePhone: string;
    cellPhone: string;
    gender: string;
    classification: string;
    role: string;
}

export default function MembersTable({ filters }: { filters: any }) {
    const [members, setMembers] = useState<Member[]>([]);
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<keyof Member>("lastName");
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => setMembers(data));
    }, []);

    const filtered = members
        .filter((m) =>
            `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
        )
        .filter((m) =>
            Object.entries(filters).every(
                ([key, value]) => !value || (m as any)[key] === value
            )
        )
        .sort((a, b) => {
            const aVal = String(a[sortKey] ?? "");
            const bVal = String(b[sortKey] ?? "");
            return sortAsc
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
        });

    const handleSort = (key: keyof Member) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else {
            setSortKey(key);
            setSortAsc(true);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Member Listing</h2>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-48"
                />
            </div>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        {[
                            "Last Name",
                            "First Name",
                            "Email",
                            "Gender",
                            "Classification",
                            "Role",
                        ].map((col) => (
                            <th
                                key={col}
                                onClick={() =>
                                    handleSort(col.toLowerCase().replace(" ", "") as keyof Member)
                                }
                                className="p-2 border cursor-pointer hover:bg-gray-200"
                            >
                                {col}
                                {sortKey === col.toLowerCase().replace(" ", "") && (
                                    <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-50">
                            <td className="border p-2">{m.lastName}</td>
                            <td className="border p-2">{m.firstName}</td>
                            <td className="border p-2">{m.email}</td>
                            <td className="border p-2">{m.gender}</td>
                            <td className="border p-2">{m.classification}</td>
                            <td className="border p-2">{m.role}</td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">
                                No matching records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
