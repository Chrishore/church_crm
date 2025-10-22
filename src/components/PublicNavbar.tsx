'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PublicNavbarProps {
  onDonateClick: () => void;
}

export default function PublicNavbar({ onDonateClick }: PublicNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-primary text-white">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Left: Church Name */}
          <div className="font-bold text-xl md:text-2xl">
            ChurchCRM
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex gap-5 items-center">
            <Link
              href="/calendar"
              className="px-4 py-2 rounded border border-accent hover:bg-white/10 transition-colors"
            >
              Calendar
            </Link>
            <button
              onClick={onDonateClick}
              className="px-4 py-2 rounded border border-accent hover:bg-white/10 transition-colors"
            >
              Donate
            </button>
            <Link
              href="/login"
              className="px-4 py-2 rounded border border-accent hover:bg-white/10 transition-colors"
            >
              Member Login
            </Link>
          </div>

          {/* Mobile Hamburger - Right */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-8 h-6 flex flex-col justify-between"
          >
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
          />

          {/* Drawer from LEFT */}
          <div 
            className="fixed left-0 top-0 h-full w-[280px] text-white z-20 md:hidden shadow-2xl transform transition-transform duration-300"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-border">
              <h2 className="text-lg font-bold">Navigation</h2>
              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-colors"
              >
                ×
              </button>
            </div>

            {/* Nav Items */}
            <nav className="p-4 flex flex-col gap-2">
              <Link
                href="/calendar"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-md hover:opacity-80 transition-colors"
              >
                Calendar
              </Link>
              <button
                onClick={() => {
                  closeMobileMenu();
                  onDonateClick();
                }}
                className="px-4 py-3 rounded-md hover:opacity-80 transition-colors text-left"
              >
                Donate
              </button>
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-md hover:opacity-80 transition-colors"
              >
                Member Login
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
