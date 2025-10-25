'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import DonateModal from '@/components/DonateModal';
import Image from 'next/image'

export default function Home() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const imageSrc = "/landing/2.jpg";
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-main)' }}>
      {/* Public Navigation */}
      <PublicNavbar onDonateClick={() => setDonateModalOpen(true)} />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Content */}
        <div className="flex-1 px-5 py-8 md:px-20 md:py-20 bg-surface flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-textPrimary mb-4 md:mb-6">
            Welcome to ChurchCRM
          </h1>
          <p className="text-sm md:text-lg text-textSecondary mb-6 md:mb-8 leading-relaxed">
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
              className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold transition-colors text-center hover:opacity-80"
            >
              View Events
            </Link>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="flex-1 h-48 md:h-[500px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-center px-4">
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt="Church Image"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Section - Feature Cards */}
      <div className="bg-surface px-5 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Card 1 */}
            <div style={{ backgroundColor: 'var(--color-bg-main)' }} className="border border-border rounded-lg p-5 md:p-8 transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl focus-visible:scale-105">
              <h3 className="text-accent font-semibold text-base mb-2">
                Weekly Services
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                Join us every Sunday at 10 AM for worship, prayer, and community. Experience uplifting music and inspiring messages.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{ backgroundColor: 'var(--color-bg-main)' }} className="border border-border rounded-lg p-5 md:p-8 transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl focus-visible:scale-105">
              <h3 className="text-accent font-semibold text-base mb-2">
                Community
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                Connect through small groups and events. Build meaningful relationships and grow together in faith.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{ backgroundColor: 'var(--color-bg-main)' }} className="border border-border rounded-lg p-5 md:p-8 transition-all duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl focus-visible:scale-105">
              <h3 className="text-accent font-semibold text-base mb-2">
                Get Involved
              </h3>
              <p className="text-textSecondary text-sm leading-relaxed">
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