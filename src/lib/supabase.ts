import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Reservation } from '../types';

// Read Supabase credentials from client-side environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validates if real credentials are provided
export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim().startsWith('http') &&
  !supabaseUrl.includes('MY_') &&
  !supabaseAnonKey.includes('MY_')
);

// Lazy or safe initialization
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export interface ContactInquiryRecord {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface DiningReservationRecord {
  id?: string;
  restaurant_name: string;
  guest_name: string;
  reservation_date: string;
  reservation_time: string;
  guests_count: string;
  seating_area: string;
  dietary_notes?: string;
  created_at?: string;
}

// SQL Schema for the user to execute in the Supabase SQL editor
export const SUPABASE_SQL_SCHEMA = `-- =======================================================
-- The Grand Aurelia • Positano Luxury Estate Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- =======================================================

-- 1. Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  ref TEXT UNIQUE NOT NULL,
  guest_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  privilege_tier TEXT DEFAULT 'Direct Patron VIP',
  suite_number TEXT NOT NULL,
  suite_name TEXT NOT NULL,
  suite_type TEXT NOT NULL,
  floor INTEGER DEFAULT 1,
  dates TEXT NOT NULL,
  check_in DATE,
  check_out DATE,
  nights INTEGER DEFAULT 1,
  party_composition TEXT DEFAULT '2 Adults',
  status TEXT DEFAULT 'Confirmed',
  channel TEXT DEFAULT 'Direct Brand Web',
  channel_type TEXT DEFAULT 'Direct',
  total_amount NUMERIC(12, 2) DEFAULT 0.00,
  settled_amount NUMERIC(12, 2) DEFAULT 0.00,
  deposit_state TEXT DEFAULT 'Authorized & Guaranteed',
  turnover_state TEXT DEFAULT 'Inspected & Sealed',
  eta TEXT DEFAULT '15:00',
  transfer_details TEXT DEFAULT 'Private Riva Speedboat Transfer',
  dedicated_butler_name TEXT DEFAULT 'Matteo Bellini',
  dedicated_butler_initials TEXT DEFAULT 'MB',
  special_directives TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Allow public read & write for guest bookings and hotelier admin
CREATE POLICY "Allow public select on reservations" 
  ON public.reservations FOR SELECT USING (true);

CREATE POLICY "Allow public insert on reservations" 
  ON public.reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on reservations" 
  ON public.reservations FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete on reservations" 
  ON public.reservations FOR DELETE USING (true);

-- Realtime publication for live operations updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;

-- 2. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on contact_inquiries" 
  ON public.contact_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on contact_inquiries" 
  ON public.contact_inquiries FOR SELECT USING (true);

-- 3. Dining Reservations Table
CREATE TABLE IF NOT EXISTS public.dining_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  guests_count TEXT NOT NULL,
  seating_area TEXT NOT NULL,
  dietary_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dining_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on dining_reservations" 
  ON public.dining_reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on dining_reservations" 
  ON public.dining_reservations FOR SELECT USING (true);
`;

/**
 * Transforms a Supabase DB row into the application Reservation model
 */
export function mapRowToReservation(row: any): Reservation {
  return {
    id: row.id,
    ref: row.ref,
    guestName: row.guest_name,
    email: row.email || undefined,
    phone: row.phone || undefined,
    privilegeTier: row.privilege_tier || 'Direct Patron VIP',
    suiteNumber: row.suite_number,
    suiteName: row.suite_name,
    suiteType: row.suite_type,
    floor: row.floor || 1,
    dates: row.dates,
    checkIn: row.check_in || undefined,
    checkOut: row.check_out || undefined,
    nights: Number(row.nights) || 1,
    partyComposition: row.party_composition || '2 Adults',
    status: row.status || 'Confirmed',
    channel: row.channel || 'Direct Brand Web',
    channelType: row.channel_type || 'Direct',
    totalAmount: Number(row.total_amount) || 0,
    settledAmount: Number(row.settled_amount) || 0,
    depositState: row.deposit_state || 'Authorized & Guaranteed',
    turnoverState: row.turnover_state || 'Inspected & Sealed',
    eta: row.eta || '15:00',
    transferDetails: row.transfer_details || 'Private Transfer',
    dedicatedButler: {
      name: row.dedicated_butler_name || 'Matteo Bellini',
      initials: row.dedicated_butler_initials || 'MB',
    },
    specialDirectives: row.special_directives || '',
  };
}

/**
 * Transforms an application Reservation into a Supabase row format
 */
export function mapReservationToRow(res: Reservation) {
  return {
    id: res.id,
    ref: res.ref,
    guest_name: res.guestName,
    email: res.email || null,
    phone: res.phone || null,
    privilege_tier: res.privilegeTier,
    suite_number: res.suiteNumber,
    suite_name: res.suiteName,
    suite_type: res.suiteType,
    floor: res.floor || 1,
    dates: res.dates,
    check_in: res.checkIn || null,
    check_out: res.checkOut || null,
    nights: res.nights,
    party_composition: res.partyComposition || '2 Adults',
    status: res.status,
    channel: res.channel,
    channel_type: res.channelType,
    total_amount: res.totalAmount,
    settled_amount: res.settledAmount || 0,
    deposit_state: res.depositState,
    turnover_state: res.turnoverState || 'Inspected & Sealed',
    eta: res.eta,
    transfer_details: res.transferDetails,
    dedicated_butler_name: res.dedicatedButler.name,
    dedicated_butler_initials: res.dedicatedButler.initials,
    special_directives: res.specialDirectives,
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches all reservations from Supabase (or returns null if not configured / errored)
 */
export async function fetchReservationsFromSupabase(): Promise<Reservation[] | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchReservations warning:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapRowToReservation);
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return null;
  }
}

