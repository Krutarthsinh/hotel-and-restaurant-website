import React, { useState } from 'react';
import { MAP_IMAGE_URL } from '../data/hotelData';
import { saveContactInquiryToSupabase } from '../lib/supabase';

interface ContactViewProps {
  onShowToast: (msg: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Private Reservation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await saveContactInquiryToSupabase({
      name: name.trim(),
      email: email.trim(),
      subject,
      message: message.trim(),
    });

    setIsSubmitting(false);
    onShowToast(`Thank you, ${name}. Your message has reached the Executive Concierge.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Header */}
      <section className="relative w-full pb-12 pt-4">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-[1px] bg-secondary"></span>
            <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              Private Inquiries
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal tracking-tight">
            Connect with Concierge
          </h1>
          <p className="font-body text-base text-on-surface-variant font-light leading-relaxed pt-2">
            Whether arranging private yacht charters, helicopter transfers from Rome or Naples, or reserving exclusive estate wings, our concierge office stands at your service 24 hours a day.
          </p>
        </div>
      </section>

      {/* Grid: Contact Details & Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container-highest/60 space-y-6">
            <h3 className="font-headline text-2xl text-primary font-normal">
              The Grand Aurelia Estate
            </h3>

            <div className="space-y-4 text-xs font-body text-on-surface">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                  location_on
                </span>
                <div>
                  <strong className="block text-primary text-sm">Estate Address</strong>
                  <span className="text-on-surface-variant">Via Panoramica 48, 84017 Positano (SA), Amalfi Coast, Italy</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                  call
                </span>
                <div>
                  <strong className="block text-primary text-sm">Direct Desk</strong>
                  <span className="text-on-surface-variant">+39 089 875 1120</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-lg mt-0.5">
                  mail
                </span>
                <div>
                  <strong className="block text-primary text-sm">Executive Concierge</strong>
                  <span className="text-on-surface-variant">concierge@grandaurelia.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container-high text-xs text-on-surface-variant space-y-2">
              <p><strong>Private Heliport:</strong> 40°37'41.2"N 14°29'06.0"E (Prior clearance required)</p>
              <p><strong>Marine Jetty:</strong> VHF Channel 72 / Direct Funicular to Hotel Foyer</p>
            </div>
          </div>

          <div
            className="rounded-2xl overflow-hidden h-60 bg-cover bg-center shadow-md relative"
            style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
          >
            <div className="absolute inset-0 bg-primary/20"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md p-3 rounded-lg text-xs font-label uppercase tracking-wider text-secondary font-semibold flex items-center justify-between">
              <span>Positano High Cliffside</span>
              <span>Coordinates Verified</span>
            </div>
          </div>
        </div>

        {/* Inquiry Form Column */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-surface-container-highest/60 space-y-6 shadow-sm"
          >
            <h3 className="font-headline text-2xl text-primary font-medium">
              Send a Direct Message
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-label uppercase tracking-widest text-secondary font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Vance"
                  className="w-full bg-surface-container-low text-xs text-on-surface px-4 py-3 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-label uppercase tracking-widest text-secondary font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. patron@aurelia.com"
                  className="w-full bg-surface-container-low text-xs text-on-surface px-4 py-3 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-label uppercase tracking-widest text-secondary font-semibold mb-2">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-surface-container-low text-xs text-on-surface px-4 py-3 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
              >
                <option value="Private Reservation">Private Suite Reservation</option>
                <option value="Helicopter / Marine Transfer">Helicopter or Marine Transfer</option>
                <option value="Villa Buyout">Private Estate Wing Buyout</option>
                <option value="Michelin Dining">Michelin Table or Wine Cellar Tasting</option>
                <option value="Press / Special Directive">VIP Protocol / Press Liaison</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-label uppercase tracking-widest text-secondary font-semibold mb-2">
                Your Directives or Questions
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kindly let us know your planned travel dates, requested suite configuration, or special dietary requirements..."
                className="w-full bg-surface-container-low text-xs text-on-surface px-4 py-3 rounded-lg border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-secondary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-primary hover:bg-neutral-800 text-on-primary font-label text-xs uppercase tracking-widest font-semibold transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Transmit Message to Concierge</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
