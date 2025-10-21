import { NextResponse } from 'next/server';

// Define the expected structure of your event data
interface EventItem {
    id: string;
    title: string;
    start: string;
    end: string;
    imageUrl: string;
    description: string;
}

// ⚠️ MOCK DATA: In a real application, replace this with a database query.
const MOCK_EVENTS: EventItem[] = [
    {
        id: "1",
        title: "Sunday Service",
        start: "2025-10-20T10:00:00",
        end: "2025-10-20T12:00:00",
        imageUrl: "/events/event_1.jpg",
        description: "Join us for our weekly worship service."
    },
    {
        id: "2",
        title: "Youth Bible Study",
        start: "2025-10-23T18:30:00",
        end: "2025-10-23T20:00:00",
        imageUrl: "/events/event_2.jpg",
        description: "A fun and insightful Bible study for all youth."
    }
    // Add all your events here
];

// Handle GET requests to /api/events/[eventId]
export async function GET(
    request: Request,
    // The eventId is available in the params object
    context: { params: Promise<{ eventId: string }> }
) {
    const { eventId } = await context.params;

    // 1. Find the event
    const event = MOCK_EVENTS.find(e => e.id === eventId);

    // 2. Handle 'Not Found'
    if (!event) {
        // Returns a 404 response if the event ID is not found
        return NextResponse.json(
            { error: `Event with ID ${eventId} not found` },
            { status: 404 }
        );
    }

    // 3. Build absolute URL for the image so clients get the correct path
    // const absoluteImageUrl = `${origin}${event.imageUrl}`;
    // const eventWithFullImage = {
    //     ...event,
    //     imageUrl: absoluteImageUrl, // e.g. https://your-site.com/event/event_1.jpg
    // };
    
    // 4. Return the event data
    // Returns a 200 OK response with the event data
    return NextResponse.json(event);
}