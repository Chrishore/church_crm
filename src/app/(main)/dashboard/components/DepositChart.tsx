"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DepositChart({ data }: { data: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-xl font-semibold mb-3">Deposit Tracking</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
