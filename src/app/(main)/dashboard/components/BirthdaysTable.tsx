interface Props {
    title: string;
    data: any[];
    isAnniversary?: boolean;
}

export default function BirthdaysTable({ title, data, isAnniversary }: Props) {
    return (
        <div className="bg-white dark:bg-surface rounded-xl shadow-lg border border-border dark:border-[#334155] p-4">
            <h2 className="text-xl font-semibold mb-3 text-textPrimary dark:text-[#f1f5f9]">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border border-border dark:border-[#334155]">
                    <thead>
                        <tr className="bg-surface dark:bg-[#1e293b]">
                            <th className="p-2 border border-border dark:border-[#334155] text-textPrimary dark:text-[#f1f5f9]">Name</th>
                            {!isAnniversary && <th className="p-2 border border-border dark:border-[#334155] text-textPrimary dark:text-[#f1f5f9]">Email</th>}
                            <th className="p-2 border border-border dark:border-[#334155] text-textPrimary dark:text-[#f1f5f9]">{isAnniversary ? "Anniversary" : "Birthday"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={isAnniversary ? 2 : 3} className="text-center text-textSecondary dark:text-[#cbd5e1] p-4">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-surface dark:hover:bg-[#334155] transition-colors">
                                    <td className="p-2 border border-border dark:border-[#334155] text-textPrimary dark:text-[#f1f5f9]">{row.name}</td>
                                    {!isAnniversary && <td className="p-2 border border-border dark:border-[#334155] text-textSecondary dark:text-[#cbd5e1]">{row.email}</td>}
                                    <td className="p-2 border border-border dark:border-[#334155] text-textSecondary dark:text-[#cbd5e1]">{row.birthday || row.anniversary}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
