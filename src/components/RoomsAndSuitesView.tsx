import React, { useState, useMemo } from 'react';
import { Suite } from '../types';
import { SUITES_DATA } from '../data/hotelData';

interface RoomsAndSuitesViewProps {
  onOpenBooking: (suiteId?: string) => void;
  onExploreSuite: (suite: Suite) => void;
  onContactConcierge: () => void;
}

export const RoomsAndSuitesView: React.FC<RoomsAndSuitesViewProps> = ({
  onOpenBooking,
  onExploreSuite,
  onContactConcierge,
}) => {
  const [arrivalDate, setArrivalDate] = useState('2025-09-18');
  const [departureDate, setDepartureDate] = useState('2025-09-22');
  const [partyComp, setPartyComp] = useState('2 Adults • 0 Children');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'penthouse' | 'villa' | 'azure' | 'harbor'>('all');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const filteredSuites = useMemo(() => {
    return SUITES_DATA.filter((suite) => {
      // Category filter
      if (selectedCategory !== 'all' && suite.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (suite.pricePerNight > maxPrice) {
        return false;
      }
      // Trait filter
      if (selectedTraits.length > 0) {
        const hasTrait = selectedTraits.some((t) => suite.traits.includes(t));
        if (!hasTrait) return false;
      }
      return true;
    });
  }, [selectedCategory, maxPrice, selectedTraits]);

  const handleDownloadFloorplans = () => {
    // Generate a clean text file floorplan portfolio
    const content = `THE GRAND AURELIA - ARCHITECTURAL RESIDENCE & SUITE PORTFOLIO\nAmalfi Coast, Positano (SA), Italy\n\n1. Penthouse Cliffside Suite (180 sqm / 1,937 sqft)\n- 180° Panoramic Ocean Terrace\n- Private Horizon Plunge Pool\n- Dedicated Sommelier Cellar & Bar\n\n2. Garden Villa Sanctuary (260 sqm / 2,798 sqft)\n- Citrus Grove & Solarium Pergola\n- Dual Master Bedroom Wings\n- In-residence Private Chef Pantry\n\n3. Azure Sea Suite (95 sqm / 1,022 sqft)\n- Carrara Marble Deep Soaking Bath\n- Open Hearth Terrace Fireplace\n\n4. Grand Aurelia Royal Duplex (340 sqm / 3,660 sqft)\n- Rooftop Saltwater Heated Swimming Pool\n- Private Helipad Coordination\n- 24/7 Dedicated Master Butler`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Grand_Aurelia_Floorplans_Portfolio.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full bg-surface min-h-screen">
      {/* Editorial Header */}
      <section className="relative w-full pb-10 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-secondary"></span>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                The Aurelia Sanctuary Portfolio
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal tracking-tight leading-none">
              Suites &amp; Private Residences
            </h1>
            <p className="font-body text-base text-on-surface-variant font-light leading-relaxed pt-2">
              Thirty-two bespoke sanctuaries sculpted into the sun-drenched limestone bluffs of the Positano coastline. Crafted with hand-hewn travertine, raw silk drapery, and unhindered vantage points across the Tyrrhenian Sea.
            </p>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="flex items-center gap-6 bg-surface-container-low px-6 py-4 rounded-lg shadow-sm border border-surface-container-highest/60">
            <div className="text-left">
              <div className="font-headline text-2xl text-primary font-medium">32</div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                Living Quarters
              </div>
            </div>
            <div className="w-px h-8 bg-surface-container-highest"></div>
            <div className="text-left">
              <div className="font-headline text-2xl text-primary font-medium">100%</div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                Sea Panoramas
              </div>
            </div>
            <div className="w-px h-8 bg-surface-container-highest"></div>
            <div className="text-left">
              <div className="font-headline text-2xl text-secondary font-medium">24/7</div>
              <div className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">
                Butler Corps
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Reservation & Filter Console */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-sm space-y-6 mb-12 border border-surface-container-highest/60">
        {/* Top Filter Bar: Dates & Guest Count */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Check In */}
          <div className="md:col-span-3 bg-surface-container-low p-3.5 rounded-lg">
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-1">
              Arrival Date
            </label>
            <div className="flex items-center justify-between">
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="font-body text-sm font-medium text-on-surface bg-transparent focus:outline-none cursor-pointer w-full"
              />
              <span className="material-symbols-outlined text-secondary text-lg pointer-events-none">
                calendar_today
              </span>
            </div>
          </div>

          {/* Check Out */}
          <div className="md:col-span-3 bg-surface-container-low p-3.5 rounded-lg">
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-1">
              Departure Date
            </label>
            <div className="flex items-center justify-between">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="font-body text-sm font-medium text-on-surface bg-transparent focus:outline-none cursor-pointer w-full"
              />
              <span className="material-symbols-outlined text-secondary text-lg pointer-events-none">
                event_available
              </span>
            </div>
          </div>

          {/* Guests */}
          <div className="md:col-span-3 bg-surface-container-low p-3.5 rounded-lg">
            <label className="block font-label text-[10px] uppercase tracking-widest text-secondary font-semibold mb-1">
              Party Composition
            </label>
            <div className="flex items-center justify-between">
              <select
                value={partyComp}
                onChange={(e) => setPartyComp(e.target.value)}
                className="font-body text-sm font-medium text-on-surface bg-transparent focus:outline-none cursor-pointer w-full"
              >
                <option value="1 Adult • 0 Children">1 Adult • 0 Children</option>
                <option value="2 Adults • 0 Children">2 Adults • 0 Children</option>
                <option value="2 Adults • 1 Child">2 Adults • 1 Child</option>
                <option value="3 Adults • 0 Children">3 Adults • 0 Children</option>
                <option value="4+ Guests • Villa Buyout">4+ Guests • Villa Buyout</option>
              </select>
              <span className="material-symbols-outlined text-secondary text-lg pointer-events-none">
                group
              </span>
            </div>
          </div>

          {/* Live Search CTA */}
          <div className="md:col-span-3 flex gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="w-full h-14 bg-primary text-on-primary rounded-lg font-label text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">search</span>
              <span>Update Availability</span>
            </button>
          </div>
        </div>

        {/* Tier Selection Navigation Tabs */}
        <div className="pt-2 flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-label text-xs tracking-wider transition-all cursor-pointer font-semibold ${
              selectedCategory === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            All Residences (32)
          </button>
          <button
            onClick={() => setSelectedCategory('penthouse')}
            className={`px-4 py-2 rounded-full font-label text-xs tracking-wider transition-all cursor-pointer font-semibold ${
              selectedCategory === 'penthouse'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Cliffside Penthouses (8)
          </button>
          <button
            onClick={() => setSelectedCategory('villa')}
            className={`px-4 py-2 rounded-full font-label text-xs tracking-wider transition-all cursor-pointer font-semibold ${
              selectedCategory === 'villa'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Garden Villas (16)
          </button>
          <button
            onClick={() => setSelectedCategory('azure')}
            className={`px-4 py-2 rounded-full font-label text-xs tracking-wider transition-all cursor-pointer font-semibold ${
              selectedCategory === 'azure'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Azure Sea Suites (42)
          </button>
          <button
            onClick={() => setSelectedCategory('harbor')}
            className={`px-4 py-2 rounded-full font-label text-xs tracking-wider transition-all cursor-pointer font-semibold ${
              selectedCategory === 'harbor'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant'
            }`}
          >
            Deluxe Terraces (58)
          </button>
        </div>

        {/* Fine Grain Toggles & Slider */}
        <div className="pt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-low/50 p-4 rounded-lg">
          {/* Amenity Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label text-[11px] uppercase tracking-wider text-secondary font-bold mr-2">
              Curated Traits:
            </span>
            {[
              { label: 'Private Plunge Pool', icon: 'pool' },
              { label: 'Frontal Sea View', icon: 'water' },
              { label: 'Personal Butler', icon: 'room_service' },
              { label: 'Terrace Fireplace', icon: 'fireplace' },
            ].map((trait) => {
              const active = selectedTraits.includes(trait.label);
              return (
                <button
                  key={trait.label}
                  onClick={() => toggleTrait(trait.label)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-label transition-colors cursor-pointer ${
                    active
                      ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-xs'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {trait.icon}
                  </span>
                  <span>{trait.label}</span>
                </button>
              );
            })}
          </div>

          {/* Price Slider */}
          <div className="flex items-center gap-4 min-w-[300px]">
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center text-xs font-label text-on-surface-variant mb-1">
                <span className="uppercase tracking-widest text-[10px] text-secondary font-semibold">
                  Price Bracket
                </span>
                <span className="font-medium text-primary">
                  Up to €{maxPrice.toLocaleString()} / night
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-secondary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
              />
            </div>
            <button
              onClick={() => {
                setMaxPrice(5000);
                setSelectedTraits([]);
                setSelectedCategory('all');
              }}
              className="p-2 rounded-md hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer text-xs font-label"
              title="Reset Filters"
            >
              <span className="material-symbols-outlined text-lg">restart_alt</span>
            </button>
          </div>
        </div>
      </section>

      {/* Suites Grid Section */}
      <section className="w-full space-y-10 mb-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-headline text-2xl md:text-3xl text-primary font-normal">
              Featured Suites
            </h2>
            <span className="font-label text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-semibold">
              Available for selected dates
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-label text-on-surface-variant">
            <span>
              Showing {filteredSuites.length} of {SUITES_DATA.length} Sanctuaries
            </span>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-surface-container-highest/60"
            >
              <div>
                {/* Visual Media Container */}
                <div className="relative h-64 w-full overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={suite.name}
                    src={suite.imageUrl}
                  />
                  <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-label font-bold uppercase tracking-widest text-primary">
                    {suite.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-md text-on-primary text-xs font-label font-medium tracking-wide">
                    {suite.surfaceSqm} sqm • {suite.capacity} Guests
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-headline text-xl text-primary font-medium group-hover:text-secondary transition-colors">
                      {suite.name}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {suite.description}
                    </p>
                  </div>

                  {/* Key Features / Amenities */}
                  <div className="space-y-2 py-2">
                    {suite.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-on-surface">
                        <span className="material-symbols-outlined text-secondary text-base">
                          {feat.icon}
                        </span>
                        <span>{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer / Pricing & Actions */}
              <div className="p-6 pt-0 space-y-4">
                <div className="flex items-baseline justify-between bg-surface-container-low p-3.5 rounded-lg">
                  <span className="font-label text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Nightly Rate
                  </span>
                  <div>
                    <span className="font-headline text-xl font-medium text-primary">
                      €{suite.pricePerNight.toLocaleString()}
                    </span>
                    <span className="font-body text-[11px] text-on-surface-variant"> / night</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onExploreSuite(suite)}
                    className="h-10 rounded-md bg-surface-container-high text-on-surface font-label text-xs uppercase tracking-wider font-semibold hover:bg-surface-container-highest transition-colors flex items-center justify-center cursor-pointer"
                  >
                    Explore Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(suite.id)}
                    className="h-10 rounded-md bg-primary text-on-primary font-label text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    Instant Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Inclusions Matrix */}
      <section className="w-full bg-surface-container-lowest rounded-xl p-8 shadow-sm mb-12 border border-surface-container-highest/60">
        <div className="max-w-3xl mb-8 space-y-2">
          <div className="flex items-center gap-2 text-secondary font-label text-xs uppercase tracking-widest font-semibold">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>The Aurelia Standard</span>
          </div>
          <h3 className="font-headline text-2xl md:text-3xl text-primary font-normal">
            Complimentary Inclusions with Every Stay
          </h3>
          <p className="font-body text-xs md:text-sm text-on-surface-variant leading-relaxed">
            Regardless of your suite selection, every guest at The Grand Aurelia experiences our uncompromising standard of Mediterranean hospitality.
          </p>
        </div>

        {/* 4 Pillar Inclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-container-low p-5 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-xl">bakery_dining</span>
            </div>
            <div>
              <h4 className="font-headline text-base font-medium text-primary mb-1">
                Epicurean Breakfast
              </h4>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Multi-course morning tasting served on your private terrace or at Ristorante Aurelia.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-5 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-xl">sailing</span>
            </div>
            <div>
              <h4 className="font-headline text-base font-medium text-primary mb-1">
                Riva Yacht Transfer
              </h4>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Private wooden Riva speedboat transfers directly from Naples or Capri harbor.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-5 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-xl">person_pin</span>
            </div>
            <div>
              <h4 className="font-headline text-base font-medium text-primary mb-1">
                24/7 Butler Service
              </h4>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Bespoke wardrobe unpack, garment pressing, and personalized itinerary curation.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low p-5 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-xl">spa</span>
            </div>
            <div>
              <h4 className="font-headline text-base font-medium text-primary mb-1">
                Thermal Spa Circuit
              </h4>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                Unlimited access to Roman hydrotherapy grottos, sauna, and ocean ice plunges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Concierge Inquiries & Buyout Banner */}
      <section className="w-full bg-primary text-on-primary rounded-xl p-8 md:p-12 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-10">
          <span className="material-symbols-outlined text-[160px]">hotel_class</span>
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary-fixed text-lg">
              verified
            </span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary-fixed font-semibold">
              Exclusive Bespoke Services
            </span>
          </div>
          <div className="space-y-3">
            <h3 className="font-headline text-3xl md:text-4xl font-normal leading-tight">
              Private Wing Buyouts &amp; Extended Escapes
            </h3>
            <p className="font-body text-sm text-surface-dim font-light leading-relaxed max-w-2xl">
              Seeking full privacy for exclusive weddings, corporate summits, or multi-generational family estates? Our Head Concierge orchestrates custom multi-suite floor plans, private security protocol, and tailored superyacht moorings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onContactConcierge}
              className="h-12 px-6 bg-surface-container-lowest text-primary rounded-lg font-label text-xs uppercase tracking-widest font-semibold hover:bg-surface-dim transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">support_agent</span>
              <span>Contact Head Concierge</span>
            </button>
            <button
              onClick={handleDownloadFloorplans}
              className="h-12 px-6 border-0 bg-white/10 text-on-primary rounded-lg font-label text-xs uppercase tracking-widest font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Floorplans (Portfolio)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
