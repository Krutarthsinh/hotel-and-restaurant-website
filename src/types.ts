export type PageView =
  | 'home'
  | 'rooms-suites'
  | 'dining'
  | 'wellness'
  | 'experiences'
  | 'about'
  | 'contact'
  | 'admin-reservations'
  | 'admin-inventory'
  | 'admin-operations';

export type SuiteCategory =
  | 'all'
  | 'penthouse'
  | 'villa'
  | 'azure'
  | 'harbor';

export interface Suite {
  id: string;
  name: string;
  category: 'penthouse' | 'villa' | 'azure' | 'harbor';
  categoryLabel: string;
  badge: string;
  pricePerNight: number;
  surfaceSqm: number;
  surfaceSqft: number;
  bedType: string;
  capacity: number;
  imageUrl: string;
  description: string;
  floor: number;
  roomUnitNumber?: string;
  view: string;
  amenities: string[];
  features: {
    icon: string;
    text: string;
  }[];
  traits: string[];
}

export interface Reservation {
  id: string;
  ref: string;
  guestName: string;
  email?: string;
  phone?: string;
  privilegeTier:
    | 'Black Diamond'
    | 'Black Diamond Elite'
    | 'Black Diamond Founder'
    | 'Sapphire'
    | 'Preferred Club'
    | 'First-Time Guest'
    | 'Sovereign Patron'
    | 'Ambassador Tier'
    | 'Luminary VIP'
    | 'Direct Patron VIP'
    | 'Walk-In VIP Patron'
    | string;
  suiteNumber: string;
  suiteName: string;
  suiteType: string;
  floor?: number;
  dates: string;
  checkIn?: string;
  checkOut?: string;
  nights: number;
  partyComposition?: string;
  status:
    | 'Checked-In'
    | 'Arriving Today'
    | 'In-House'
    | 'Departures'
    | 'Departed'
    | 'Confirmed'
    | 'Pending Deposit'
    | string;
  channel: string;
  channelType:
    | 'Direct Web'
    | 'Virtuoso Preferred'
    | 'Amex Centurion'
    | 'Amex FHR'
    | 'LHW Global'
    | 'Direct VIP'
    | 'Direct'
    | string;
  totalAmount: number;
  settledAmount?: number;
  depositState: string;
  turnoverState?:
    | 'Inspected & Sealed'
    | 'Turndown Prep'
    | 'Turnover In Progress'
    | 'Maintenance Hold'
    | string;
  eta: string;
  transferDetails: string;
  dedicatedButler: {
    initials: string;
    name: string;
  };
  specialDirectives: string;
  preferences?: {
    icon: string;
    title: string;
    desc: string;
  }[];
  ledgerBreakdown?: {
    suiteRate: number;
    dining: number;
    spa: number;
    advanceDeposit: number;
  };
}

export interface RoomUnit {
  number: string;
  level: number;
  categoryName: string;
  status: 'inspected' | 'occupied' | 'cleaning' | 'turndown';
  guest?: string;
  isVip?: boolean;
}
