import { NextResponse } from "next/server";

export async function GET() {
    const data = [
        { name: "James & Lily", anniversary: "2025-10-22" },
    ];
    return NextResponse.json(data);
}
