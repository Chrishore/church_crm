import { NextResponse } from "next/server";

export async function GET() {
    const data = [
        { name: "Week 1", value: 1200 },
        { name: "Week 2", value: 1500 },
        { name: "Week 3", value: 800 },
        { name: "Week 4", value: 1900 },
        { name: "Week 5", value: 1400 },
    ];
    return NextResponse.json(data);
}
