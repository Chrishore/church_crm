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

interface SidebarProps {
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    onClick={onMobileClose}
                    className="fixed inset-0 bg-black/70 z-20 md:hidden"
                />
            )}

            {/* Sidebar */}
            <>
                {/* Mobile Backdrop */}
                {mobileOpen && (
                    <div
                        onClick={onMobileClose}
                        className="fixed inset-0 bg-black/70 z-20 md:hidden"
                    />
                )}
                {/* Sidebar */}
                <aside
                    className={`
                        h-screen flex flex-col transition-all duration-300
                        md:relative md:translate-x-0
                        fixed top-0 left-0 z-30
                        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                        ${collapsed ? "w-20" : "w-64 md:w-64"}
                        bg-surface md:bg-surface/95 md:backdrop-blur-md border-r border-border
                        shadow-lg
                    `}
                >


                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        {!collapsed && <h1 className="text-xl font-bold text-textPrimary">ChurchCRM</h1>}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-lg hover:opacity-80 transition-colors text-textPrimary"
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
                                    onClick={() => onMobileClose?.()}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${active
                                        ? "bg-primary text-white"
                                        : "text-textSecondary hover:bg-surface hover:text-textPrimary hover:translate-x-1"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {!collapsed && <span>{name}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                    {/* Footer */}
                    <div className="p-4 text-xs text-textSecondary opacity-60 border-t border-border">
                        {!collapsed && <span>v1.0.0</span>}
                    </div>
                </aside>
            </>
        </>
    );
}
