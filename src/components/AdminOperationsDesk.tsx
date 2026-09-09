import React, { useState, useEffect } from 'react';
import { Reservation, RoomUnit } from '../types';
import { INITIAL_ROOM_MATRIX } from '../data/hotelData';

interface AdminOperationsDeskProps {
  reservations: Reservation[];
  onCheckInReservation: (resId: string) => void;
  onSelectFolio: (ref: string) => void;
  onOpenManualWalkIn: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminOperationsDesk: React.FC<AdminOperationsDeskProps> = ({
  reservations,
  onCheckInReservation,
  onSelectFolio,
  onOpenManualWalkIn,
  onShowToast,
}) => {
  const [analyticsRange, setAnalyticsRange] = useState<'7d' | '30d'>('7d');
  const [channelFilter, setChannelFilter] = useState('All Distribution Channels');
  const [arrivalSearch, setArrivalSearch] = useState('');
  const [roomMatrix, setRoomMatrix] = useState<RoomUnit[]>(INITIAL_ROOM_MATRIX);
  const [currentTime, setCurrentTime] = useState('14:28:40 CEST');

  // Keep a live clock matching Positano time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Rome',
        hour12: false,
      });
      setCurrentTime(`${timeString} CEST`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter arrivals
  const priorityArrivals = reservations
    .filter((r) => r.status === 'Arriving Today' || r.status === 'Checked-In' || r.status === 'In-House')
    .filter((r) => {
      if (!arrivalSearch) return true;
      const s = arrivalSearch.toLowerCase();
      return (
        r.guestName.toLowerCase().includes(s) ||
        r.suiteNumber.toLowerCase().includes(s) ||
        r.ref.toLowerCase().includes(s)
      );
    });

  // Filter ledger stream
  const ledgerStream = reservations.filter((r) => {
    if (channelFilter === 'All Distribution Channels') return true;
    return r.channelType.toLowerCase().includes(channelFilter.toLowerCase());
  });

  // Toggle room status
  const cycleRoomStatus = (roomNumber: string) => {
    setRoomMatrix((prev) =>
      prev.map((r) => {
        if (r.number !== roomNumber) return r;
        const cycle: Record<RoomUnit['status'], RoomUnit['status']> = {
          inspected: 'occupied',
          occupied: 'cleaning',
          cleaning: 'turndown',
          turndown: 'inspected',
        };
        const nextStatus = cycle[r.status];
        onShowToast(`Suite #${r.number} status updated to: ${nextStatus.toUpperCase()}`);
        return { ...r, status: nextStatus };
      })
    );
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-16">
      {/* Top Heading & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <p className="font-label text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">
              Haute Hospitality Command • Shift 08:00 - 16:00
            </p>
          </div>
          <h1 className="font-headline text-3xl md:text-4xl text-on-surface font-medium tracking-tight">
            Executive Operations &amp; Yield Desk
          </h1>
          <p className="font-body text-xs md:text-sm text-on-surface-variant mt-1">
            Autonomous oversight for Aurelia Grand Estates &amp; Signature Suites
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded shadow-xs text-xs font-label border border-surface-container-highest/60">
            <span className="text-on-surface-variant mr-2">Audit Timestamp:</span>
            <span className="font-semibold text-on-surface font-mono">{currentTime}</span>
          </div>
          <button
            onClick={() => onShowToast('Shift filter: Currently displaying Day Shift 08:00 - 16:00')}
            className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-label uppercase tracking-wider px-4 py-2.5 rounded transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
            Shift Filter
          </button>
          <button
            onClick={onOpenManualWalkIn}
            className="flex items-center gap-2 bg-primary hover:bg-neutral-800 text-on-primary text-xs font-label uppercase tracking-wider px-4 py-2.5 rounded transition-all shadow-md cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            Manual Walk-In
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Inventory */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-[11px] uppercase tracking-wider font-semibold">
              Total Inventory
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]">hotel</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl text-on-surface font-semibold">124</span>
              <span className="font-label text-xs text-secondary font-medium">Suites Total</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5 pt-3 bg-surface-container-low/60 p-2 rounded text-[11px] font-label">
              <div>
                <p className="text-on-surface-variant text-[10px]">OCCUPIED</p>
                <p className="font-semibold text-on-surface">86 (69.4%)</p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px]">AVAILABLE</p>
                <p className="font-semibold text-secondary">31</p>
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px]">MAINT / T/O</p>
                <p className="font-semibold text-error">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Today Arrivals */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-[11px] uppercase tracking-wider font-semibold">
              Today Arrivals
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]">flight_land</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl text-on-surface font-semibold">18</span>
              <span className="font-label text-xs text-on-surface-variant">Expected Patrons</span>
            </div>
            <div className="mt-3 flex items-center justify-between bg-surface-container-low/60 p-2 rounded text-[11px] font-label">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-on-surface-variant">12 Registered</span>
              </div>
              <span className="font-semibold text-on-surface">6 Pending</span>
            </div>
          </div>
        </div>

        {/* Card 3: Today Departures */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-[11px] uppercase tracking-wider font-semibold">
              Today Departures
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]">flight_takeoff</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl text-on-surface font-semibold">14</span>
              <span className="font-label text-xs text-on-surface-variant">Checkouts Scheduled</span>
            </div>
            <div className="mt-3 flex items-center justify-between bg-surface-container-low/60 p-2 rounded text-[11px] font-label">
              <span className="text-on-surface-variant">11 Cleared Keycards</span>
              <span className="font-semibold text-secondary">3 Late Checkouts</span>
            </div>
          </div>
        </div>

        {/* Card 4: Gross Day Revenue */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-[11px] uppercase tracking-wider font-semibold">
              Gross Day Revenue
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl text-on-surface font-semibold">€128,450</span>
            </div>
            <div className="mt-3 flex items-center justify-between bg-secondary-container/50 p-2 rounded text-[11px] font-label text-on-secondary-container">
              <span className="flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +14.2%
              </span>
              <span>vs Target €112,500</span>
            </div>
          </div>
        </div>

        {/* Card 5: ADR & RevPAR */}
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label text-[11px] uppercase tracking-wider font-semibold">
              ADR &amp; RevPAR
            </span>
            <span className="material-symbols-outlined text-secondary text-[20px]">analytics</span>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline text-3xl text-on-surface font-semibold">€985.40</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                RevPAR
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between bg-surface-container-low/60 p-2 rounded text-[11px] font-label">
              <span className="text-on-surface-variant">ADR Realized:</span>
              <span className="font-semibold text-on-surface font-mono">€1,420.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Occupancy Velocity & Yield Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Chart: Occupancy Velocity */}
        <div className="xl:col-span-2 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-xl text-on-surface font-medium">
                  Occupancy Velocity &amp; Revenue Projection
                </h2>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase tracking-wider">
                  Live Feed
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">
                Historical trajectory matching forecasted yield pace
              </p>
            </div>
            <div className="flex items-center bg-surface-container-low p-1 rounded">
              <button
                onClick={() => setAnalyticsRange('7d')}
                className={`px-3 py-1 text-xs font-label rounded cursor-pointer transition-all ${
                  analyticsRange === '7d'
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setAnalyticsRange('30d')}
                className={`px-3 py-1 text-xs font-label rounded cursor-pointer transition-all ${
                  analyticsRange === '30d'
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="w-full h-56 relative flex flex-col justify-between py-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="w-full border-b border-surface-container-highest border-dashed"></div>
              <div className="w-full border-b border-surface-container-highest border-dashed"></div>
              <div className="w-full border-b border-surface-container-highest border-dashed"></div>
              <div className="w-full border-b border-surface-container-highest border-dashed"></div>
            </div>

            <svg className="w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 700 180">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fedeb2" stopOpacity="0.6"></stop>
                  <stop offset="100%" stopColor="#fedeb2" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              {analyticsRange === '7d' ? (
                <>
                  <path
                    d="M 0,140 C 70,125 120,95 180,105 C 260,118 310,75 390,70 C 470,65 520,35 600,45 C 650,52 680,25 700,20 L 700,180 L 0,180 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M 0,140 C 70,125 120,95 180,105 C 260,118 310,75 390,70 C 470,65 520,35 600,45 C 650,52 680,25 700,20"
                    fill="none"
                    stroke="#725b38"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="180" cy="105" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="390" cy="70" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="600" cy="45" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="700" cy="20" fill="#725b38" r="5" stroke="#ffffff" strokeWidth="2" />
                </>
              ) : (
                <>
                  <path
                    d="M 0,110 C 70,80 140,130 210,90 C 280,60 350,110 420,50 C 490,40 560,70 630,30 C 665,20 685,15 700,10 L 700,180 L 0,180 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M 0,110 C 70,80 140,130 210,90 C 280,60 350,110 420,50 C 490,40 560,70 630,30 C 665,20 685,15 700,10"
                    fill="none"
                    stroke="#725b38"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <circle cx="210" cy="90" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="420" cy="50" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="630" cy="30" fill="#1b1c1a" r="4" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="700" cy="10" fill="#725b38" r="5" stroke="#ffffff" strokeWidth="2" />
                </>
              )}
            </svg>

            <div className="flex justify-between items-center text-[10px] font-label text-on-surface-variant pt-2 uppercase tracking-wider z-10">
              {analyticsRange === '7d' ? (
                <>
                  <span>Thu (Oct 24)</span>
                  <span>Fri (Oct 25)</span>
                  <span>Sat (Oct 26)</span>
                  <span>Sun (Oct 27)</span>
                  <span>Mon (Oct 28)</span>
                  <span>Tue (Oct 29)</span>
                  <span className="font-bold text-secondary">Today (Oct 30)</span>
                </>
              ) : (
                <>
                  <span>Oct 01</span>
                  <span>Oct 08</span>
                  <span>Oct 15</span>
                  <span>Oct 22</span>
                  <span className="font-bold text-secondary">Oct 30 (Today)</span>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 bg-surface-container-low/50 rounded p-3 flex flex-wrap items-center justify-between text-xs font-label gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-secondary rounded-xs"></span>
                <span className="text-on-surface">Revenue Pace Trend</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-surface-container-highest rounded"></span>
                <span className="text-on-surface-variant">Benchmark Budget Line</span>
              </div>
            </div>
            <span className="text-on-surface-variant text-[11px]">
              Next 48h Projected Occupancy: <strong className="text-on-surface font-semibold">91.4%</strong>
            </span>
          </div>
        </div>

        {/* Right Card: Yield by Category */}
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-headline text-xl text-on-surface font-medium">Yield by Category</h2>
              <span className="material-symbols-outlined text-secondary text-[20px]">pie_chart</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant mb-6">
              Weighted allocation against current demand rate
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-label mb-1">
                  <span className="font-semibold text-on-surface">Penthouse Grand Duplex (8)</span>
                  <span className="font-bold text-secondary">98% Yield</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '98%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>Avg €3,850/night</span>
                  <span>1 Available</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-label mb-1">
                  <span className="font-semibold text-on-surface">Garden Reserve Villas (16)</span>
                  <span className="font-bold text-secondary">92% Yield</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>Avg €2,400/night</span>
                  <span>2 Available</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-label mb-1">
                  <span className="font-semibold text-on-surface">Azure Sea Suites (42)</span>
                  <span className="font-bold text-on-surface">84% Yield</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-on-surface h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>Avg €1,650/night</span>
                  <span>7 Available</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-label mb-1">
                  <span className="font-semibold text-on-surface">Deluxe Harbor Terraces (58)</span>
                  <span className="font-bold text-on-surface">78% Yield</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-outline h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
                  <span>Avg €980/night</span>
                  <span>18 Available</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 bg-surface-container-low p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
              <span className="font-label text-xs font-semibold text-on-surface">Dynamic Rev Boost</span>
            </div>
            <button
              onClick={() => onShowToast('Dynamic revenue yield adjusted: Minimum floor rate raised by 8.5%')}
              className="bg-secondary hover:bg-on-secondary-container text-on-secondary text-[11px] font-label font-semibold px-2.5 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer"
            >
              Adjust Floor
            </button>
          </div>
        </div>
      </section>

      {/* Priority Arrivals & Room Matrix Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Priority Arrivals & VIP Roster (7 cols) */}
        <div className="xl:col-span-7 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col border border-surface-container-highest/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-xl text-on-surface font-medium">
                  Priority Arrivals &amp; VIP Roster
                </h2>
                <span className="bg-secondary-container/70 text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-label font-bold uppercase tracking-wider">
                  {priorityArrivals.length} En Route
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-0.5">
                High-touch guest protocols requiring white-glove check-in
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  value={arrivalSearch}
                  onChange={(e) => setArrivalSearch(e.target.value)}
                  className="bg-surface-container-low text-on-surface text-xs pl-8 pr-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-secondary w-48 font-body border border-surface-container-highest/50"
                  placeholder="Search arrival..."
                  type="text"
                />
                <span className="material-symbols-outlined absolute left-2 top-2 text-[16px] text-on-surface-variant">
                  search
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-surface-container-low text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                  <th className="py-3 px-6">Guest Profile</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Suite</th>
                  <th className="py-3 px-4">ETA / Transfer</th>
                  <th className="py-3 px-4">Dedicated Butler</th>
                  <th className="py-3 px-4">Special Directives</th>
                  <th className="py-3 px-6 text-right">Operational Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-highest text-xs font-body text-on-surface">
                {priorityArrivals.map((guest) => {
                  const isCheckedIn = guest.status === 'Checked-In' || guest.status === 'In-House';
                  return (
                    <tr key={guest.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-4 px-6">
                        <div
                          onClick={() => onSelectFolio(guest.ref)}
                          className="font-semibold text-on-surface hover:text-secondary cursor-pointer"
                        >
                          {guest.guestName}
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                          Folio #{guest.ref} • {guest.nights} Nights
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 bg-primary text-on-primary text-[10px] font-label font-bold px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[10px] text-secondary-fixed">
                            diamond
                          </span>
                          {guest.privilegeTier}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold font-label text-sm text-secondary">
                          {guest.suiteNumber}
                        </span>
                        <span className="block text-[10px] text-on-surface-variant">
                          {guest.suiteType}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-on-surface">{guest.eta}</div>
                        <div className="text-[10px] text-on-surface-variant truncate max-w-[120px]">
                          {guest.transferDetails}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] font-bold">
                            {guest.dedicatedButler.initials}
                          </div>
                          <span className="text-xs">{guest.dedicatedButler.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="inline-block bg-secondary-container/40 text-on-secondary-container px-2 py-1 rounded text-[11px] font-medium max-w-[150px] truncate"
                          title={guest.specialDirectives}
                        >
                          {guest.specialDirectives}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {isCheckedIn ? (
                          <span className="bg-[#edf3ee] text-[#2d4736] px-3 py-1.5 rounded text-xs font-label uppercase tracking-wider font-semibold cursor-default">
                            CHECKED-IN
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              onCheckInReservation(guest.id);
                              onShowToast(`Checked-in guest ${guest.guestName} to ${guest.suiteNumber}`);
                            }}
                            className="bg-primary hover:bg-secondary text-on-primary hover:text-on-secondary px-3 py-1.5 rounded text-xs font-label uppercase tracking-wider font-semibold transition-colors shadow-sm cursor-pointer"
                          >
                            Check-In
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between text-xs font-label text-on-surface-variant">
            <span>Displaying {priorityArrivals.length} priority entries of 18 arrivals</span>
            <button
              onClick={() => onSelectFolio('BK-90241')}
              className="text-secondary hover:text-primary font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Manifest</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right: Room Matrix & Turnaround (5 cols) */}
        <div className="xl:col-span-5 bg-surface-container-lowest p-6 rounded-lg shadow-sm flex flex-col justify-between border border-surface-container-highest/60">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-headline text-xl text-on-surface font-medium">
                  Room Matrix &amp; Turnaround
                </h2>
                <p className="font-body text-xs text-on-surface-variant mt-0.5">
                  Floor-level live telemetry and housekeeper assignment
                </p>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label text-[10px] uppercase font-semibold text-secondary">
                  Active Dispatch
                </span>
              </div>
            </div>

            {/* Status Legend */}
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-label">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded text-on-surface font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3d7a5a]"></span> Inspected (10)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded text-on-surface font-medium">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Occupied (8)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded text-on-surface font-medium">
                <span className="w-2 h-2 rounded-full bg-[#c98326]"></span> Cleaning (5)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container rounded text-on-surface font-medium">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Turndown / Deep (2)
              </span>
            </div>

            {/* Room Matrix Grid Levels */}
            <div className="mt-5 space-y-4">
              {/* Level 1: Garden Villas */}
              <div>
                <div className="flex items-center justify-between text-xs font-label mb-2">
                  <span className="font-semibold text-on-surface uppercase tracking-wider">
                    Level 1: Garden Villas (101 - 110)
                  </span>
                  <span className="text-[11px] text-secondary font-medium">
                    All Inspected &amp; Sealed
                  </span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                  {roomMatrix
                    .filter((r) => r.level === 1)
                    .map((room) => {
                      const bgClass =
                        room.status === 'inspected'
                          ? 'bg-[#3d7a5a] text-white'
                          : room.status === 'occupied'
                          ? 'bg-primary text-on-primary'
                          : room.status === 'cleaning'
                          ? 'bg-[#c98326] text-white'
                          : 'bg-secondary text-white';
                      return (
                        <div
                          key={room.number}
                          onClick={() => cycleRoomStatus(room.number)}
                          className={`h-8 rounded flex items-center justify-center text-[10px] font-label font-bold shadow-xs cursor-pointer hover:scale-105 transition-transform ${bgClass} ${
                            room.isVip ? 'ring-2 ring-secondary' : ''
                          }`}
                          title={`Suite ${room.number}: ${room.status.toUpperCase()}${
                            room.guest ? ` (${room.guest})` : ''
                          } - Click to toggle state`}
                        >
                          {room.number}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Level 2: Deluxe Terraces */}
              <div>
                <div className="flex items-center justify-between text-xs font-label mb-2">
                  <span className="font-semibold text-on-surface uppercase tracking-wider">
                    Level 2: Deluxe Terraces (201 - 208)
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    Occupied In-House
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {roomMatrix
                    .filter((r) => r.level === 2)
                    .map((room) => {
                      const bgClass =
                        room.status === 'inspected'
                          ? 'bg-[#3d7a5a] text-white'
                          : room.status === 'occupied'
                          ? 'bg-primary text-on-primary'
                          : room.status === 'cleaning'
                          ? 'bg-[#c98326] text-white'
                          : 'bg-secondary text-white';
                      return (
                        <div
                          key={room.number}
                          onClick={() => cycleRoomStatus(room.number)}
                          className={`h-8 rounded flex items-center justify-center text-[10px] font-label font-bold shadow-xs cursor-pointer hover:scale-105 transition-transform ${bgClass} ${
                            room.isVip ? 'ring-2 ring-secondary' : ''
                          }`}
                          title={`Suite ${room.number}: ${room.status.toUpperCase()}${
                            room.guest ? ` (${room.guest})` : ''
                          } - Click to toggle state`}
                        >
                          {room.number}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Level 3: Azure Suites */}
              <div>
                <div className="flex items-center justify-between text-xs font-label mb-2">
                  <span className="font-semibold text-on-surface uppercase tracking-wider">
                    Level 3: Azure Suites (301 - 305)
                  </span>
                  <span className="text-[11px] text-[#c98326] font-medium">
                    Housekeeping Turn In-Progress
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {roomMatrix
                    .filter((r) => r.level === 3)
                    .map((room) => {
                      const bgClass =
                        room.status === 'inspected'
                          ? 'bg-[#3d7a5a] text-white'
                          : room.status === 'occupied'
                          ? 'bg-primary text-on-primary'
                          : room.status === 'cleaning'
                          ? 'bg-[#c98326] text-white'
                          : 'bg-secondary text-white';
                      return (
                        <div
                          key={room.number}
                          onClick={() => cycleRoomStatus(room.number)}
                          className={`h-8 rounded flex items-center justify-center text-[10px] font-label font-bold shadow-xs cursor-pointer hover:scale-105 transition-transform ${bgClass} ${
                            room.isVip ? 'ring-2 ring-secondary' : ''
                          }`}
                          title={`Suite ${room.number}: ${room.status.toUpperCase()}${
                            room.guest ? ` (${room.guest})` : ''
                          } - Click to toggle state`}
                        >
                          {room.number}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Level 4: Penthouses */}
              <div>
                <div className="flex items-center justify-between text-xs font-label mb-2">
                  <span className="font-semibold text-on-surface uppercase tracking-wider">
                    Level 4: Penthouses (401 - 402)
                  </span>
                  <span className="text-[11px] text-secondary font-medium">
                    Deep Sanitization / VIP Prep
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => cycleRoomStatus('401')}
                    className="h-9 rounded flex items-center justify-center text-xs font-label font-bold text-white bg-secondary cursor-pointer hover:scale-105 transition-transform shadow-xs"
                    title="Suite 401: Turndown Evening Protocol"
                  >
                    Suite 401 • Turndown Prep
                  </div>
                  <div
                    onClick={() => cycleRoomStatus('402')}
                    className="h-9 rounded flex items-center justify-center text-xs font-label font-bold text-white bg-secondary ring-2 ring-primary cursor-pointer hover:scale-105 transition-transform shadow-xs"
                    title="Suite 402: Deep Sanitization & Flower Staging"
                  >
                    Suite 402 • VIP Ready Check
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-surface-container-highest flex items-center gap-2">
            <button
              onClick={() => onShowToast('Housekeeping team assigned to Level 3 turnaround.')}
              className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label font-semibold py-2 rounded transition-colors uppercase tracking-wider text-center cursor-pointer"
            >
              Assign Staff
            </button>
            <button
              onClick={() => onShowToast('Quick dispatch sent to Chief Concierge.')}
              className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label font-semibold py-2 rounded transition-colors uppercase tracking-wider text-center cursor-pointer"
            >
              Quick Dispatch
            </button>
            <button
              onClick={() => onShowToast('Maintenance ticket opened for priority inspection.')}
              className="bg-error/10 hover:bg-error/20 text-error px-3 py-2 rounded text-xs font-label font-semibold transition-colors flex items-center justify-center cursor-pointer"
              title="Report Suite Disrepair"
            >
              <span className="material-symbols-outlined text-[18px]">build</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Ledger & Central Reservation Stream */}
      <section className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-container-highest/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline text-xl text-on-surface font-medium">
                Real-Time Ledger &amp; Central Reservation Stream
              </h2>
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            </div>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Audited multi-channel booking and automated deposit intake
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-label">
            <span className="text-on-surface-variant">Filter Source:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="bg-surface-container-low text-on-surface text-xs px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-secondary font-label border border-surface-container-highest/50 cursor-pointer"
            >
              <option value="All Distribution Channels">All Distribution Channels</option>
              <option value="Direct">Direct Brand Web &amp; VIP</option>
              <option value="Virtuoso">Virtuoso Preferred</option>
              <option value="Amex">Amex Fine Hotels &amp; Resorts</option>
              <option value="LHW">Leading Hotels of the World</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                <th className="py-3 px-6">Booking Reference</th>
                <th className="py-3 px-4">Channel Origin</th>
                <th className="py-3 px-4">Guest Primary</th>
                <th className="py-3 px-4">Stay Windows</th>
                <th className="py-3 px-4">Accommodations</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Settlement State</th>
                <th className="py-3 px-6 text-right">Accounting Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest text-xs font-body text-on-surface">
              {ledgerStream.map((booking) => (
                <tr key={booking.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-on-surface">
                    #{booking.ref}
                    <span className="block text-[10px] text-on-surface-variant font-normal">
                      Audited Record
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-[11px] font-medium text-on-surface">
                      <span className="material-symbols-outlined text-[13px] text-secondary">
                        public
                      </span>
                      {booking.channel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{booking.guestName}</td>
                  <td className="py-3.5 px-4 text-on-surface-variant text-[11px] whitespace-nowrap">
                    {booking.dates} ({booking.nights}N)
                  </td>
                  <td className="py-3.5 px-4 font-label text-xs">
                    {booking.suiteName} ({booking.suiteNumber})
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-on-surface font-mono">
                    €{booking.totalAmount.toLocaleString()}.00
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 bg-[#edf3ee] text-[#2d4736] px-2 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d4736]"></span>
                      {booking.depositState}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => onSelectFolio(booking.ref)}
                      className="text-secondary hover:text-primary font-label text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      View Folio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Operational Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex items-center gap-4 border border-surface-container-highest/60">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[26px]">
              cleaning_services
            </span>
          </div>
          <div>
            <h3 className="font-headline text-base text-on-surface font-medium">
              Turndown Service Window
            </h3>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Commences 17:30. 48 suites require customized pillow preferences.
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex items-center gap-4 border border-surface-container-highest/60">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[26px]">
              restaurant_menu
            </span>
          </div>
          <div>
            <h3 className="font-headline text-base text-on-surface font-medium">
              Dinner Covers: Il Tramonto
            </h3>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Fully booked (74 Covers). VIP tables allocated for Suites #402, #305.
            </p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-lg shadow-sm flex items-center gap-4 border border-surface-container-highest/60">
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[26px]">
              directions_boat
            </span>
          </div>
          <div>
            <h3 className="font-headline text-base text-on-surface font-medium">
              Yacht Tender Logistics
            </h3>
            <p className="font-body text-xs text-on-surface-variant mt-0.5">
              Aurelia Riva II departure scheduled 16:30 for sunset bay excursion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
