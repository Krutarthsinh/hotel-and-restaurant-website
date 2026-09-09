import React from 'react';
import { Suite } from '../types';

interface SuiteDetailModalProps {
  suite: Suite;
  onClose: () => void;
  onReserve: (suiteId: string) => void;
}

export const SuiteDetailModal: React.FC<SuiteDetailModalProps> = ({
  suite,
  onClose,
  onReserve,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Image Header */}
        <div className="relative h-72 w-full bg-surface-container-high overflow-hidden">
          <img
            src={suite.imageUrl}
            alt={suite.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-surface">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-label font-bold uppercase tracking-wider mb-1">
                {suite.badge}
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-medium">
                {suite.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-headline text-2xl font-bold text-surface">
                €{suite.pricePerNight.toLocaleString()}
              </span>
              <span className="block text-[10px] text-surface/80 font-body">/ night</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Architectural Specs */}
          <div className="grid grid-cols-4 gap-3 text-center bg-surface-container-low p-4 rounded-xl border border-surface-container-highest/60">
            <div>
              <span className="font-label text-[10px] uppercase text-on-surface-variant block">
                Surface Area
              </span>
              <strong className="font-headline text-sm text-primary">
                {suite.surfaceSqm} sqm
              </strong>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase text-on-surface-variant block">
                Bed Layout
              </span>
              <strong className="font-headline text-sm text-primary">
                {suite.bedType}
              </strong>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase text-on-surface-variant block">
                Occupancy
              </span>
              <strong className="font-headline text-sm text-primary">
                Up to {suite.capacity} Guests
              </strong>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase text-secondary block">
                Room Unit
              </span>
              <strong className="font-headline text-sm text-secondary">
                #{suite.roomUnitNumber}
              </strong>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-headline text-lg text-primary font-medium">
              Architectural Concept &amp; Solarium
            </h3>
            <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {suite.description} Every element of this sanctuary was hand-sculpted by master Campanian artisans, featuring bookmatched travertine slabs, organic raw linens, and expansive floor-to-ceiling retractable glass walls opening directly onto the cliff horizon.
            </p>
          </div>

          {/* Features and Amenities List */}
          <div className="space-y-3">
            <h3 className="font-headline text-lg text-primary font-medium">
              Sanctuary Inclusions &amp; Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suite.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-low text-xs text-on-surface"
                >
                  <span className="material-symbols-outlined text-secondary text-base">
                    {feat.icon}
                  </span>
                  <span>{feat.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-low text-xs text-on-surface">
                <span className="material-symbols-outlined text-secondary text-base">
                  wine_bar
                </span>
                <span>Sub-Zero Cellar stocked with Grand Cru vintages</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-low text-xs text-on-surface">
                <span className="material-symbols-outlined text-secondary text-base">
                  local_laundry_service
                </span>
                <span>Complimentary daily pressing &amp; unpacking service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-surface-container-low border-t border-surface-container-highest flex items-center justify-between">
          <div className="text-xs font-label text-on-surface-variant">
            Best rate guaranteed when reserving directly with the estate.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded bg-surface-container-highest text-primary font-label text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onReserve(suite.id);
              }}
              className="px-6 py-2.5 rounded bg-primary hover:bg-neutral-800 text-on-primary font-label text-xs uppercase tracking-wider font-semibold transition-colors shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Reserve Suite #{suite.roomUnitNumber}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
