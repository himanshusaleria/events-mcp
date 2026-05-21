import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { searchEvents } from "./tools/search-events.js";
import { getUpcomingEvents } from "./tools/get-upcoming.js";
import { listCities } from "./tools/list-cities.js";
import { CITIES } from "./data/types.js";

const cityKeys = Object.keys(CITIES);

export function createServer(): McpServer {
  const server = new McpServer({
    name: "events-mcp",
    version: "0.1.0",
  });

  server.tool(
    "search_events",
    "Search for tech events, startup meetups, AI events, and more across cities. Searches event names, hosts, organizers, and tags.",
    {
      query: z.string().describe("Search query (e.g. 'AI meetup', 'hackathon', 'startup dinner')"),
      city: z.enum(cityKeys as [string, ...string[]]).optional().describe("Filter by city key (e.g. 'bengaluru', 'sf', 'new-delhi')"),
      from_date: z.string().optional().describe("Start date filter (ISO 8601, e.g. '2026-05-20')"),
      to_date: z.string().optional().describe("End date filter (ISO 8601)"),
      limit: z.number().min(1).max(50).default(20).optional().describe("Max results (default 20, max 50)"),
    },
    async (params) => {
      const events = await searchEvents(params);
      return {
        content: [
          {
            type: "text" as const,
            text: events.length === 0
              ? "No events found matching your search."
              : JSON.stringify(events, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "get_upcoming_events",
    "Get the next upcoming events in a specific city, sorted by date. Great for finding what's happening soon.",
    {
      city: z.enum(cityKeys as [string, ...string[]]).describe("City key (e.g. 'bengaluru', 'sf', 'mumbai')"),
      limit: z.number().min(1).max(50).default(10).optional().describe("Number of events (default 10, max 50)"),
      offset: z.number().min(0).default(0).optional().describe("Skip first N events for pagination"),
    },
    async (params) => {
      const events = await getUpcomingEvents(params);
      return {
        content: [
          {
            type: "text" as const,
            text: events.length === 0
              ? "No upcoming events found for this city."
              : JSON.stringify(events, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "list_cities",
    "List all available cities with event counts. Use this to see which cities have events and how many.",
    {},
    async () => {
      const cities = await listCities();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(cities, null, 2),
          },
        ],
      };
    }
  );

  return server;
}
