interface StatCardProps {
    title: string;
    value: number;
    color: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
    return (
        <div className={`${color} text-white rounded-xl p-4 shadow-md`}>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-lg">{title}</p>
        </div>
    );
}
