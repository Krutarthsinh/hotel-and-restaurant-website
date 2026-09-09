import React, { useState } from 'react';
import { Suite, Reservation } from '../types';
import { SUITES_DATA } from '../data/hotelData';

interface BookingModalProps {
  initialSuiteId?: string;
  onClose: () => void;
  onConfirmBooking: (newReservation: Reservation) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialSuiteId,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedSuiteId, setSelectedSuiteId] = useState(
    initialSuiteId || SUITES_DATA[0].id
  );
  const [checkInDate, setCheckInDate] = useState('2025-10-14');
  const [checkOutDate, setCheckOutDate] = useState('2025-10-19');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partyComp, setPartyComp] = useState('2 Adults • 0 Children');
  const [specialDirectives, setSpecialDirectives] = useState(
    'Champagne on arrival, private sunset terrace setup, feather pillows.'
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState('');

  const selectedSuite =
    SUITES_DATA.find((s) => s.id === selectedSuiteId) || SUITES_DATA[0];

  // Calculate nights
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const nights = Math.max(
    1,
    Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
  );
  const subtotal = selectedSuite.pricePerNight * nights;
  const taxes = subtotal * 0.1;
  const grandTotal = subtotal + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !email) return;

    const refNum = `BK-${Math.floor(90000 + Math.random() * 9999)}`;
    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      ref: refNum,
      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+39 089 875 1100',
      privilegeTier: 'Direct Patron VIP',
      suiteNumber: `#${selectedSuite.roomUnitNumber}`,
      suiteName: selectedSuite.name,
      suiteType: selectedSuite.category,
      dates: `${checkInDate} to ${checkOutDate}`,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: nights,
      partyComposition: partyComp,
      eta: '15:00',
      transferDetails: 'Private Riva Speedboat Transfer',
      dedicatedButler: {
        name: 'Matteo Bellini',
        initials: 'MB',
      },
      specialDirectives: specialDirectives.trim(),
      totalAmount: grandTotal,
      channel: 'Direct Brand Web',
      channelType: 'Direct',
      depositState: 'Authorized & Guaranteed',
      status: 'Confirmed',
    };

    setConfirmedRef(refNum);
    onConfirmBooking(newRes);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-surface-container-low border-b border-surface-container-highest flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              hotel_class
            </span>
            <div>
              <h2 className="font-headline text-xl text-primary font-semibold">
                {isSuccess ? 'Reservation Guaranteed' : 'Reserve Your Sanctuary'}
              </h2>
              <span className="text-[11px] font-label uppercase tracking-wider text-on-surface-variant">
                The Grand Aurelia • Positano Private Concierge
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

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-2xl sm:text-3xl text-primary font-medium">
                We Await Your Arrival
              </h3>
              <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Your reservation at The Grand Aurelia has been confirmed and provisioned in the central PMS ledger.
              </p>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-surface-container-highest/60 max-w-md mx-auto text-left space-y-3 text-xs font-body">
              <div className="flex justify-between border-b border-surface-container-high pb-2">
                <span className="text-on-surface-variant">Booking Folio:</span>
                <strong className="font-mono text-primary text-sm">#{confirmedRef}</strong>
              </div>
              <div className="flex justify-between border-b border-surface-container-high py-2">
                <span className="text-on-surface-variant">Suite Reserved:</span>
                <strong className="text-primary">{selectedSuite.name} (#{selectedSuite.roomUnitNumber})</strong>
              </div>
              <div className="flex justify-between border-b border-surface-container-high py-2">
                <span className="text-on-surface-variant">Itinerary:</span>
                <span>{checkInDate} to {checkOutDate} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-on-surface-variant">Total Amount:</span>
                <strong className="font-mono text-secondary text-sm">€{grandTotal.toLocaleString()}.00</strong>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-lg bg-primary text-on-primary font-label text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              >
                Return to Experience
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Suite Selector */}
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-2">
                Select Accommodation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SUITES_DATA.map((suite) => (
                  <div
                    key={suite.id}
                    onClick={() => setSelectedSuiteId(suite.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                      selectedSuiteId === suite.id
                        ? 'border-secondary bg-secondary-container/20 ring-1 ring-secondary'
                        : 'border-surface-container-highest bg-surface-container-low hover:bg-surface-container-high'
                    }`}
                  >
                    <div>
                      <span className="font-headline text-sm font-semibold text-primary block leading-tight">
                        {suite.name}
                      </span>
                      <span className="text-[10px] text-on-surface-variant block mt-0.5">
                        {suite.surfaceSqm} sqm • {suite.bedType}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-secondary mt-2 block">
                      €{suite.pricePerNight.toLocaleString()} / night
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dates & Party */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                  Guests
                </label>
                <select
                  value={partyComp}
                  onChange={(e) => setPartyComp(e.target.value)}
                  className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
                >
                  <option value="1 Adult • 0 Children">1 Adult • 0 Children</option>
                  <option value="2 Adults • 0 Children">2 Adults • 0 Children</option>
                  <option value="2 Adults • 1 Child">2 Adults • 1 Child</option>
                  <option value="3 Adults • 0 Children">3 Adults • 0 Children</option>
                  <option value="4+ Guests • Villa Buyout">4+ Guests (Villa)</option>
                </select>
              </div>
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Duke William Kensington"
                  className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
                />
              </div>

              <div>
                <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. guest@kensington.co.uk"
                  className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +44 20 7946 0912"
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
              />
            </div>

            {/* Special Directives */}
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Special Directives &amp; Arrival Protocol
              </label>
              <textarea
                rows={2}
                value={specialDirectives}
                onChange={(e) => setSpecialDirectives(e.target.value)}
                placeholder="Dietary preferences, private boat pickup time, sommelier pairings..."
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
              ></textarea>
            </div>

            {/* Total Ledger Strip */}
            <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-highest/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant block">
                  Estimated Total ({nights} Nights incl. Estate Levy)
                </span>
                <span className="font-headline text-2xl font-bold text-primary">
                  €{grandTotal.toLocaleString()}.00
                </span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded bg-primary hover:bg-neutral-800 text-on-primary font-label text-xs uppercase tracking-wider font-semibold transition-colors shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Confirm &amp; Guarantee</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
