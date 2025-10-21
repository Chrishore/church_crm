"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DepositChart({ data }: { data: any[] }) {
    return (
        <div className="bg-white dark:bg-surface rounded-xl shadow-lg border border-border dark:border-[#334155] p-4">
            <h2 className="text-xl font-semibold mb-3 text-textPrimary dark:text-[#f1f5f9]">Deposit Tracking</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
                    <CartesianGrid stroke="#c7d2fe" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4338ca" />
                    <YAxis stroke="#4338ca" />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#ffffff',
                            border: '1px solid #c7d2fe',
                            borderRadius: '8px'
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
