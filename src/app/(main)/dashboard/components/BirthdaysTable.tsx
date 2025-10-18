interface Props {
    title: string;
    data: any[];
    isAnniversary?: boolean;
}

export default function BirthdaysTable({ title, data, isAnniversary }: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <table className="w-full text-left border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        {!isAnniversary && <th className="p-2 border">Email</th>}
                        <th className="p-2 border">{isAnniversary ? "Anniversary" : "Birthday"}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={isAnniversary ? 2 : 3} className="text-center text-gray-500 p-2">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="p-2 border">{row.name}</td>
                                {!isAnniversary && <td className="p-2 border">{row.email}</td>}
                                <td className="p-2 border">{row.birthday || row.anniversary}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
