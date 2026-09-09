import React from 'react';
import { EXPERIENCES_DATA } from '../data/hotelData';

interface ExperiencesViewProps {
  onShowToast: (msg: string) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({ onShowToast }) => {
  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Header */}
      <section className="relative w-full pb-12 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-secondary"></span>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                Curated Excursions
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal tracking-tight">
              The Aurelia Itineraries
            </h1>
            <p className="font-body text-base text-on-surface-variant font-light leading-relaxed pt-2">
              Beyond the estate walls lies the most evocative coastline in the Mediterranean. Handcrafted private journeys by air, sea, and ancient stone footpaths.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Experiences */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {EXPERIENCES_DATA.map((exp, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container-highest/60 flex flex-col justify-between hover:shadow-lg transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-2xl">{exp.icon}</span>
                </div>
                <span className="font-label text-xs uppercase tracking-wider text-secondary font-bold bg-secondary-container/40 px-3 py-1 rounded-full">
                  {exp.badge}
                </span>
              </div>

              <h2 className="font-headline text-2xl text-primary font-medium">
                {exp.title}
              </h2>

              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {exp.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
              <span className="font-label text-xs text-on-surface-variant font-medium">
                Duration: <strong className="text-primary">{exp.duration}</strong>
              </span>
              <button
                onClick={() => onShowToast(`Concierge briefed for: ${exp.title}. We will arrange bespoke timing.`)}
                className="px-4 py-2 bg-primary text-on-primary rounded text-xs font-label uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Inquire With Concierge
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
