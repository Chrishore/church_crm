"use client";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRouter } from "next/navigation";
import PublicNavbar from "@/components/PublicNavbar";
import DonateModal from "@/components/DonateModal";
import Link from "next/link";

interface EventItem {
    id: string;
    title: string;
    start: string;
    end: string;
}

export default function CalendarPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [donateModalOpen, setDonateModalOpen] = useState(false);
    const router = useRouter();

    // Check authentication status
    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('/api/auth/check', { credentials: 'include' });
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        }
        checkAuth();
    }, []);

    useEffect(() => {
        async function fetchEvents() {
            const res = await fetch("/api/events");
            const data = await res.json();
            setEvents(data);
        }
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a]">
            {/* Public Navigation */}
            <PublicNavbar onDonateClick={() => setDonateModalOpen(true)} />

            <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-textPrimary dark:text-[#f1f5f9]">
                        Church Events Calendar
                    </h1>

                    {isAuthenticated ? (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="text-sm text-textSecondary dark:text-[#cbd5e1]">
                            <Link href="/login" className="text-primary dark:text-accent hover:underline font-medium">
                                Login
                            </Link>
                            {" "}to manage events
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-surface p-4 rounded-xl shadow-lg border border-border dark:border-[#334155]">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        eventClick={(info) => {
                            info.jsEvent.preventDefault();
                            const eventId = info.event.id;
                            if (eventId && isAuthenticated) {
                                router.push(`/events/${eventId}`);
                            }
                        }}
                        height="auto"
                        contentHeight="600px"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,dayGridWeek'
                        }}
                        eventClassNames="cursor-pointer"
                    />
                </div>

                {!isAuthenticated && (
                    <div className="mt-4 p-4 bg-surface dark:bg-[#1e293b] border border-border dark:border-[#334155] rounded-lg text-center">
                        <p className="text-textSecondary dark:text-[#cbd5e1] text-sm">
                            Viewing calendar in read-only mode.
                            <Link href="/login" className="text-primary dark:text-accent hover:underline font-medium ml-1">
                                Login
                            </Link>
                            {" "}to add or manage events.
                        </p>
                    </div>
                )}
            </div>

            {/* Donate Modal */}
            <DonateModal
                isOpen={donateModalOpen}
                onClose={() => setDonateModalOpen(false)}
            />
        </div>
    );
}
