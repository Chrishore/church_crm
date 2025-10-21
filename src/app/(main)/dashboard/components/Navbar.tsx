'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="flex justify-between items-center bg-white shadow px-6 py-3">
            <h1 className="text-lg font-semibold">Welcome to ChurchCRM</h1>
            <div className="flex items-center gap-4">
                <span>Church Admin</span>
                <img src="/icons/user.svg" alt="user" className="w-8 h-8 rounded-full" />
                <button
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <LogOut className="w-5 h-5 text-gray-600" />
                </button>
            </div>
        </div>
    );
}
