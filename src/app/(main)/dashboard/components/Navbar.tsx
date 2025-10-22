'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Menu } from 'lucide-react';

interface NavbarProps {
    onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div
            className="flex justify-between items-center border-b border-border px-6 py-3"
            style={{ backgroundColor: 'var(--color-surface)' }}
        >
            <div className="flex items-center gap-3">
                {/* Mobile Hamburger - Left Side */}
                <button
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="md:hidden p-2 hover:opacity-80 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" style={{ color: 'var(--color-textPrimary)' }} />
                </button>

                <h1 className="text-lg font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                    Welcome to ChurchCRM
                </h1>
            </div>

            <div className="flex items-center gap-4">
                 <span className="text-textSecondary hidden sm:inline">Church Admin</span>
                <img src="/icons/user.svg" alt="user" className="w-8 h-8 rounded-full" />
                <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="p-2 hover:opacity-80 rounded-full transition-colors"
                >
                    <LogOut className="w-5 h-5 text-textSecondary" />
                </button>
            </div>
        </div>
    );
}
