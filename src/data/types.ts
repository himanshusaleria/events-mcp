export interface Event {
  event_id: string;
  name: string;
  url: string;
  start_at: string;
  end_at: string;
  timezone: string;
  location_type: string;
  venue: string;
  full_address: string;
  city: string;
  sublocality: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  cover_url: string;
  guest_count: number | null;
  hosts: string;
  calendar_name: string;
  calendar_slug: string | null;
  event_type: string;
  visibility: string;
  waitlist_active: boolean;
  source: string;
  tags: string;
}

export interface CityInfo {
  key: string;
  label: string;
  country: string;
  event_count: number;
}

export const CITIES: Record<string, { label: string; country: string }> = {
  bengaluru: { label: "Bengaluru", country: "India" },
  singapore: { label: "Singapore", country: "Singapore" },
  sf: { label: "San Francisco", country: "US" },
  mumbai: { label: "Mumbai", country: "India" },
  "new-delhi": { label: "New Delhi", country: "India" },
  boston: { label: "Boston", country: "US" },
  pune: { label: "Pune", country: "India" },
  hyderabad: { label: "Hyderabad", country: "India" },
  chennai: { label: "Chennai", country: "India" },
  toronto: { label: "Toronto", country: "Canada" },
  vancouver: { label: "Vancouver", country: "Canada" },
  montreal: { label: "Montreal", country: "Canada" },
};

export const BASE_URL = "https://hiddenevents.online/data";
