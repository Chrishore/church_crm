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
        <div className="bg-white dark:bg-surface rounded-lg shadow-lg border border-border dark:border-[#334155] p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold text-textPrimary dark:text-[#f1f5f9]">Member Listing</h2>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-border dark:border-[#334155] p-2 rounded w-full sm:w-48 bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-surface dark:bg-[#1e293b]">
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
                                    className="p-2 border border-border dark:border-[#334155] cursor-pointer hover:bg-[#e0e7ff] dark:hover:bg-[#334155] text-textPrimary dark:text-[#f1f5f9] transition-colors"
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
                            <tr key={m.id} className="hover:bg-surface dark:hover:bg-[#334155] transition-colors">
                                <td className="border border-border dark:border-[#334155] p-2 text-textPrimary dark:text-[#f1f5f9]">{m.lastName}</td>
                                <td className="border border-border dark:border-[#334155] p-2 text-textPrimary dark:text-[#f1f5f9]">{m.firstName}</td>
                                <td className="border border-border dark:border-[#334155] p-2 text-textSecondary dark:text-[#cbd5e1]">{m.email}</td>
                                <td className="border border-border dark:border-[#334155] p-2 text-textSecondary dark:text-[#cbd5e1]">{m.gender}</td>
                                <td className="border border-border dark:border-[#334155] p-2 text-textSecondary dark:text-[#cbd5e1]">{m.classification}</td>
                                <td className="border border-border dark:border-[#334155] p-2 text-textSecondary dark:text-[#cbd5e1]">{m.role}</td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-textSecondary dark:text-[#cbd5e1]">
                                    No matching records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
