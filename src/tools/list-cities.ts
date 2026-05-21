import { CITIES, CityInfo } from "../data/types.js";
import { loadAllEvents } from "../data/fetcher.js";

export async function listCities(): Promise<CityInfo[]> {
  const allEvents = await loadAllEvents();
  return Object.entries(CITIES).map(([key, info]) => ({
    key,
    label: info.label,
    country: info.country,
    event_count: allEvents.get(key)?.length ?? 0,
  }));
}
