import { NextResponse } from "next/server";

export async function GET() {
    const events = [
        {
            id: "1",
            title: "Sunday Worship Service",
            start: "2025-10-20",
            end: "2025-10-20",
            description: "Join us for our Sunday morning worship service.",
            image: "https://via.placeholder.com/600x400?text=Sunday+Worship+Poster"
        },
        {
            id: "2",
            title: "Youth Fellowship",
            start: "2025-10-22",
            end: "2025-10-22",
            description: "An evening gathering for youth members with games, worship, and snacks.",
            image: "https://via.placeholder.com/600x400?text=Youth+Fellowship+Poster"
        },
        {
            id: "3",
            title: "Thanksgiving Event",
            start: "2025-10-25",
            end: "2025-10-25",
            description: "Special thanksgiving celebration with potluck dinner.",
            image: "https://via.placeholder.com/600x400?text=Thanksgiving+Poster"
        },
    ];

    return NextResponse.json(events);
}
