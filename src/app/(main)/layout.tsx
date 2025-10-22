'use client';

import { useState } from 'react';
import Sidebar from "./dashboard/components/Sidebar";
import Navbar from "./dashboard/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                    <Toaster position="top-right" />
                </main>
            </div>
        </div>
    );
}
