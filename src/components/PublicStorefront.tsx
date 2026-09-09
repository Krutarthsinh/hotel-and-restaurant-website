import React, { useState } from 'react';
import { PageView, Suite } from '../types';
import {
  HERO_IMAGE_URL,
  COLONNADE_IMAGE_URL,
  BATH_IMAGE_URL,
  MAP_IMAGE_URL,
  SUITES_DATA,
  DINING_DATA,
  EXPERIENCES_DATA,
  HOTEL_LOGO_URL,
} from '../data/hotelData';

interface PublicStorefrontProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: (initialSuiteId?: string) => void;
  onExploreSuite: (suite: Suite) => void;
  onOpenTableBooking: (restaurantName: string) => void;
}

export const PublicStorefront: React.FC<PublicStorefrontProps> = ({
  onNavigate,
  onOpenBooking,
  onExploreSuite,
  onOpenTableBooking,
}) => {
  // Booking engine state
  const [checkInDate, setCheckInDate] = useState('2025-10-14');
  const [checkOutDate, setCheckOutDate] = useState('2025-10-19');
  const [guestCount, setGuestCount] = useState('2 Adults');
  const [suiteCategory, setSuiteCategory] = useState('All Suites');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const featuredSuites = SUITES_DATA.slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* 1. Immersive Hero Section */}
      <section className="relative w-full min-h-[92vh] -mt-20 flex flex-col justify-between">
        {/* Hero Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            alt="The Grand Aurelia Master Penthouse with panoramic sunset over the Amalfi coastline"
            className="w-full h-full object-cover object-center brightness-[0.92]"
            src={HERO_IMAGE_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-primary/45"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent"></div>
        </div>

        {/* Top Spacer for Shell Header Clearance */}
        <div className="pt-32"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16 text-surface">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-[1px] bg-secondary-fixed"></span>
            <span className="font-label text-xs tracking-[0.24em] uppercase text-secondary-fixed font-semibold">
              Positano • Amalfi Coast, Italy
            </span>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight max-w-3xl text-surface">
            A Sanctuary Designed Around You
          </h1>

          <p className="font-body text-base sm:text-lg text-surface/85 font-light leading-relaxed max-w-xl mt-6">
            Perched atop the sun-drenched cliffs of Amalfi, where timeless Italian stonecraft meets unhurried Mediterranean serenity.
          </p>

          {/* Floating Micro Highlights */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-surface/15 text-xs font-label tracking-widest text-surface/80 uppercase">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                pool
              </span>
              <span>Private Seafront Plunges</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                verified
              </span>
              <span>Michelin Gastronomy</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
                flight_takeoff
              </span>
              <span>Private Heliport Access</span>
            </div>
          </div>
        </div>

        {/* Integrated Booking Engine Bar */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 -mb-12 lg:-mb-14">
          <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 shadow-2xl shadow-primary/20 backdrop-blur-md border border-surface-container-highest/60">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-center">
              {/* Check-in */}
              <div className="flex flex-col p-3 rounded-lg bg-surface-container-low/80 hover:bg-surface-container-low transition-colors group">
                <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary font-semibold">
                  Check-In
                </span>
                <div className="flex items-center justify-between mt-1">
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="font-headline text-base text-on-surface font-medium bg-transparent focus:outline-none cursor-pointer w-full"
                    id="booking-checkin-input"
                  />
                  <span className="material-symbols-outlined text-secondary group-hover:-translate-y-0.5 transition-transform text-[18px] pointer-events-none">
                    calendar_today
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-body mt-0.5">
                  Arrival from 15:00
                </span>
              </div>

              {/* Check-out */}
              <div className="flex flex-col p-3 rounded-lg bg-surface-container-low/80 hover:bg-surface-container-low transition-colors group">
                <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary font-semibold">
                  Check-Out
                </span>
                <div className="flex items-center justify-between mt-1">
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="font-headline text-base text-on-surface font-medium bg-transparent focus:outline-none cursor-pointer w-full"
                    id="booking-checkout-input"
                  />
                  <span className="material-symbols-outlined text-secondary group-hover:-translate-y-0.5 transition-transform text-[18px] pointer-events-none">
                    event
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-body mt-0.5">
                  5 Nights Stay
                </span>
              </div>

              {/* Guests */}
              <div className="flex flex-col p-3 rounded-lg bg-surface-container-low/80 hover:bg-surface-container-low transition-colors group">
                <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary font-semibold">
                  Guests &amp; Rooms
                </span>
                <div className="flex items-center justify-between mt-1">
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="font-headline text-base text-on-surface font-medium bg-transparent focus:outline-none cursor-pointer w-full"
                    id="booking-guests-select"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults • 1 Child">2 Adults • 1 Child</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4+ Guests">4+ Guests (Villa)</option>
                  </select>
                  <span className="material-symbols-outlined text-secondary group-hover:scale-105 transition-transform text-[18px] pointer-events-none">
                    group
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-body mt-0.5">
                  1 Suite
                </span>
              </div>

              {/* Suite Type */}
              <div className="flex flex-col p-3 rounded-lg bg-surface-container-low/80 hover:bg-surface-container-low transition-colors group">
                <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary font-semibold">
                  Accommodations
                </span>
                <div className="flex items-center justify-between mt-1">
                  <select
                    value={suiteCategory}
                    onChange={(e) => setSuiteCategory(e.target.value)}
                    className="font-headline text-base text-on-surface font-medium bg-transparent focus:outline-none cursor-pointer w-full"
                    id="booking-suite-type-select"
                  >
                    <option value="All Suites">All Suites</option>
                    <option value="Cliffside Penthouses">Cliffside Penthouses</option>
                    <option value="Garden Villas">Garden Villas</option>
                    <option value="Azure Sea Suites">Azure Sea Suites</option>
                    <option value="Deluxe Terraces">Deluxe Terraces</option>
                  </select>
                  <span className="material-symbols-outlined text-secondary group-hover:translate-y-0.5 transition-transform text-[18px] pointer-events-none">
                    expand_more
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-body mt-0.5">
                  Sea View • Villas
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-1 sm:pt-0 sm:col-span-2 lg:col-span-1 h-full flex items-center">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full h-full min-h-[52px] px-6 rounded-lg bg-primary text-on-primary font-label text-xs uppercase tracking-[0.16em] font-semibold hover:bg-secondary transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  type="button"
                  id="booking-check-availability-btn"
                >
                  <span>Check Availability</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Narrative: The Aurelia Way */}
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label text-[10px] uppercase tracking-[0.18em] font-semibold">
                Editorial Heritage
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface leading-[1.15]">
              The Aurelia Way: Architectural Serenity
            </h2>

            <p className="font-body text-base text-on-surface-variant leading-relaxed font-light">
              Carved into the sheer volcanic cliffs of the Tyrrhenian shore, The Grand Aurelia reimagines classic Campania estate architecture. Monolithic Italian travertine, hand-raked linen drapery, and brass luminaires frame uninterrupted ocean vistas.
            </p>

            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Here, hospitality is an unhurried, tailor-made ritual. From silent butler unpackings to private morning espresso served on sea-facing solariums, every touchpoint operates with graceful discretion.
            </p>

            {/* Stats Micro Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-surface-container-high">
              <div>
                <span className="block font-headline text-2xl lg:text-3xl text-primary font-medium">32</span>
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Bespoke Suites</span>
              </div>
              <div>
                <span className="block font-headline text-2xl lg:text-3xl text-primary font-medium">1:1</span>
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Butler Dedicated</span>
              </div>
              <div>
                <span className="block font-headline text-2xl lg:text-3xl text-primary font-medium">1840</span>
                <span className="font-label text-[10px] uppercase tracking-wider text-secondary">Estate Inception</span>
              </div>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 relative">
            <div className="sm:col-span-7 overflow-hidden rounded-xl shadow-lg bg-surface-container">
              <img
                className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700"
                alt="Travertine Colonnade"
                src={COLONNADE_IMAGE_URL}
              />
              <div className="p-4 bg-surface-container-lowest">
                <span className="font-label text-[10px] uppercase tracking-[0.14em] text-secondary block font-semibold">
                  Travertine Colonnade
                </span>
                <span className="font-body text-xs text-on-surface-variant">
                  Naturally cooled stone courtyards overlooking Li Galli islands
                </span>
              </div>
            </div>

            <div className="sm:col-span-5 space-y-6 sm:mt-12">
              <div className="overflow-hidden rounded-xl shadow-md bg-surface-container">
                <img
                  className="w-full h-[220px] object-cover hover:scale-105 transition-transform duration-700"
                  alt="Sanctuary Bathrooms"
                  src={BATH_IMAGE_URL}
                />
                <div className="p-3 bg-surface-container-lowest">
                  <span className="font-label text-[10px] uppercase tracking-[0.14em] text-secondary block font-semibold">
                    Sanctuary Bathrooms
                  </span>
                  <span className="font-body text-[11px] text-on-surface-variant">
                    Carved limestone soaking tubs
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-container-high/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    room_service
                  </span>
                </div>
                <div>
                  <h4 className="font-headline text-sm font-semibold text-primary">
                    Signature Aurelia Butler
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant mt-1 leading-snug">
                    Private cellar access, bespoke excursion itineraries, and discreet packing assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Suites & Private Residences */}
      <section className="py-20 bg-surface-container-low w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
                Accommodations
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal">
                Featured Suites &amp; Residences
              </h2>
            </div>
            <button
              onClick={() => onNavigate('rooms-suites')}
              className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-[0.18em] text-primary hover:text-secondary transition-colors font-semibold group cursor-pointer"
            >
              <span>View All 32 Sanctuaries</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                east
              </span>
            </button>
          </div>

          {/* Suite Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredSuites.map((suite) => (
              <article
                key={suite.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-surface-container-highest/40"
              >
                <div className="relative overflow-hidden aspect-[16/11]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={suite.name}
                    src={suite.imageUrl}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label text-[10px] uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
                      {suite.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md text-primary font-body text-xs font-semibold">
                    From €{suite.pricePerNight.toLocaleString()} <span className="font-normal text-on-surface-variant text-[10px]">/ night</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-headline text-xl lg:text-2xl text-on-surface font-medium group-hover:text-secondary transition-colors">
                      {suite.name}
                    </h3>
                    <p className="font-body text-xs text-on-surface-variant mt-2 leading-relaxed">
                      {suite.description}
                    </p>

                    {/* Amenity micro-chips */}
                    <div className="grid grid-cols-3 gap-2 mt-5 py-3 border-y border-surface-container-high text-center">
                      <div>
                        <span className="block font-label text-[10px] uppercase text-outline">Surface</span>
                        <span className="font-body text-xs font-semibold text-on-surface">{suite.surfaceSqm} sqm</span>
                      </div>
                      <div>
                        <span className="block font-label text-[10px] uppercase text-outline">Bed</span>
                        <span className="font-body text-xs font-semibold text-on-surface truncate">{suite.bedType}</span>
                      </div>
                      <div>
                        <span className="block font-label text-[10px] uppercase text-outline">Capacity</span>
                        <span className="font-body text-xs font-semibold text-on-surface">Up to {suite.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onExploreSuite(suite)}
                      className="flex-1 py-3 text-center rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-label text-xs uppercase tracking-wider transition-colors font-semibold cursor-pointer"
                    >
                      Explore
                    </button>
                    <button
                      onClick={() => onOpenBooking(suite.id)}
                      className="flex-1 py-3 text-center rounded bg-primary hover:bg-neutral-800 text-on-primary font-label text-xs uppercase tracking-wider transition-colors font-semibold cursor-pointer"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Signature Dining & Culinary Destination */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="font-label text-xs uppercase tracking-[0.24em] text-secondary font-semibold mb-3">
            Gastronomy
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface">
            Culinary Artistry Above the Sea
          </h2>
          <p className="font-body text-sm text-on-surface-variant mt-4 leading-relaxed font-light">
            Sourcing directly from our terraced organic gardens and the day's catch from local Amalfi fishermen, our culinary program marries heritage Campanian flavours with modernist precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {DINING_DATA.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-all duration-300 border border-surface-container-highest/40"
            >
              <div className="md:w-1/2 overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={restaurant.name}
                  src={restaurant.imageUrl}
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      {restaurant.id === 'il-tramonto' ? 'star' : 'local_bar'}
                    </span>
                    <span className="font-label text-[10px] uppercase tracking-[0.16em] text-secondary font-bold">
                      {restaurant.accolade}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl text-on-surface font-medium">
                    {restaurant.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant mt-3 leading-relaxed">
                    {restaurant.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-surface-container-high space-y-2 text-[11px] font-body text-on-surface-variant">
                    <div className="flex items-center justify-between">
                      <span>Service Window:</span>
                      <strong className="text-on-surface">{restaurant.hours}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cellar &amp; Music:</span>
                      <strong className="text-on-surface">{restaurant.cellarLabels}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenTableBooking(restaurant.name)}
                  className="w-full py-2.5 rounded bg-primary text-on-primary font-label text-xs uppercase tracking-wider text-center hover:bg-neutral-800 transition-colors font-semibold cursor-pointer"
                >
                  {restaurant.id === 'il-tramonto' ? 'Reserve a Table' : 'Reserve Lounge Seating'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Curated Experiences & Amenities Bento */}
      <section className="py-20 bg-surface-container-high/40 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold block mb-2">
                The Estate Ecosystem
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-on-surface">
                Curated Experiences
              </h2>
            </div>
            <button
              onClick={() => onNavigate('experiences')}
              className="text-xs font-label uppercase tracking-widest text-primary hover:text-secondary font-semibold cursor-pointer"
            >
              Discover Itineraries →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES_DATA.map((exp, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container-highest/30"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">
                      {exp.icon}
                    </span>
                  </div>
                  <h4 className="font-headline text-lg font-medium text-on-surface">
                    {exp.title}
                  </h4>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-label text-[10px] uppercase tracking-wider text-secondary font-semibold">
                    {exp.badge}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {exp.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guest Acclaim & Press Quotes */}
      <section className="py-24 max-w-6xl mx-auto px-6 lg:px-12 w-full text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary-fixed/40 text-secondary mb-6">
          <span className="material-symbols-outlined text-[28px]">format_quote</span>
        </div>
        <div className="space-y-8">
          <blockquote className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-light leading-snug italic max-w-4xl mx-auto">
            “The Grand Aurelia achieves that rarest feat among cliffside Amalfi palaces: it feels neither crowded nor ostentatious, but rather like a serene family estate preserved in amber.”
          </blockquote>
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="font-headline text-base font-semibold text-primary uppercase tracking-wider">
              Condé Nast Traveler
            </span>
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">
              Gold List • World's Best Sanctuary 2024
            </span>
          </div>

          {/* Supporting Critical Press Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-75">
            <div className="text-center">
              <span className="font-headline text-lg font-medium tracking-wide">Architectural Digest</span>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-1">
                "Masterpiece of Stone"
              </p>
            </div>
            <div className="text-center">
              <span className="font-headline text-lg font-medium tracking-wide">The Financial Times</span>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-1">
                "Bespoke Grandeur"
              </p>
            </div>
            <div className="text-center">
              <span className="font-headline text-lg font-medium tracking-wide">Michelin Guide</span>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-1">
                "Selected Destination"
              </p>
            </div>
            <div className="text-center">
              <span className="font-headline text-lg font-medium tracking-wide">Robb Report</span>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mt-1">
                "Top European Hideaway"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Map & Location Overview */}
      <section className="py-20 bg-surface-container-low w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Location Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold block">
                Arrival &amp; Setting
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal">
                Perched Above Positano
              </h2>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                Secluded on the upper cliff terraces of Via Panoramica, elevated above the bustle while maintaining direct funicular access down to our private marine jetty.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                    flight
                  </span>
                  <div className="text-xs">
                    <span className="font-semibold text-primary block">Naples International (NAP)</span>
                    <span className="text-on-surface-variant">
                      18 min via private helicopter transfer | 75 min chauffeur
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                    sailing
                  </span>
                  <div className="text-xs">
                    <span className="font-semibold text-primary block">Private Deepwater Anchorage</span>
                    <span className="text-on-surface-variant">
                      Tender transit to estate funicular directly from guest yachts
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-container-lowest shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                    location_on
                  </span>
                  <div className="text-xs">
                    <span className="font-semibold text-primary block">Via Panoramica 42</span>
                    <span className="text-on-surface-variant">
                      84017 Positano (SA), Amalfi Coast, Italy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="lg:col-span-7">
              <div
                className="rounded-xl overflow-hidden shadow-md h-[400px] w-full relative bg-cover bg-center"
                style={{ backgroundImage: `url('${MAP_IMAGE_URL}')` }}
              >
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="absolute top-6 left-6 p-4 rounded-lg bg-surface-container-lowest/95 backdrop-blur-md shadow-lg max-w-xs border border-surface-container-highest">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
                    <span className="font-headline text-sm font-semibold text-primary">
                      The Grand Aurelia
                    </span>
                  </div>
                  <p className="font-body text-[11px] text-on-surface-variant mt-1">
                    Amalfi Coast Cliffside Landmark
                  </p>
                  <div className="mt-3 pt-2 border-t border-surface-container-high flex items-center justify-between text-[10px] font-label uppercase text-secondary font-semibold">
                    <span>Lat: 40.6281° N</span>
                    <span>Long: 14.4850° E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Quick Reservation Call to Action Banner */}
      <section className="py-20 bg-primary text-on-primary w-full relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="material-symbols-outlined text-[340px]">hotel_class</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <span className="font-label text-xs uppercase tracking-[0.24em] text-secondary-fixed font-semibold">
              Your Season in the Sun
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-normal text-on-primary">
              Begin Your Journey to Aurelia
            </h2>
            <p className="font-body text-sm text-surface/80 font-light">
              Reserve directly with our private concierge office to ensure preferred suite floor selection and complimentary harbor transfers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded bg-surface text-primary font-label text-xs uppercase tracking-[0.18em] font-semibold hover:bg-secondary-fixed transition-colors text-center shadow-lg cursor-pointer"
            >
              Reserve Your Suite
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded bg-transparent border border-surface/30 text-surface font-label text-xs uppercase tracking-[0.18em] font-medium hover:border-surface transition-colors text-center cursor-pointer"
            >
              Speak with Concierge
            </button>
          </div>
        </div>
      </section>

      {/* 9. Luxury Footer */}
      <footer className="w-full bg-surface-container-low text-on-surface-variant pt-20 pb-12 shadow-[0_-1px_6px_rgba(0,0,0,0.02)] border-t border-surface-container-highest">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-surface-container-highest">
            <div className="lg:col-span-2 space-y-5 pr-0 lg:pr-8">
              <div className="flex items-center gap-3">
                <img
                  alt="The Grand Aurelia Hotel Logo"
                  className="h-8 w-auto object-contain"
                  src={HOTEL_LOGO_URL}
                />
                <span className="font-headline text-lg tracking-wide text-primary uppercase font-medium">
                  The Grand Aurelia
                </span>
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant max-w-sm">
                Perched on the cliffside of Positano, The Grand Aurelia embodies timeless Mediterranean opulence, bespoke Italian hospitality, and panoramic coastal tranquility.
              </p>
              <div className="pt-2">
                <p className="text-xs font-label uppercase tracking-[0.16em] text-secondary font-semibold mb-3">
                  Private Newsletter
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-sm">
                  <input
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-surface-container-lowest text-on-surface placeholder:text-outline rounded border border-surface-container-highest focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Enter your email address"
                    type="email"
                    required
                  />
                  <button
                    className="px-4 py-2.5 bg-primary text-on-primary text-xs uppercase tracking-wider font-label rounded hover:bg-neutral-800 transition-colors shrink-0 font-semibold cursor-pointer"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
                {newsletterSubscribed && (
                  <p className="text-xs text-secondary font-medium mt-2 animate-in fade-in">
                    Thank you. You have been enrolled in the private Aurelia Journal.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-label text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-5">
                The Estate
              </h4>
              <ul className="space-y-3 text-xs tracking-wider">
                <li onClick={() => onNavigate('rooms-suites')} className="hover:text-primary transition-colors cursor-pointer">
                  Suites &amp; Villas
                </li>
                <li onClick={() => onNavigate('dining')} className="hover:text-primary transition-colors cursor-pointer">
                  Ristorante Belvedere
                </li>
                <li onClick={() => onNavigate('wellness')} className="hover:text-primary transition-colors cursor-pointer">
                  The Cliffside Spa
                </li>
                <li onClick={() => onNavigate('experiences')} className="hover:text-primary transition-colors cursor-pointer">
                  Private Yacht Charter
                </li>
                <li onClick={() => onNavigate('dining')} className="hover:text-primary transition-colors cursor-pointer">
                  Curated Cellar
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-label text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-5">
                Concierge &amp; Reach
              </h4>
              <ul className="space-y-3 text-xs leading-relaxed text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    location_on
                  </span>
                  <span>Via Panoramica 48, 84017 Positano (SA), Italy</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
                  <span>+39 089 875 1120</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">mail</span>
                  <span>concierge@grandaurelia.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-label text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-5">
                Accreditation
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Leading Hotels of the World • Condé Nast Gold List 2024 • Michelin Selected Destination
              </p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center p-2 rounded bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[20px]">hotel_class</span>
                </span>
                <span className="inline-flex items-center justify-center p-2 rounded bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </span>
                <span className="inline-flex items-center justify-center p-2 rounded bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-[20px]">spa</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-label tracking-wider">
            <p className="text-on-surface-variant">
              © 2025 The Grand Aurelia Hotel &amp; Resorts S.r.l. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-on-surface-variant">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Cookie Preferences</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
