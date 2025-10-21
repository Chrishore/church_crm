interface StatCardProps {
    title: string;
    value: number;
    color: 'primary' | 'secondary' | 'accent';
}

export default function StatCard({ title, value, color }: StatCardProps) {
    const colorClasses = {
        primary: 'bg-primary dark:bg-primary',
        secondary: 'bg-secondary dark:bg-secondary',
        accent: 'bg-accent dark:bg-accent',
    };

    return (
        <div className={`${colorClasses[color]} text-white rounded-xl p-6 shadow-lg`}>
            <p className="text-4xl font-bold mb-2">{value}</p>
            <p className="text-base opacity-90">{title}</p>
        </div>
    );
}
