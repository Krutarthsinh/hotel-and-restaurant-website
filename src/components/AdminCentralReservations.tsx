import React, { useState } from 'react';
import { Reservation } from '../types';

interface AdminCentralReservationsProps {
  reservations: Reservation[];
  selectedFolioRef: string | null;
  onSelectFolio: (ref: string | null) => void;
  onCheckInReservation: (resId: string) => void;
  onCheckOutReservation: (resId: string) => void;
  onOpenManualWalkIn: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminCentralReservations: React.FC<AdminCentralReservationsProps> = ({
  reservations,
  selectedFolioRef,
  onSelectFolio,
  onCheckInReservation,
  onCheckOutReservation,
  onOpenManualWalkIn,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Find inspected reservation
  const inspectedRes = selectedFolioRef
    ? reservations.find((r) => r.ref === selectedFolioRef)
    : null;

  // Filter reservations
  const filteredReservations = reservations.filter((r) => {
    // Status filter
    if (statusFilter !== 'All') {
      if (statusFilter === 'In-House' && r.status !== 'In-House' && r.status !== 'Checked-In') {
        return false;
      }
      if (statusFilter === 'Arriving Today' && r.status !== 'Arriving Today') {
        return false;
      }
      if (statusFilter === 'Confirmed' && r.status !== 'Confirmed') {
        return false;
      }
      if (statusFilter === 'Departed' && r.status !== 'Departed') {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.guestName.toLowerCase().includes(q) ||
        r.ref.toLowerCase().includes(q) ||
        r.suiteNumber.toLowerCase().includes(q) ||
        r.suiteName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePrintRegistration = () => {
    window.print();
  };

  const handleSendEmailFolio = (email: string) => {
    onShowToast(`Folio statement sent to: ${email}`);
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Top Header & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">
              Hotelier Desk • Central PMS Ledger
            </p>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl text-on-surface font-medium tracking-tight">
            Central Reservations &amp; Room Allocations
          </h1>
          <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
            Autonomous allocation engine and folio inspection for luxury inventory
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenManualWalkIn}
            className="flex items-center gap-2 bg-primary hover:bg-neutral-800 text-on-primary text-xs font-label uppercase tracking-wider px-4 py-2.5 rounded transition-all shadow-md cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            New Booking / Walk-In
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-container-highest/60">
          <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant block">
            Total Active Stays
          </span>
          <span className="font-headline text-2xl font-semibold text-on-surface">
            {reservations.length} Folios
          </span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-container-highest/60">
          <span className="text-[10px] font-label uppercase tracking-wider text-secondary font-semibold block">
            Arriving Today
          </span>
          <span className="font-headline text-2xl font-semibold text-secondary">
            {reservations.filter((r) => r.status === 'Arriving Today').length} Guests
          </span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-container-highest/60">
          <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant block">
            In-House Stays
          </span>
          <span className="font-headline text-2xl font-semibold text-on-surface">
            {reservations.filter((r) => r.status === 'In-House' || r.status === 'Checked-In').length} Suites
          </span>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-surface-container-highest/60">
          <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant block">
            Guaranteed RevPAR
          </span>
          <span className="font-headline text-2xl font-semibold text-on-surface font-mono">
            €1,420.00
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'In-House', 'Arriving Today', 'Confirmed', 'Departed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded text-xs font-label uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Guest, Folio, Suite #..."
            className="w-full bg-surface-container-low text-xs text-on-surface pl-9 pr-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-highest/50 font-body"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[18px]">
            search
          </span>
        </div>
      </div>

      {/* Main Reservation Ledger Table */}
      <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-surface-container-highest/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-surface-container-low text-[10px] font-label uppercase tracking-widest text-on-surface-variant border-b border-surface-container-highest">
                <th className="py-3.5 px-6">Folio Ref</th>
                <th className="py-3.5 px-4">Guest Primary</th>
                <th className="py-3.5 px-4">Suite Assigned</th>
                <th className="py-3.5 px-4">Stay Windows</th>
                <th className="py-3.5 px-4">Channel Origin</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Booking Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest text-xs font-body text-on-surface">
              {filteredReservations.map((res) => {
                const isSelected = selectedFolioRef === res.ref;
                return (
                  <tr
                    key={res.id}
                    className={`hover:bg-surface-container-low/50 transition-colors cursor-pointer ${
                      isSelected ? 'bg-secondary-container/20 ring-1 ring-secondary' : ''
                    }`}
                    onClick={() => onSelectFolio(res.ref)}
                  >
                    <td className="py-4 px-6 font-mono font-semibold text-primary">
                      #{res.ref}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-on-surface">{res.guestName}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.5 rounded font-label font-bold">
                          {res.privilegeTier}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          {res.partyComposition}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-label font-bold text-sm text-secondary">
                        {res.suiteNumber}
                      </span>
                      <span className="block text-[11px] text-on-surface-variant">
                        {res.suiteName}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs whitespace-nowrap">
                      <div>{res.dates}</div>
                      <span className="text-[10px] text-on-surface-variant font-label uppercase">
                        {res.nights} Nights • ETA {res.eta}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-[11px] font-medium">
                        {res.channel}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-semibold text-on-surface">
                      €{res.totalAmount.toLocaleString()}.00
                      <span className="block text-[10px] text-secondary font-sans font-normal">
                        {res.depositState}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-wider ${
                          res.status === 'Checked-In' || res.status === 'In-House'
                            ? 'bg-[#edf3ee] text-[#2d4736]'
                            : res.status === 'Arriving Today'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : res.status === 'Departed'
                            ? 'bg-surface-container-high text-on-surface-variant'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {res.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectFolio(res.ref)}
                        className="text-secondary hover:text-primary font-label text-xs uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Inspect
                      </button>
                      {res.status === 'Arriving Today' ? (
                        <button
                          onClick={() => {
                            onCheckInReservation(res.id);
                            onShowToast(`Checked in ${res.guestName} to ${res.suiteNumber}`);
                          }}
                          className="bg-primary hover:bg-secondary text-on-primary text-[10px] font-label uppercase tracking-wider px-2 py-1 rounded font-semibold transition-colors cursor-pointer"
                        >
                          Check-In
                        </button>
                      ) : res.status === 'In-House' || res.status === 'Checked-In' ? (
                        <button
                          onClick={() => {
                            onCheckOutReservation(res.id);
                            onShowToast(`Checked out ${res.guestName} from ${res.suiteNumber}`);
                          }}
                          className="bg-surface-container-high hover:bg-error/20 text-on-surface hover:text-error text-[10px] font-label uppercase tracking-wider px-2 py-1 rounded font-semibold transition-colors cursor-pointer"
                        >
                          Check-Out
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Guest Inspector Drawer / Modal */}
      {inspectedRes && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-end">
          <div className="w-full max-w-2xl h-full bg-surface-container-lowest shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-surface-container-highest animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div>
              <div className="p-6 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-low/50 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    contact_page
                  </span>
                  <div>
                    <h3 className="font-headline text-xl text-primary font-semibold">
                      Folio #{inspectedRes.ref}
                    </h3>
                    <span className="text-xs text-on-surface-variant font-label uppercase tracking-wider">
                      Audited Opera Cloud PMS Record
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectFolio(null)}
                  className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Guest Profile Section */}
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between bg-surface-container-low p-4 rounded-xl border border-surface-container-highest/60">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline text-xl font-bold">
                      {inspectedRes.guestName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-bold text-primary">
                        {inspectedRes.guestName}
                      </h4>
                      <span className="inline-flex items-center gap-1 bg-secondary text-on-secondary text-[10px] font-label font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1">
                        <span className="material-symbols-outlined text-[12px]">diamond</span>
                        {inspectedRes.privilegeTier}
                      </span>
                      <div className="text-xs text-on-surface-variant mt-2 space-y-0.5">
                        <p>{inspectedRes.email}</p>
                        <p>{inspectedRes.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant block">
                      Lifetime Patron Spend
                    </span>
                    <span className="font-headline text-lg font-bold text-primary">€48,250</span>
                    <span className="block text-[10px] text-secondary font-label">
                      6th Stay at Aurelia
                    </span>
                  </div>
                </div>

                {/* Reservation Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest/60">
                    <span className="text-[10px] font-label uppercase tracking-wider text-secondary font-semibold block mb-1">
                      Assigned Sanctuary
                    </span>
                    <span className="font-headline text-lg text-primary font-bold">
                      {inspectedRes.suiteNumber} • {inspectedRes.suiteName}
                    </span>
                    <span className="text-xs text-on-surface-variant block mt-1">
                      {inspectedRes.suiteType}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-container-low border border-surface-container-highest/60">
                    <span className="text-[10px] font-label uppercase tracking-wider text-secondary font-semibold block mb-1">
                      Stay Itinerary
                    </span>
                    <span className="font-headline text-base text-primary font-bold">
                      {inspectedRes.dates}
                    </span>
                    <span className="text-xs text-on-surface-variant block mt-1">
                      {inspectedRes.nights} Nights • ETA {inspectedRes.eta}
                    </span>
                  </div>
                </div>

                {/* VIP Directives & Protocols */}
                <div className="space-y-3">
                  <h5 className="font-label text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      tune
                    </span>
                    Special Directives &amp; Concierge Notes
                  </h5>
                  <div className="p-4 rounded-lg bg-secondary-container/20 border border-secondary/20 text-xs text-on-surface leading-relaxed">
                    <p className="font-semibold text-primary mb-1">
                      Patron Directive:
                    </p>
                    <p>{inspectedRes.specialDirectives}</p>
                    <div className="mt-3 pt-3 border-t border-secondary/20 flex items-center justify-between text-[11px] text-on-surface-variant">
                      <span>Dedicated Butler: <strong>{inspectedRes.dedicatedButler.name}</strong></span>
                      <span>Transfer: <strong>{inspectedRes.transferDetails}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Financial Ledger Breakdown */}
                <div className="space-y-3">
                  <h5 className="font-label text-xs uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      receipt_long
                    </span>
                    Folio Settlement Summary
                  </h5>
                  <div className="bg-surface-container-low rounded-lg p-4 space-y-2 text-xs border border-surface-container-highest/60">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Room Tariff ({inspectedRes.nights} Nights):</span>
                      <span className="font-mono">€{(inspectedRes.totalAmount * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Taxes, Estate Surcharges &amp; Marine Levy:</span>
                      <span className="font-mono">€{(inspectedRes.totalAmount * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-surface-container-high flex justify-between font-bold text-sm text-primary">
                      <span>Total Folio Amount:</span>
                      <span className="font-mono">€{inspectedRes.totalAmount.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-secondary font-medium pt-1">
                      <span>Status:</span>
                      <span>{inspectedRes.depositState} via {inspectedRes.channel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-surface-container-highest bg-surface-container-low/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintRegistration}
                  className="px-3 py-2 rounded bg-surface-container-highest hover:bg-surface-container text-primary text-xs font-label uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Print Reg Card</span>
                </button>
                <button
                  onClick={() => handleSendEmailFolio(inspectedRes.email)}
                  className="px-3 py-2 rounded bg-surface-container-highest hover:bg-surface-container text-primary text-xs font-label uppercase tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>Email Folio</span>
                </button>
              </div>

              {inspectedRes.status === 'Arriving Today' ? (
                <button
                  onClick={() => {
                    onCheckInReservation(inspectedRes.id);
                    onShowToast(`Checked in ${inspectedRes.guestName}`);
                  }}
                  className="px-5 py-2.5 rounded bg-primary hover:bg-secondary text-on-primary text-xs font-label uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Complete Check-In
                </button>
              ) : inspectedRes.status === 'In-House' || inspectedRes.status === 'Checked-In' ? (
                <button
                  onClick={() => {
                    onCheckOutReservation(inspectedRes.id);
                    onShowToast(`Checked out ${inspectedRes.guestName}`);
                  }}
                  className="px-5 py-2.5 rounded bg-error text-white hover:bg-error/90 text-xs font-label uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Process Check-Out
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
