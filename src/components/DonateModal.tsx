'use client';

import { useEffect } from 'react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-10 bg-[rgba(15,23,42,0.75)]"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-[500px] w-full bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
      >
        {/* Header */}
        <div className="relative bg-primary text-white px-6 py-6 rounded-t-xl">
          <h2 id="donate-modal-title" className="text-2xl font-bold mb-1">
            Support Our Mission
          </h2>
          <p className="text-sm opacity-90">
            Your generosity helps us serve our community
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Info Section */}
          <div className="mb-6">
            <h3 className="text-primary dark:text-accent text-base font-semibold mb-2">
              Make a Donation
            </h3>
            <p className="text-textSecondary dark:text-[#cbd5e1] text-sm leading-relaxed">
              Thank you for your interest in supporting our church. Your contributions help us continue our mission and serve our community with love and compassion.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            {/* Online Payment Button */}
            <button className="flex-1 bg-surface dark:bg-[#1e293b] border-2 border-border dark:border-[#334155] rounded-lg p-4 hover:bg-[#e0e7ff] dark:hover:bg-[#334155] transition-colors text-left">
              <div className="font-semibold text-primary dark:text-accent mb-1">
                Online Payment
              </div>
              <div className="text-sm text-textSecondary dark:text-[#cbd5e1]">
                Via PayPal or Card
              </div>
            </button>

            {/* Bank Transfer Button */}
            <button className="flex-1 bg-surface dark:bg-[#1e293b] border-2 border-border dark:border-[#334155] rounded-lg p-4 hover:bg-[#e0e7ff] dark:hover:bg-[#334155] transition-colors text-left">
              <div className="font-semibold text-primary dark:text-accent mb-1">
                Bank Transfer
              </div>
              <div className="text-sm text-textSecondary dark:text-[#cbd5e1]">
                Direct deposit
              </div>
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-surface dark:bg-[#1e293b] border border-border dark:border-[#334155] rounded-lg p-4">
            <div className="font-semibold text-textPrimary dark:text-[#f1f5f9] text-sm mb-2">
              Other Ways to Give
            </div>
            <div className="text-textSecondary dark:text-[#cbd5e1] text-xs leading-relaxed space-y-1">
              <div>[Church Address]</div>
              <div>Email: donations@church.org</div>
              <div>Phone: (555) 123-4567</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
