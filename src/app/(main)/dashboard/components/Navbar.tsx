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
        <div className="flex justify-between items-center bg-white dark:bg-surface border-b border-border dark:border-[#334155] px-6 py-3">
            <div className="flex items-center gap-3">
                {/* Mobile Hamburger - Left Side */}
                <button
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="md:hidden p-2 hover:bg-surface dark:hover:bg-[#334155] rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6 text-textPrimary dark:text-[#f1f5f9]" />
                </button>
                
                <h1 className="text-lg font-semibold text-textPrimary dark:text-[#f1f5f9]">
                    Welcome to ChurchCRM
                </h1>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="text-textSecondary dark:text-[#cbd5e1] hidden sm:inline">Church Admin</span>
                <img src="/icons/user.svg" alt="user" className="w-8 h-8 rounded-full" />
                <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="p-2 hover:bg-surface dark:hover:bg-[#334155] rounded-full transition-colors"
                >
                    <LogOut className="w-5 h-5 text-textSecondary dark:text-[#cbd5e1]" />
                </button>
            </div>
        </div>
    );
}
