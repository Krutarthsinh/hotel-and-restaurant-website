import React, { useState } from 'react';
import { isSupabaseConfigured, SUPABASE_SQL_SCHEMA, seedReservationsIfEmpty } from '../lib/supabase';
import { INITIAL_RESERVATIONS } from '../data/hotelData';

interface SupabaseModalProps {
  onClose: () => void;
  onRefreshData?: () => void;
  onShowToast: (msg: string) => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  onClose,
  onRefreshData,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    onShowToast('Supabase SQL Schema copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSeedData = async () => {
    setSeeding(true);
    const seeded = await seedReservationsIfEmpty(INITIAL_RESERVATIONS);
    setSeeding(false);
    if (seeded) {
      onShowToast('Successfully synced 8 initial reservations to your Supabase database!');
      if (onRefreshData) onRefreshData();
    } else {
      onShowToast('Table already contains records or Supabase is not yet reachable.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-surface-container-low border-b border-surface-container-highest flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3ECF8E]/15 text-[#3ECF8E] flex items-center justify-center font-bold text-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L.108 13.916a.396.396 0 0 0 .316.643H12v8.958a.396.396 0 0 0 .716.233l11.176-13.753a.396.396 0 0 0-.53-.643z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-headline text-lg font-semibold text-primary">
                Supabase Integration Hub
              </h2>
              <span className="text-[11px] font-label uppercase tracking-wider text-on-surface-variant">
                PostgreSQL • Realtime • Cloud PMS Ledger
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs font-body">
          {/* Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isSupabaseConfigured
                ? 'bg-[#3ECF8E]/10 border-[#3ECF8E]/30 text-primary'
                : 'bg-amber-500/10 border-amber-500/30 text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSupabaseConfigured ? 'bg-[#3ECF8E]' : 'bg-amber-500'
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${
                    isSupabaseConfigured ? 'bg-[#3ECF8E]' : 'bg-amber-500'
                  }`}
                ></span>
              </span>
              <div>
                <span className="font-semibold block text-sm">
                  {isSupabaseConfigured ? 'Supabase Connected & Active' : 'Supabase Environment Keys Needed'}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  {isSupabaseConfigured
                    ? `Project Endpoint: ${supabaseUrl}`
                    : 'Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Settings / environment.'}
                </span>
              </div>
            </div>

            {isSupabaseConfigured && (
              <button
                onClick={handleSeedData}
                disabled={seeding}
                className="px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-surface-container-highest hover:bg-surface-container text-[11px] font-label uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50 transition-colors"
              >
                {seeding ? 'Syncing...' : 'Seed Initial Data'}
              </button>
            )}
          </div>

          {/* Quick Step Guide */}
          <div className="space-y-3">
            <h3 className="font-headline text-sm font-semibold text-primary uppercase tracking-wide">
              Quick Setup Instructions
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-on-surface-variant">
              <li>
                In your{' '}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary underline font-medium hover:text-primary"
                >
                  Supabase Project Dashboard
                </a>
                , open the <strong>SQL Editor</strong>.
              </li>
              <li>
                Click the <strong>Copy SQL Schema</strong> button below and paste the SQL script into Supabase.
              </li>
              <li>
                Run the script. It creates the <code className="bg-surface-container px-1 py-0.5 rounded text-primary">reservations</code>, <code className="bg-surface-container px-1 py-0.5 rounded text-primary">contact_inquiries</code>, and <code className="bg-surface-container px-1 py-0.5 rounded text-primary">dining_reservations</code> tables with Row Level Security and Realtime enabled.
              </li>
              <li>
                Ensure your project environment has <code className="bg-surface-container px-1 py-0.5 rounded text-primary">VITE_SUPABASE_URL</code> and <code className="bg-surface-container px-1 py-0.5 rounded text-primary">VITE_SUPABASE_ANON_KEY</code> configured.
              </li>
            </ol>
          </div>

          {/* SQL Snippet Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
                PostgreSQL DDL &amp; RLS Policies (Ready to Execute)
              </span>
              <button
                onClick={handleCopySql}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#3ECF8E] hover:bg-[#34b27b] text-white font-label text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied!' : 'Copy SQL Schema'}</span>
              </button>
            </div>
            <pre className="p-4 bg-surface-container-lowest border border-surface-container-highest rounded-xl text-[11px] font-mono text-on-surface overflow-x-auto max-h-56 leading-relaxed">
              {SUPABASE_SQL_SCHEMA}
            </pre>
          </div>

          {/* Realtime note */}
          <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-highest/60 text-on-surface-variant flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
              sync
            </span>
            <p className="text-[11px] leading-relaxed">
              <strong>Real-Time Sync Active:</strong> When Supabase is configured, all new bookings from the public storefront, walk-ins registered at the front desk, and status updates (Checked-In, Departed) automatically sync live across all active devices via PostgreSQL change streams.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-highest flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-label uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
