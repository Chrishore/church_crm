interface Props {
    title: string;
    data: any[];
    isAnniversary?: boolean;
}

export default function BirthdaysTable({ title, data, isAnniversary }: Props) {
    return (
        <div
            className="rounded-xl shadow-lg border border-border p-4"
            style={{ backgroundColor: 'var(--color-surface)' }}
        >
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-textPrimary)' }}>
                {title}
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-border">
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-surface)' }}>
                            <th
                                className="p-2 border border-border"
                                style={{ color: 'var(--color-textPrimary)' }}
                            >
                                Name
                            </th>
                            {!isAnniversary && (
                                <th
                                    className="p-2 border border-border"
                                    style={{ color: 'var(--color-textPrimary)' }}
                                >
                                    Email
                                </th>
                            )}
                            <th
                                className="p-2 border border-border"
                                style={{ color: 'var(--color-textPrimary)' }}
                            >
                                {isAnniversary ? "Anniversary" : "Birthday"}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={isAnniversary ? 2 : 3}
                                    className="text-center p-4"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr key={idx} className="hover:opacity-80 transition-colors">
                                    <td
                                        className="p-2 border border-border"
                                        style={{ color: 'var(--color-textPrimary)' }}
                                    >
                                        {row.name}
                                    </td>
                                    {!isAnniversary && (
                                        <td
                                            className="p-2 border border-border"
                                            style={{ color: 'var(--color-textSecondary)' }}
                                        >
                                            {row.email}
                                        </td>
                                    )}
                                    <td
                                        className="p-2 border border-border"
                                        style={{ color: 'var(--color-textSecondary)' }}
                                    >
                                        {row.birthday || row.anniversary}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
