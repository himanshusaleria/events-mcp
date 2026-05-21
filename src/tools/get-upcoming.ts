import { Event } from "../data/types.js";
import { getEventsForCity, getAllEvents } from "../data/fetcher.js";

export interface GetUpcomingParams {
  city: string;
  limit?: number;
  offset?: number;
}

export async function getUpcomingEvents(
  params: GetUpcomingParams
): Promise<Event[]> {
  const { city, limit = 10, offset = 0 } = params;
  const clampedLimit = Math.min(limit, 50);

  const events = await getEventsForCity(city);
  const now = Date.now();

  const upcoming = events
    .filter((e) => new Date(e.start_at).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
    );

  return upcoming.slice(offset, offset + clampedLimit);
}
