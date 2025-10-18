import { NextResponse } from "next/server";

export async function GET() {
    const data = { total: 27 };
    return NextResponse.json(data);
}
