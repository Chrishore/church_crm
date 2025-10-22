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
        <div
            className="rounded-lg shadow-lg border border-border p-4"
            style={{ backgroundColor: 'var(--color-surface)' }}
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                    Member Listing
                </h2>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-border p-2 rounded w-full sm:w-48"
                    style={{
                        backgroundColor: 'var(--color-bg-main)',
                        color: 'var(--color-textPrimary)'
                    }}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-surface)' }}>
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
                                    className="p-2 border border-border cursor-pointer hover:opacity-80 transition-colors"
                                    style={{ color: 'var(--color-textPrimary)' }}
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
                            <tr key={m.id} className="hover:opacity-80 transition-colors">
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textPrimary)' }}
                                >
                                    {m.lastName}
                                </td>
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textPrimary)' }}
                                >
                                    {m.firstName}
                                </td>
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    {m.email}
                                </td>
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    {m.gender}
                                </td>
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    {m.classification}
                                </td>
                                <td
                                    className="border border-border p-2"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    {m.role}
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-4 text-center"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
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
