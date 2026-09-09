import React, { useState, useEffect, useCallback } from 'react';
import { PageView, Suite, Reservation } from './types';
import { INITIAL_RESERVATIONS, SUITES_DATA } from './data/hotelData';
import {
  isSupabaseConfigured,
  fetchReservationsFromSupabase,
  saveReservationToSupabase,
  updateReservationStatusInSupabase,
  seedReservationsIfEmpty,
  subscribeToSupabaseReservations,
} from './lib/supabase';
import { NavigationHeader } from './components/NavigationHeader';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopHeader } from './components/AdminTopHeader';
import { PublicStorefront } from './components/PublicStorefront';
import { RoomsAndSuitesView } from './components/RoomsAndSuitesView';
import { AdminOperationsDesk } from './components/AdminOperationsDesk';
import { AdminCentralReservations } from './components/AdminCentralReservations';
import { DiningView } from './components/DiningView';
import { WellnessSpaView } from './components/WellnessSpaView';
import { ExperiencesView } from './components/ExperiencesView';
import { ContactView } from './components/ContactView';
import { BookingModal } from './components/BookingModal';
import { SuiteDetailModal } from './components/SuiteDetailModal';
import { ManualWalkInModal } from './components/ManualWalkInModal';
import { TableBookingModal } from './components/TableBookingModal';
import { SupabaseModal } from './components/SupabaseModal';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Core PMS reservations state
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [selectedFolioRef, setSelectedFolioRef] = useState<string | null>(null);

  // Modals & Drawers
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialSuiteId, setBookingInitialSuiteId] = useState<string | undefined>(undefined);
  const [inspectedSuite, setInspectedSuite] = useState<Suite | null>(null);
  const [manualWalkInOpen, setManualWalkInOpen] = useState(false);
  const [tableBookingVenue, setTableBookingVenue] = useState<string | null>(null);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Supabase data fetcher
  const refreshReservationsFromSupabase = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    try {
      const data = await fetchReservationsFromSupabase();
      if (data && data.length > 0) {
        setReservations(data);
      } else if (data && data.length === 0) {
        // Automatically seed table if empty
        const didSeed = await seedReservationsIfEmpty(INITIAL_RESERVATIONS);
        if (didSeed) {
          const seededData = await fetchReservationsFromSupabase();
          if (seededData && seededData.length > 0) {
            setReservations(seededData);
          }
        }
      }
    } catch (err) {
      console.warn('Could not sync reservations from Supabase:', err);
    }
  }, []);

  // Load from Supabase on mount and listen to realtime updates
  useEffect(() => {
    refreshReservationsFromSupabase();

    const unsubscribe = subscribeToSupabaseReservations(() => {
      refreshReservationsFromSupabase();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [refreshReservationsFromSupabase]);

  // Reservation handlers
  const handleCheckInReservation = async (resId: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Checked-In' as const } : r))
    );
    await updateReservationStatusInSupabase(resId, 'Checked-In');
  };

  const handleCheckOutReservation = async (resId: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, status: 'Departed' as const } : r))
    );
    await updateReservationStatusInSupabase(resId, 'Departed');
  };

  const handleConfirmBooking = async (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Reservation #${newRes.ref} confirmed for ${newRes.guestName}`);
    await saveReservationToSupabase(newRes);
  };

  const handleRegisterWalkIn = async (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);
    showToast(`Walk-in checked in: ${newRes.guestName} to ${newRes.suiteNumber}`);
    await saveReservationToSupabase(newRes);
  };

  const openBookingForSuite = (suiteId?: string) => {
    setBookingInitialSuiteId(suiteId);
    setBookingModalOpen(true);
  };

  const isAdminPage =
    currentPage === 'admin-operations' ||
    currentPage === 'admin-reservations' ||
    currentPage === 'admin-inventory';

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {isAdminPage ? (
        /* Hotelier Admin Workspace */
        <div className="flex min-h-screen">
          {/* Admin Sidebar */}
          <div className="hidden lg:block">
            <AdminSidebar
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
            />
          </div>

          {/* Admin Top Header */}
          <AdminTopHeader
            onOpenSearch={() => {
              setCurrentPage('admin-reservations');
              showToast('Type in the search field to filter guest records.');
            }}
            onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
          />

          {/* Admin Main Body */}
          <main className="flex-1 w-full lg:pl-72 pt-24 px-6 lg:px-10 max-w-[1600px] mx-auto transition-all">
            {/* Mobile Admin Navigation Header */}
            <div className="lg:hidden flex items-center justify-between pb-6 mb-6 border-b border-surface-container-highest">
              <span className="font-headline text-lg font-bold uppercase text-primary">
                Hotelier Desk
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSupabaseModalOpen(true)}
                  className="px-2.5 py-1 text-xs font-label uppercase text-[#228355] bg-[#3ECF8E]/15 border border-[#3ECF8E]/40 rounded font-semibold"
                  title="Supabase Settings"
                >
                  DB
                </button>
                <button
                  onClick={() => setCurrentPage('admin-reservations')}
                  className={`px-3 py-1 text-xs font-label uppercase ${
                    currentPage === 'admin-reservations' ? 'bg-primary text-white font-bold' : 'bg-surface-container'
                  } rounded`}
                >
                  Folios
                </button>
                <button
                  onClick={() => setCurrentPage('admin-operations')}
                  className={`px-3 py-1 text-xs font-label uppercase ${
                    currentPage === 'admin-operations' ? 'bg-primary text-white font-bold' : 'bg-surface-container'
                  } rounded`}
                >
                  Yield Desk
                </button>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-3 py-1 text-xs font-label uppercase text-secondary border border-secondary rounded"
                >
                  Storefront
                </button>
              </div>
            </div>

            {currentPage === 'admin-operations' && (
              <AdminOperationsDesk
                reservations={reservations}
                onCheckInReservation={handleCheckInReservation}
                onSelectFolio={(ref) => {
                  setSelectedFolioRef(ref);
                  setCurrentPage('admin-reservations');
                }}
                onOpenManualWalkIn={() => setManualWalkInOpen(true)}
                onShowToast={showToast}
              />
            )}

            {currentPage === 'admin-reservations' && (
              <AdminCentralReservations
                reservations={reservations}
                selectedFolioRef={selectedFolioRef}
                onSelectFolio={setSelectedFolioRef}
                onCheckInReservation={handleCheckInReservation}
                onCheckOutReservation={handleCheckOutReservation}
                onOpenManualWalkIn={() => setManualWalkInOpen(true)}
                onShowToast={showToast}
              />
            )}

            {currentPage === 'admin-inventory' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-headline text-3xl font-medium text-primary">
                      Suite Inventory &amp; Specifications
                    </h1>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Direct inventory control and architectural specs across 32 sanctuaries
                    </p>
                  </div>
                  <button
                    onClick={() => setManualWalkInOpen(true)}
                    className="px-4 py-2 rounded bg-primary text-on-primary text-xs font-label uppercase font-semibold cursor-pointer"
                  >
                    Allocate Suite
                  </button>
                </div>
                <RoomsAndSuitesView
                  onOpenBooking={openBookingForSuite}
                  onExploreSuite={setInspectedSuite}
                  onContactConcierge={() => setCurrentPage('contact')}
                />
              </div>
            )}
          </main>
        </div>
      ) : (
        /* Public Luxury Storefront */
        <div className="flex flex-col min-h-screen">
          {/* Navigation Header */}
          <NavigationHeader
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onOpenBooking={() => openBookingForSuite()}
          />

          {/* Public Views Body */}
          <main className="flex-1 w-full pt-20">
            {currentPage === 'home' && (
              <PublicStorefront
                onNavigate={setCurrentPage}
                onOpenBooking={openBookingForSuite}
                onExploreSuite={setInspectedSuite}
                onOpenTableBooking={setTableBookingVenue}
              />
            )}

            {currentPage === 'rooms-suites' && (
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <RoomsAndSuitesView
                  onOpenBooking={openBookingForSuite}
                  onExploreSuite={setInspectedSuite}
                  onContactConcierge={() => setCurrentPage('contact')}
                />
              </div>
            )}

            {currentPage === 'dining' && (
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <DiningView onOpenTableBooking={setTableBookingVenue} />
              </div>
            )}

            {currentPage === 'wellness' && (
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <WellnessSpaView onShowToast={showToast} />
              </div>
            )}

            {currentPage === 'experiences' && (
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <ExperiencesView onShowToast={showToast} />
              </div>
            )}

            {currentPage === 'about' && (
              <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 space-y-10 text-on-surface">
                <div className="space-y-3 text-center">
                  <span className="font-label text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
                    1840 Estate Heritage
                  </span>
                  <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary font-normal">
                    The Story of Aurelia
                  </h1>
                  <p className="font-body text-base text-on-surface-variant font-light leading-relaxed max-w-xl mx-auto">
                    Conceived as a summer refuge for the Neapolitan nobility, The Grand Aurelia has stood for nearly two centuries above the azure Tyrrhenian waters.
                  </p>
                </div>

                <div className="space-y-6 text-sm md:text-base leading-relaxed text-on-surface-variant font-light">
                  <p>
                    Perched 280 meters above sea level on the cliff terraces of Positano, the estate was designed around natural limestone caverns and ancient olive groves. In 2021, an exhaustive four-year restoration brought together master Campanian stone masons, Venetian glass artisans, and contemporary architects to preserve its classical grandeur while introducing unobtrusive modern comfort.
                  </p>
                  <p>
                    Today, every guest enjoys a tailored relationship with the estate. With only thirty-two suites, our ratio of two staff members per guest guarantees privacy, intuitive care, and the rare sensation of residing within an aristocratic private home.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-surface-container-high text-center">
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <span className="font-headline text-3xl text-primary font-bold block">1840</span>
                    <span className="text-xs font-label uppercase tracking-wider text-secondary">Original Foundation</span>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <span className="font-headline text-3xl text-primary font-bold block">32</span>
                    <span className="text-xs font-label uppercase tracking-wider text-secondary">Exclusive Sanctuaries</span>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <span className="font-headline text-3xl text-primary font-bold block">2 : 1</span>
                    <span className="text-xs font-label uppercase tracking-wider text-secondary">Staff to Guest Ratio</span>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <button
                    onClick={() => setCurrentPage('rooms-suites')}
                    className="px-8 py-3.5 rounded bg-primary text-on-primary font-label text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
                  >
                    Explore Sanctuaries
                  </button>
                </div>
              </div>
            )}

            {currentPage === 'contact' && (
              <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                <ContactView onShowToast={showToast} />
              </div>
            )}
          </main>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          initialSuiteId={bookingInitialSuiteId}
          onClose={() => setBookingModalOpen(false)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Suite Details Modal */}
      {inspectedSuite && (
        <SuiteDetailModal
          suite={inspectedSuite}
          onClose={() => setInspectedSuite(null)}
          onReserve={(id) => openBookingForSuite(id)}
        />
      )}

      {/* Manual Walk-In Modal (Admin) */}
      {manualWalkInOpen && (
        <ManualWalkInModal
          onClose={() => setManualWalkInOpen(false)}
          onRegisterWalkIn={handleRegisterWalkIn}
        />
      )}

      {/* Fine Dining Table Booking Modal */}
      {tableBookingVenue && (
        <TableBookingModal
          restaurantName={tableBookingVenue}
          onClose={() => setTableBookingVenue(null)}
          onConfirm={showToast}
        />
      )}

      {/* Supabase Integration & Schema Hub */}
      {supabaseModalOpen && (
        <SupabaseModal
          onClose={() => setSupabaseModalOpen(false)}
          onRefreshData={refreshReservationsFromSupabase}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification Banner */}
      <ToastNotification
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
