import React, { useState } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminTopHeaderProps {
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
  onOpenSupabaseModal?: () => void;
}

export const AdminTopHeader: React.FC<AdminTopHeaderProps> = ({
  onOpenSearch,
  onOpenSupabaseModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-6 lg:px-8 border-b border-surface-container-highest">
      <div className="flex items-center gap-4 text-xs font-label uppercase tracking-widest text-secondary font-medium">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">
            verified_user
          </span>
          <span className="font-semibold text-primary">Property Ops Live</span>
        </div>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
        <span className="hidden sm:inline-block text-[11px] text-on-surface-variant font-normal">
          Positano Estates • Central PMS
        </span>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Supabase Connection Status Badge */}
        <button
          onClick={onOpenSupabaseModal}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-label font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            isSupabaseConfigured
              ? 'bg-[#3ECF8E]/10 border-[#3ECF8E]/40 text-[#228355] hover:bg-[#3ECF8E]/20'
              : 'bg-amber-500/10 border-amber-500/40 text-amber-700 hover:bg-amber-500/20'
          }`}
          title="Supabase Database Status & Schema Hub"
          id="supabase-status-pill"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isSupabaseConfigured ? 'bg-[#3ECF8E]' : 'bg-amber-500'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isSupabaseConfigured ? 'bg-[#3ECF8E]' : 'bg-amber-500'
              }`}
            ></span>
          </span>
          <span className="hidden md:inline">
            {isSupabaseConfigured ? 'Supabase Live' : 'Supabase Config'}
          </span>
        </button>

        {/* Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          title="Search Reservations & Suites"
          id="admin-topbar-search-btn"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer relative"
            title="Operational Notifications"
            id="admin-topbar-notifications-btn"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-highest p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high mb-3">
                <span className="text-xs font-label uppercase tracking-wider font-bold text-primary">
                  Operational Broadcasts
                </span>
                <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold">
                  3 New
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded bg-surface-container-low flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                    sailing
                  </span>
                  <div>
                    <span className="font-semibold block text-primary">Riva Tender Docking</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Riva 48 arriving with VIP Patron Marc-Antoine in 15 mins.
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-surface-container-low flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                    hotel
                  </span>
                  <div>
                    <span className="font-semibold block text-primary">Suite 402 Inspected</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Aurelia Penthouse sealed for Baroness Caroline von Essen.
                    </span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-surface-container-low flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                    restaurant
                  </span>
                  <div>
                    <span className="font-semibold block text-primary">Dinner Covers Full</span>
                    <span className="text-[11px] text-on-surface-variant">
                      Il Tramonto reached 74 maximum capacity for 19:00 service.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary cursor-pointer shadow-xs"
          title="Duty Manager"
        >
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
};
