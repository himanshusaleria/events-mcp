import { Event } from "../data/types.js";
import { getAllEvents, getEventsForCity } from "../data/fetcher.js";

export interface SearchEventsParams {
  query: string;
  city?: string;
  from_date?: string;
  to_date?: string;
  limit?: number;
}

export async function searchEvents(
  params: SearchEventsParams
): Promise<Event[]> {
  const { query, city, from_date, to_date, limit = 20 } = params;
  const clampedLimit = Math.min(limit, 50);

  let events = city ? await getEventsForCity(city) : await getAllEvents();

  const queryLower = query.toLowerCase();
  events = events.filter((e) => {
    const haystack =
      `${e.name} ${e.hosts} ${e.calendar_name} ${e.tags} ${e.city}`.toLowerCase();
    return haystack.includes(queryLower);
  });

  if (from_date) {
    const from = new Date(from_date).getTime();
    events = events.filter((e) => new Date(e.start_at).getTime() >= from);
  }
  if (to_date) {
    const to = new Date(to_date).getTime();
    events = events.filter((e) => new Date(e.start_at).getTime() <= to);
  }

  events.sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );

  return events.slice(0, clampedLimit);
}
