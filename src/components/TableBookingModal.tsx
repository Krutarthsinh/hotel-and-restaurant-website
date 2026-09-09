import React, { useState } from 'react';
import { saveDiningReservationToSupabase } from '../lib/supabase';

interface TableBookingModalProps {
  restaurantName: string;
  onClose: () => void;
  onConfirm: (msg: string) => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({
  restaurantName,
  onClose,
  onConfirm,
}) => {
  const [date, setDate] = useState('2025-10-15');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState('2 Guests');
  const [seatingArea, setSeatingArea] = useState('Terrace Cliffside Railing');
  const [guestName, setGuestName] = useState('');
  const [dietary, setDietary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    await saveDiningReservationToSupabase({
      restaurantName,
      guestName: guestName.trim(),
      date,
      time,
      guests,
      seatingArea,
      dietary: dietary.trim() || undefined,
    });
    setIsSubmitting(false);

    onConfirm(`Table reserved for ${guestName} at ${restaurantName} on ${date} at ${time} (${seatingArea}).`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 bg-surface-container-low border-b border-surface-container-highest flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">
              restaurant
            </span>
            <div>
              <h2 className="font-headline text-lg font-semibold text-primary">
                Reserve Table Seating
              </h2>
              <span className="text-[11px] font-label uppercase tracking-wider text-secondary font-bold">
                {restaurantName}
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
              Guest Name
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Lady Genevieve Rossi"
              className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Preferred Seating Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                <option value="18:30">18:30 (Sunset Aperitivo)</option>
                <option value="19:30">19:30 (Twilight Service)</option>
                <option value="20:30">20:30 (Prime Evening)</option>
                <option value="21:30">21:30 (Late Starlight)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Party Size
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="4 Guests">4 Guests</option>
                <option value="6+ Private Salon">6+ Private Dining Salon</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
                Seating Area
              </label>
              <select
                value={seatingArea}
                onChange={(e) => setSeatingArea(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body cursor-pointer"
              >
                <option value="Terrace Cliffside Railing">Cliffside Front Railing</option>
                <option value="Travertine Interior Arch">Travertine Arch Alcove</option>
                <option value="Sommelier Wine Cellar">Private Sommelier Cellar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-label uppercase tracking-widest text-secondary font-semibold mb-1">
              Dietary Restrictions or Occasions
            </label>
            <input
              type="text"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              placeholder="e.g. Anniversary celebration, pescatarian tasting menu"
              className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2 rounded border border-surface-container-highest focus:outline-none focus:ring-1 focus:ring-secondary font-body"
            />
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
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
