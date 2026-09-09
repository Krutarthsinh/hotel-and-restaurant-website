import React, { useState } from 'react';
import { BATH_IMAGE_URL } from '../data/hotelData';

interface WellnessSpaViewProps {
  onShowToast: (msg: string) => void;
}

export const WellnessSpaView: React.FC<WellnessSpaViewProps> = ({ onShowToast }) => {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);

  const treatments = [
    {
      title: 'Tyrrhenian Sea Salt & Neroli Polish',
      duration: '90 Minutes',
      price: '€340',
      desc: 'Mineral-rich marine salts infused with hand-pressed Amalfi neroli blossoms followed by a volcanic clay wrap.',
    },
    {
      title: 'Subterranean Roman Hydro-Circuit',
      duration: '120 Minutes',
      price: '€280',
      desc: 'Alternating tepidarium, caldarium, and frigidarium pools carved deep into the natural cliffside limestone caverns.',
    },
    {
      title: 'Aurelia Signature Deep Restorative Ritual',
      duration: '110 Minutes',
      price: '€420',
      desc: 'Hot volcanic basalt stones with organic cold-pressed olive oils, finished with targeted facial lymphatic drainage.',
    },
    {
      title: 'Couples Sunset Thermal Grotto Session',
      duration: '150 Minutes',
      price: '€680',
      desc: 'Private access to the panoramic cliff grotto pool with vintage Dom Pérignon and tailored sound therapy.',
    },
  ];

  const handleBookTreatment = (title: string) => {
    setSelectedTreatment(title);
    onShowToast(`Spa inquiry submitted for: ${title}. Our Spa Concierge will reach out shortly.`);
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Header */}
      <section className="relative w-full pb-12 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-secondary"></span>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                Sanctuary of Restoration
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal tracking-tight">
              The Cliffside Spa &amp; Thermal Baths
            </h1>
            <p className="font-body text-base text-on-surface-variant font-light leading-relaxed pt-2">
              Deep beneath the travertine colonnades lies a multi-sensory subterranean retreat, harnessing centuries-old Roman hydrotherapy principles alongside bespoke botanical preparations.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Feature */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest p-8 rounded-2xl border border-surface-container-highest/60 mb-16">
        <div className="lg:col-span-6 overflow-hidden rounded-xl aspect-[4/3]">
          <img
            src={BATH_IMAGE_URL}
            alt="Cliffside Spa Sanctuary"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold">
            The Roman Hydro-Baths
          </span>
          <h2 className="font-headline text-3xl text-primary font-normal">
            Sculpted from Natural Cliff Formations
          </h2>
          <p className="font-body text-sm text-on-surface-variant leading-relaxed">
            Our water circuits filter pristine Tyrrhenian seawater through active volcanic porous pumice. Guests journey through calibrated thermal pools designed to detoxify, recalibrate the nervous system, and restore vital equilibrium.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-surface-container-high text-center">
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-headline text-lg font-bold text-primary block">38°C</span>
              <span className="font-label text-[10px] uppercase text-on-surface-variant">Caldarium</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-headline text-lg font-bold text-primary block">24°C</span>
              <span className="font-label text-[10px] uppercase text-on-surface-variant">Tepidarium</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="font-headline text-lg font-bold text-primary block">11°C</span>
              <span className="font-label text-[10px] uppercase text-on-surface-variant">Frigidarium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Menu */}
      <section className="space-y-6 mb-20">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-2xl text-primary font-normal">
            Signature Spa Rituals
          </h3>
          <span className="text-xs font-label text-secondary font-semibold uppercase tracking-wider">
            Daily 09:00 - 20:30
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatments.map((t, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-headline text-lg font-medium text-primary">{t.title}</h4>
                  <span className="font-mono font-bold text-secondary text-sm">{t.price}</span>
                </div>
                <span className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider mt-1 block">
                  {t.duration}
                </span>
                <p className="font-body text-xs text-on-surface-variant mt-3 leading-relaxed">
                  {t.desc}
                </p>
              </div>
              <button
                onClick={() => handleBookTreatment(t.title)}
                className="w-full py-2.5 rounded bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-label text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                {selectedTreatment === t.title ? 'Request Logged ✓' : 'Reserve Treatment'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
