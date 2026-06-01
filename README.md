# events-mcp

MCP server for discovering tech events, startup meetups, AI events, hackathons, and more across 17 cities — **including hidden events not on featured pages**.

Data updates every 2 hours from [hiddenevents.online](https://hiddenevents.online).

## Cities

**US:** New York City, San Francisco, Los Angeles, Austin, Seattle, Miami, Boston
**Canada:** Toronto, Vancouver, Montreal
**India:** Bengaluru, Mumbai, New Delhi, Pune, Hyderabad, Chennai
**Singapore**

## Install

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "events": {
      "command": "npx",
      "args": ["-y", "events-mcp"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add events -- npx -y events-mcp
```

### Cursor / VS Code

Add to MCP settings:

```json
{
  "mcpServers": {
    "events": {
      "command": "npx",
      "args": ["-y", "events-mcp"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `search_events` | Full-text search across event names, hosts, organizers, and tags. Filter by city, date range. |
| `get_upcoming_events` | Get the next upcoming events in a city, sorted by date. |
| `list_cities` | List all available cities with event counts. |

## Example Prompts

**Find your people**
- "I'm a product manager in Bengaluru — find me events where I can meet other PMs this week"
- "I'm looking to meet second-time founders in SF — what events should I go to?"
- "Find events in Mumbai where I can meet VCs and angel investors"

**Never miss what matters**
- "What AI events are happening in Bengaluru this week that most people don't know about?"
- "I'm visiting Singapore next week — what's the best tech event to attend?"
- "Show me all hackathons in the next 2 weeks across all cities"

**Plan your week**
- "Build me a networking calendar for SF this week — prioritize startup and founder events"
- "What are the top 5 events in Delhi this weekend for someone in the AI space?"
- "Compare what's happening in Bengaluru vs Chennai this week"

**Discover hidden gems**
- "Find small, intimate founder dinners in SF — not the big conferences"
- "What events in Pune have fewer than 50 guests? I want to actually meet people"
- "Show me events from organizers I haven't heard of in Hyderabad"

## How It Works

Events are scraped from multiple sources every 2 hours — not just featured/curated pages, but also map pins and organizer calendars. This means we surface events that don't appear on Luma's discover page.

The MCP server fetches event data from [hiddenevents.online](https://hiddenevents.online) (hosted on GitHub Pages) and caches it in memory. No API key needed. No database. Zero config.

## License

MIT
