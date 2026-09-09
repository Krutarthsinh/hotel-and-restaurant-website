import React, { useState } from 'react';
import { PageView } from '../types';
import { HOTEL_LOGO_URL } from '../data/hotelData';

interface NavigationHeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Rooms & Suites', page: 'rooms-suites' },
    { label: 'Dining', page: 'dining' },
    { label: 'Wellness & Spa', page: 'wellness' },
    { label: 'Experiences', page: 'experiences' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#eae8e5]/60 transition-all">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo & Title */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 shrink-0 cursor-pointer group"
          id="header-brand-logo"
        >
          <img
            alt="The Grand Aurelia Hotel Logo"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src={HOTEL_LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline text-lg tracking-wide text-primary leading-tight uppercase font-medium">
              The Grand Aurelia
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-secondary font-semibold">
              Amalfi Coast
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 h-full">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-xs font-label uppercase tracking-[0.14em] py-2 transition-all cursor-pointer ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-secondary'
                    : 'text-on-surface-variant hover:text-primary font-medium'
                }`}
                id={`nav-link-${link.page}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Admin Portal Gateway Link */}
          <button
            onClick={() => onNavigate('admin-operations')}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-label uppercase tracking-[0.12em] px-2.5 py-1.5 rounded text-secondary hover:text-primary hover:bg-surface-container transition-all cursor-pointer"
            id="nav-admin-portal-link"
            title="Switch to Hotelier Management Desk"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Admin Portal</span>
          </button>

          {/* Book Your Stay CTA */}
          <button
            onClick={onOpenBooking}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded bg-primary text-on-primary font-label text-xs uppercase tracking-[0.14em] hover:bg-neutral-800 transition-all shadow-sm font-semibold cursor-pointer group"
            id="nav-book-stay-cta"
          >
            <span>Book Your Stay</span>
            <span className="material-symbols-outlined text-[15px] ml-1 group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>

          {/* Guest Account / Switch Button */}
          <button
            onClick={() => onNavigate('admin-reservations')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-secondary transition-colors cursor-pointer"
            title="Hotel Staff Sign-In"
            id="nav-profile-icon"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded hover:bg-surface-container text-on-surface cursor-pointer"
            id="mobile-menu-button"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fbf9f6] border-b border-surface-container-high px-6 py-6 shadow-xl space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-label uppercase tracking-widest py-2 px-3 rounded transition-colors ${
                  currentPage === link.page
                    ? 'bg-secondary-container text-on-secondary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-surface-container-high flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('admin-operations');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded bg-surface-container-high text-xs font-label uppercase tracking-wider font-semibold text-primary flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
              Open Admin Portal
            </button>
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded bg-primary text-on-primary text-xs font-label uppercase tracking-wider font-semibold"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
