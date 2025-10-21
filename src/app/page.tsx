'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import DonateModal from '@/components/DonateModal';

export default function Home() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a]">
      {/* Public Navigation */}
      <PublicNavbar onDonateClick={() => setDonateModalOpen(true)} />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Content */}
        <div className="flex-1 px-5 py-8 md:px-20 md:py-20 bg-white dark:bg-[#1e293b] flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-textPrimary dark:text-[#f1f5f9] mb-4 md:mb-6">
            Welcome to ChurchCRM
          </h1>
          <p className="text-sm md:text-lg text-textSecondary dark:text-[#cbd5e1] mb-6 md:mb-8 leading-relaxed">
            Join us in worship, fellowship, and service. Together we grow in faith and make a difference in our community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setDonateModalOpen(true)}
              className="px-6 py-3 bg-primary hover:bg-secondary text-white rounded-lg font-semibold transition-colors"
            >
              Support Our Mission
            </button>
            <Link
              href="/calendar"
              className="px-6 py-3 border-2 border-primary dark:border-accent text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/10 rounded-lg font-semibold transition-colors text-center"
            >
              View Events
            </Link>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="flex-1 h-48 md:h-[500px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-center px-4">
          <div className="text-lg md:text-xl opacity-75">
            [Church Image / Cross / Stained Glass]
          </div>
        </div>
      </div>

      {/* Content Section - Feature Cards */}
      <div className="bg-surface dark:bg-[#1e293b] px-5 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-surface border border-border dark:border-[#334155] rounded-lg p-5 md:p-8">
              <h3 className="text-primary dark:text-accent font-semibold text-base mb-2">
                Weekly Services
              </h3>
              <p className="text-textSecondary dark:text-[#cbd5e1] text-sm leading-relaxed">
                Join us every Sunday at 10 AM for worship, prayer, and community. Experience uplifting music and inspiring messages.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-surface border border-border dark:border-[#334155] rounded-lg p-5 md:p-8">
              <h3 className="text-primary dark:text-accent font-semibold text-base mb-2">
                Community
              </h3>
              <p className="text-textSecondary dark:text-[#cbd5e1] text-sm leading-relaxed">
                Connect through small groups and events. Build meaningful relationships and grow together in faith.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-surface border border-border dark:border-[#334155] rounded-lg p-5 md:p-8">
              <h3 className="text-primary dark:text-accent font-semibold text-base mb-2">
                Get Involved
              </h3>
              <p className="text-textSecondary dark:text-[#cbd5e1] text-sm leading-relaxed">
                Serve and make a difference together. Discover opportunities to use your gifts and serve our community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      <DonateModal 
        isOpen={donateModalOpen} 
        onClose={() => setDonateModalOpen(false)} 
      />
    </div>
  );
}
