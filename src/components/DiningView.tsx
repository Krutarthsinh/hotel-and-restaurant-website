import React from 'react';
import { DINING_DATA } from '../data/hotelData';

interface DiningViewProps {
  onOpenTableBooking: (restaurantName: string) => void;
}

export const DiningView: React.FC<DiningViewProps> = ({ onOpenTableBooking }) => {
  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Header */}
      <section className="relative w-full pb-12 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-secondary"></span>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                Gastronomy &amp; Cellar
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal tracking-tight">
              Culinary Artistry Above the Sea
            </h1>
            <p className="font-body text-base text-on-surface-variant font-light leading-relaxed pt-2">
              Guided by the seasons of Campania and the bounty of the Tyrrhenian waters. Every dish is a dialogue between organic terraced agriculture and modernist Italian fine dining.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-surface-container-low px-6 py-4 rounded-lg shadow-sm border border-surface-container-highest/60">
            <div className="text-left">
              <div className="font-headline text-2xl text-primary font-medium">1 Star</div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                Michelin Guide
              </div>
            </div>
            <div className="w-px h-8 bg-surface-container-highest"></div>
            <div className="text-left">
              <div className="font-headline text-2xl text-primary font-medium">1,400+</div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                Grand Cru Labels
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Showcase */}
      <section className="space-y-16 mb-20">
        {DINING_DATA.map((venue, idx) => (
          <div
            key={venue.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-sm border border-surface-container-highest/60 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            <div className="lg:col-span-7 overflow-hidden rounded-xl aspect-[16/10] bg-surface-container-high">
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-lg">
                  {venue.id === 'il-tramonto' ? 'star' : 'local_bar'}
                </span>
                <span className="font-label text-xs uppercase tracking-widest font-bold">
                  {venue.accolade}
                </span>
              </div>

              <h2 className="font-headline text-3xl md:text-4xl text-primary font-normal">
                {venue.name}
              </h2>

              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {venue.description}
              </p>

              <div className="bg-surface-container-low p-4 rounded-lg space-y-2 text-xs font-body text-on-surface">
                <div className="flex justify-between border-b border-surface-container-high pb-2">
                  <span className="text-on-surface-variant">Hours of Operation:</span>
                  <span className="font-semibold">{venue.hours}</span>
                </div>
                <div className="flex justify-between border-b border-surface-container-high py-2">
                  <span className="text-on-surface-variant">Executive Lead:</span>
                  <span className="font-semibold">{venue.chef}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-on-surface-variant">Sommelier Program:</span>
                  <span className="font-semibold">{venue.cellarLabels}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenTableBooking(venue.name)}
                  className="w-full py-3.5 rounded bg-primary text-on-primary font-label text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">restaurant</span>
                  <span>Reserve Table at {venue.name}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
