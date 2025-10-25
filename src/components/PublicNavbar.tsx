'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut } from 'lucide-react';

interface PublicNavbarProps {
  onDonateClick: () => void;
}

type DropdownType = 'about' | 'events' | null;

export default function PublicNavbar({ onDonateClick }: PublicNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [isDesktop, setIsDesktop] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('church_crm_session='));
      return !!sessionCookie;
    };

    const authenticated = checkAuth();
    setIsAuthenticated(authenticated);

    // Fetch user data if authenticated
    if (authenticated) {
      fetch('/api/auth/user')
        .then(res => res.json())
        .then(data => {
          if (data.name) {
            setUserName(data.name);
          } else if (data.username) {
            setUserName(data.username);
          }
        })
        .catch(err => console.error('Failed to fetch user data:', err));
    }
  }, []);

  // Detect desktop vs mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleDropdownToggle = (dropdown: 'about' | 'events') => {
    if (!isDesktop) {
      // Mobile: toggle on click
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    }
  };

  const handleDropdownHover = (dropdown: 'about' | 'events' | null) => {
    if (isDesktop) {
      // Desktop: open on hover
      setOpenDropdown(dropdown);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        setIsAuthenticated(false);
        router.push('/');
      } else {
        alert('Logout failed, please try again');
        setLoggingOut(false);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed, please try again');
      setLoggingOut(false);
    }
  };

  const aboutDropdownItems = [
    { label: 'Our Story', href: '/about/story' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Contact', href: '/about/contact' },
  ];

  const eventsDropdownItems = [
    { label: 'Weekly Services', href: '/events/services' },
    { label: 'Special Events', href: '/events/special' },
    { label: 'Community', href: '/events/community' },
  ];

  return (
    <>
      <nav className="bg-primary text-white sticky top-0 z-50 border-b border-white/20" style={{ height: '64px' }}>
        <div className="px-[30px] h-full flex justify-between items-center">
          {/* Left: Church Name */}
          <div className="font-bold text-xl md:text-2xl">
            <Link href="/">ChurchCRM</Link>
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex gap-2 items-center" ref={dropdownRef}>
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('about')}
              onMouseLeave={() => handleDropdownHover(null)}
            >
              <button
                onClick={() => handleDropdownToggle('about')}
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-white/10 transition-all duration-200"
              >
                <span>About</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ease-in-out ${
                    openDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openDropdown === 'about' && (
                <div className="absolute left-0 mt-2 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-300 z-[100]">
                  {aboutDropdownItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors ${
                        index !== aboutDropdownItems.length - 1 ? 'border-b border-gray-300' : ''
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${
                        index === aboutDropdownItems.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Calendar Link */}
            <Link
              href="/calendar"
              className="px-3 py-2 rounded hover:bg-white/10 transition-all duration-200"
            >
              Calendar
            </Link>

            {/* Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownHover('events')}
              onMouseLeave={() => handleDropdownHover(null)}
            >
              <button
                onClick={() => handleDropdownToggle('events')}
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-white/10 transition-all duration-200"
              >
                <span>Events</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ease-in-out ${
                    openDropdown === 'events' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openDropdown === 'events' && (
                <div className="absolute left-0 mt-2 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-300 z-[100]">
                  {eventsDropdownItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors ${
                        index !== eventsDropdownItems.length - 1 ? 'border-b border-gray-300' : ''
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${
                        index === eventsDropdownItems.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Donate Button */}
            <button
              onClick={onDonateClick}
              className="px-3 py-2 rounded hover:bg-white/10 transition-all duration-200"
            >
              Donate
            </button>

            {/* Authentication Section */}
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="ml-2 px-5 py-2 bg-white text-primary rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l-2 border-white/30">
                <span className="font-semibold">{userName}</span>
                <Link
                  href="/members"
                  className="px-4 py-2 bg-white text-primary rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Member
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-white text-primary rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="px-4 py-2 bg-white text-primary rounded-md font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
                >
                  {loggingOut ? 'Logging out...' : (
                    <>
                      <LogOut size={16} />
                      Logout
                    </>
                  )}
                </button>
              </div>
            )}
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
            className="fixed inset-0 bg-black/70 z-10 md:hidden"
          />

          {/* Drawer from LEFT */}
          <div 
            className="fixed left-0 top-0 h-full w-[280px] bg-primary text-white z-20 md:hidden shadow-2xl transform transition-transform duration-300 overflow-y-auto"
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
              {/* About Dropdown - Mobile */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('about')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-md hover:opacity-80 transition-colors min-h-[44px]"
                >
                  <span>About</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ease-in-out ${
                      openDropdown === 'about' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === 'about' && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {aboutDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="px-4 py-2 text-sm hover:opacity-80 transition-colors min-h-[44px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Calendar Link - Mobile */}
              <Link
                href="/calendar"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-md hover:opacity-80 transition-colors min-h-[44px]"
              >
                Calendar
              </Link>

              {/* Events Dropdown - Mobile */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('events')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-md hover:opacity-80 transition-colors min-h-[44px]"
                >
                  <span>Events</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ease-in-out ${
                      openDropdown === 'events' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === 'events' && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {eventsDropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="px-4 py-2 text-sm hover:opacity-80 transition-colors min-h-[44px] flex items-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Donate Button - Mobile */}
              <button
                onClick={() => {
                  closeMobileMenu();
                  onDonateClick();
                }}
                className="px-4 py-3 rounded-md hover:opacity-80 transition-colors text-left min-h-[44px]"
              >
                Donate
              </button>

              {/* Authentication Section - Mobile */}
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="px-4 py-3 rounded-md bg-white/20 hover:bg-white/30 transition-colors text-center font-medium min-h-[44px] flex items-center justify-center"
                >
                  Sign In
                </Link>
              ) : (
                <div className="mt-4 pt-4 border-t border-white/30 flex flex-col gap-2">
                  <div className="px-4 py-2 font-semibold text-center">
                    {userName}
                  </div>
                  <Link
                    href="/members"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-md bg-white/20 hover:bg-white/30 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Member
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-md bg-white/20 hover:bg-white/30 transition-colors text-center min-h-[44px] flex items-center justify-center"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="px-4 py-3 rounded-md bg-white/20 hover:bg-white/30 transition-colors text-center font-medium min-h-[44px] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loggingOut ? 'Logging out...' : (
                      <>
                        <LogOut size={16} />
                        Logout
                      </>
                    )}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
