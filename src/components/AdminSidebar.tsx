import React from 'react';
import { PageView } from '../types';
import { HOTEL_LOGO_URL } from '../data/hotelData';

interface AdminSidebarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenSupabaseModal?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenSupabaseModal,
}) => {
  const adminLinks = [
    {
      label: 'Folio & Bookings',
      page: 'admin-reservations' as PageView,
      icon: 'calendar_month',
    },
    {
      label: 'Suite Inventory',
      page: 'admin-inventory' as PageView,
      icon: 'king_bed',
    },
    {
      label: 'Performance & Yield',
      page: 'admin-operations' as PageView,
      icon: 'payments',
    },
    {
      label: 'Table Seating',
      page: 'dining' as PageView,
      icon: 'restaurant',
    },
    {
      label: 'Guest Logistics',
      page: 'experiences' as PageView,
      icon: 'room_service',
    },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-50 flex flex-col justify-between py-6 border-r border-surface-container-highest"
      id="admin-sidebar"
    >
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div
          onClick={() => onNavigate('home')}
          className="px-6 flex items-center gap-3 cursor-pointer group"
          id="admin-brand-header"
        >
          <img
            alt="The Grand Aurelia Hotel Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={HOTEL_LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="font-headline text-base tracking-wide text-primary leading-tight uppercase font-medium">
              The Grand Aurelia
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.2em] text-secondary font-semibold">
              Hotelier Desk
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 space-y-1.5" id="admin-nav-menu">
          {adminLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-label uppercase tracking-wider transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
                id={`admin-link-${link.page}`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </button>
            );
          })}

          {onOpenSupabaseModal && (
            <button
              onClick={onOpenSupabaseModal}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-label uppercase tracking-wider transition-colors text-left text-on-surface-variant hover:bg-[#3ECF8E]/10 hover:text-[#228355] cursor-pointer mt-3 border border-dashed border-[#3ECF8E]/40"
              id="admin-link-supabase"
            >
              <svg className="w-4 h-4 fill-[#3ECF8E] shrink-0" viewBox="0 0 24 24">
                <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.108 13.916a.396.396 0 0 0 .316.643H12v8.958a.396.396 0 0 0 .716.233l11.176-13.753a.396.396 0 0 0-.53-.643z"/>
              </svg>
              <span className="font-semibold">Supabase Cloud</span>
            </button>
          )}
        </nav>
      </div>

      {/* Footer Area with Storefront Return & Duty Manager profile */}
      <div className="px-6 border-t border-surface-container-highest pt-4 space-y-3">
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center gap-2 text-xs font-label uppercase tracking-wider text-secondary hover:text-primary transition-colors cursor-pointer group"
          id="admin-return-storefront"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">
            west
          </span>
          <span>Public Storefront</span>
        </button>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-on-surface">Concierge Chief</span>
            <span className="text-[10px] text-on-surface-variant">Duty Manager (Active)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
