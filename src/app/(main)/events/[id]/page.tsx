// src/app/(main)/events/[id]/page.tsx
// This file is a Server Component by default, so no 'use client' is needed.

import { notFound } from "next/navigation";
import Image from 'next/image'
import BackButton from "../BackButton";

// 1. Interface Definition (can be moved to a shared type file)
interface EventItem {
    id: string;
    title: string;
    start: string;
    end: string;
    imageUrl: string; // The full absolute URL is expected from the API
    description: string;
}

// 2. Data Fetching Function (Server-side)
async function getEvent(id: string): Promise<EventItem | null> {
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/events/${id}`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return null;
    }
    return res.json();
}

// 3. Server Component Page Function
export default async function EventPage({ params }: { params: { id: string } }) {

    // Access params.id directly here—it's safe and recommended in a Server Component
    const event = await getEvent(params.id);

    if (!event) {
        return notFound();
    }

    // Helper function to format the dates
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const formattedStart = formatDate(event.start);
    const formattedEnd = formatDate(event.end);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-2xl w-full">

                <div className="w-full">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        width={100}
                        height={100}
                        className="w-full object-cover"
                        priority
                    />
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
                    <p className="text-gray-500 mb-4">
                        {event.start === event.end ? formattedStart : `${formattedStart} → ${formattedEnd}`}
                    </p>
                    <p className="text-gray-700">{event.description}</p>
                    <BackButton />
                </div>
            </div>
        </div>
    );
}

