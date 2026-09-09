import React, { useState } from 'react';
import { Reservation } from '../types';
import { SUITES_DATA } from '../data/hotelData';

interface ManualWalkInModalProps {
  onClose: () => void;
  onRegisterWalkIn: (newRes: Reservation) => void;
}

export const ManualWalkInModal: React.FC<ManualWalkInModalProps> = ({
  onClose,
  onRegisterWalkIn,
}) => {
  const [guestName, setGuestName] = useState('');
  const [vipTier, setVipTier] = useState('Walk-In VIP Patron');
  const [suiteId, setSuiteId] = useState(SUITES_DATA[0].id);
  const [nights, setNights] = useState(3);
  const [butlerName, setButlerName] = useState('Matteo Bellini (MB)');
  const [directives, setDirectives] = useState('Luggage expedited to room, immediate welcome bellini cocktail.');

  const selectedSuite = SUITES_DATA.find((s) => s.id === suiteId) || SUITES_DATA[0];
  const totalAmount = selectedSuite.pricePerNight * nights * 1.1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const refNum = `BK-${Math.floor(92000 + Math.random() * 7000)}`;
    const newRes: Reservation = {
      id: `walkin-${Date.now()}`,
      ref: refNum,
      guestName: guestName.trim(),
      email: `${guestName.toLowerCase().replace(/\s+/g, '.')}@private.patron`,
      phone: '+39 089 875 1100',
      privilegeTier: vipTier,
      suiteNumber: `#${selectedSuite.roomUnitNumber}`,
      suiteName: selectedSuite.name,
      suiteType: selectedSuite.category,
      dates: `Today for ${nights} Nights`,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + nights * 86400000).toISOString().split('T')[0],
      nights: nights,
      partyComposition: '2 Adults',
      eta: 'Immediate Walk-In',
      transferDetails: 'Private Arrival at Front Portico',
      dedicatedButler: {
        name: butlerName.split(' (')[0],
        initials: butlerName.includes('(') ? butlerName.split('(')[1].replace(')', '') : 'MB',
      },
      specialDirectives: directives,
      totalAmount: totalAmount,
      channel: 'Front Desk Walk-In',
      channelType: 'Direct',
      depositState: 'Card Swiped & Authorized',
      status: 'In-House',
    };

    onRegisterWalkIn(newRes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 bg-surface-container-low border-b border-surface-container-highest flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              person_add
            </span>
            <div>
              <h2 className="font-headline text-lg font-semibold text-primary">
                Executive Walk-In Registration
              </h2>
              <span className="text-[11px] font-label uppercase tracking-wider text-on-surface-variant">
                Front Portico Rapid Check-In
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
              Guest Name &amp; Title
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Donna Isabella Morosini"
              className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                VIP Privilege Tier
              </label>
              <select
                value={vipTier}
                onChange={(e) => setVipTier(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                <option value="Sovereign Patron">Sovereign Patron</option>
                <option value="Ambassador Tier">Ambassador Tier</option>
                <option value="Luminary VIP">Luminary VIP</option>
                <option value="Walk-In VIP Patron">Walk-In VIP Patron</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Stay Length (Nights)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Suite Allocation
              </label>
              <select
                value={suiteId}
                onChange={(e) => setSuiteId(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                {SUITES_DATA.map((s) => (
                  <option key={s.id} value={s.id}>
                    #{s.roomUnitNumber} - {s.name} (€{s.pricePerNight})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Assigned Butler
              </label>
              <select
                value={butlerName}
                onChange={(e) => setButlerName(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                <option value="Matteo Bellini (MB)">Matteo Bellini (MB)</option>
                <option value="Sofia Carbone (SC)">Sofia Carbone (SC)</option>
                <option value="Giancarlo Rossi (GR)">Giancarlo Rossi (GR)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
              Immediate Directives &amp; Keycard Notes
            </label>
            <textarea
              rows={2}
              value={directives}
              onChange={(e) => setDirectives(e.target.value)}
              className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
            ></textarea>
          </div>

          <div className="bg-surface-container-low p-3 rounded-lg flex items-center justify-between border border-surface-container-highest">
            <span className="text-xs text-on-surface-variant font-label">
              Total Folio Authorized:
            </span>
            <strong className="font-mono text-base text-primary">
              €{totalAmount.toLocaleString()}.00
            </strong>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-surface-container-high text-xs font-label uppercase tracking-wider text-on-surface font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-primary text-on-primary text-xs font-label uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              Dispatch Keycards &amp; Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