/**
 * Inserts or upserts a reservation into Supabase
 */
export async function saveReservationToSupabase(
  reservation: Reservation
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const row = mapReservationToRow(reservation);
    const { error } = await supabase.from('reservations').upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Supabase saveReservation error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Supabase saveReservation exception:', err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * Updates a reservation's status in Supabase
 */
export async function updateReservationStatusInSupabase(
  resId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const { error } = await supabase
      .from('reservations')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', resId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * Inserts a contact message inquiry to Supabase
 */
export async function saveContactInquiryToSupabase(inquiry: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const { error } = await supabase.from('contact_inquiries').insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        message: inquiry.message,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * Inserts a dining reservation to Supabase
 */
export async function saveDiningReservationToSupabase(dining: {
  restaurantName: string;
  guestName: string;
  date: string;
  time: string;
  guests: string;
  seatingArea: string;
  dietary?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const { error } = await supabase.from('dining_reservations').insert([
      {
        restaurant_name: dining.restaurantName,
        guest_name: dining.guestName,
        reservation_date: dining.date,
        reservation_time: dining.time,
        guests_count: dining.guests,
        seating_area: dining.seatingArea,
        dietary_notes: dining.dietary || null,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

/**
 * Seeds Supabase with the luxury initial reservations if the table is empty
 */
export async function seedReservationsIfEmpty(
  initialReservations: Reservation[]
): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { count, error } = await supabase
      .from('reservations')
      .select('*', { count: 'exact', head: true });

    if (error) return false;

    if (count === 0 && initialReservations.length > 0) {
      const rows = initialReservations.map(mapReservationToRow);
      const { error: insertError } = await supabase.from('reservations').insert(rows);
      if (insertError) {
        console.warn('Seeding reservations warning:', insertError.message);
        return false;
      }
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Failed to check/seed Supabase table:', err);
    return false;
  }
}

/**
 * Subscribes to real-time changes on the reservations table
 */
export function subscribeToSupabaseReservations(
  onDataChange: () => void
): (() => void) | null {
  if (!supabase) return null;

  const channel = supabase
    .channel('hotel_reservations_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reservations',
      },
      () => {
        onDataChange();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
