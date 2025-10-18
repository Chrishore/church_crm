"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Calendar,
    LayoutDashboard,
    Users,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Members", href: "/members", icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed && <h1 className="text-xl font-bold">ChurchCRM</h1>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1">
                {navItems.map(({ name, href, icon: Icon }) => {
                    const active = pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${active
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1"
                                }`}
                        >
                            <Icon size={20} />
                            {!collapsed && <span>{name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
                {!collapsed && <span>v1.0.0</span>}
            </div>
        </aside>
    );
}
