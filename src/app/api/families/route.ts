import { NextResponse } from "next/server";

export async function GET() {
    const data = { total: 5 };
    return NextResponse.json(data);
}
