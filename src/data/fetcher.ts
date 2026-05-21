import { Event, CITIES, BASE_URL } from "./types.js";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

let cachedEvents: Map<string, Event[]> = new Map();
let cacheTimestamp = 0;

function isCacheValid(): boolean {
  return Date.now() - cacheTimestamp < CACHE_TTL_MS && cachedEvents.size > 0;
}

async function fetchCityEvents(cityKey: string): Promise<Event[]> {
  const url = `${BASE_URL}/${cityKey}_latest.json`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch ${url}: ${res.status}`);
    return [];
  }
  return (await res.json()) as Event[];
}

export async function loadAllEvents(): Promise<Map<string, Event[]>> {
  if (isCacheValid()) return cachedEvents;

  const entries = await Promise.all(
    Object.keys(CITIES).map(async (cityKey) => {
      const events = await fetchCityEvents(cityKey);
      return [cityKey, events] as [string, Event[]];
    })
  );

  cachedEvents = new Map(entries);
  cacheTimestamp = Date.now();
  return cachedEvents;
}

export async function getEventsForCity(
  cityKey: string
): Promise<Event[]> {
  const all = await loadAllEvents();
  return all.get(cityKey) ?? [];
}

export async function getAllEvents(): Promise<Event[]> {
  const all = await loadAllEvents();
  const merged: Event[] = [];
  for (const events of all.values()) {
    merged.push(...events);
  }
  return merged;
}
