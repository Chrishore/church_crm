"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRouter } from "next/navigation";


interface EventItem {
    id: string;
    title: string;
    start: string;
    end: string;
}

export default function CalendarPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchEvents() {
            const res = await fetch("/api/events");
            const data = await res.json();
            setEvents(data);
        }
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Church Events Calendar</h1>

            <div className="bg-white p-4 rounded-xl shadow">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={(info) => {
                        info.jsEvent.preventDefault();
                        const eventId = info.event.id;
                        if (eventId) {
                            router.push(`/events/${eventId}`);
                        }
                    }}
                    height="80vh"
                />
            </div>
        </div>
    );
}
