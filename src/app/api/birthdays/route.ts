import { NextResponse } from "next/server";

export async function GET() {
    const data = [
        { name: "John Doe", email: "john@example.com", birthday: "2025-10-18" },
        { name: "Mary Joseph", email: "mary@example.com", birthday: "2025-10-20" },
    ];
    return NextResponse.json(data);
}
