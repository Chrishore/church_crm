import { NextResponse } from "next/server";

export async function GET() {
    const data = { total: 2 };
    return NextResponse.json(data);
}
