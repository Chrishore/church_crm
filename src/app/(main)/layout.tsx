'use client';

import { useState } from 'react';
import Sidebar from "./dashboard/components/Sidebar";
import PublicNavbar from "@/components/PublicNavbar";
import DonateModal from "@/components/DonateModal";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [donateModalOpen, setDonateModalOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar
                mobileOpen={mobileMenuOpen}
                onMobileClose={() => setMobileMenuOpen(false)}
            />
            <div
                className="flex-1 flex flex-col"
                style={{ backgroundColor: 'var(--color-bg-main)' }}
            >
                <PublicNavbar onDonateClick={() => setDonateModalOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                    <Toaster position="top-right" />
                </main>
            </div>
            <DonateModal
                isOpen={donateModalOpen}
                onClose={() => setDonateModalOpen(false)}
            />
        </div>
    );
}
