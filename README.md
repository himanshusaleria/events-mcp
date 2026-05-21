# events-mcp

MCP server for discovering tech events, startup meetups, AI events, hackathons, and more across 8 cities — **including hidden events not on featured pages**.

Data updates every 2 hours from [hiddenevents.online](https://hiddenevents.online).

## Cities

Bengaluru, Mumbai, New Delhi, Pune, Hyderabad, San Francisco, Boston, Singapore

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

- "What AI events are happening in Bengaluru this week?"
- "Find hackathons in San Francisco"
- "Show me upcoming startup events in Mumbai"
- "What tech meetups are in Singapore next month?"
- "List all cities with events"

## How It Works

Events are scraped from multiple sources every 2 hours — not just featured/curated pages, but also map pins and organizer calendars. This means we surface events that don't appear on Luma's discover page.

The MCP server fetches event data from [hiddenevents.online](https://hiddenevents.online) (hosted on GitHub Pages) and caches it in memory. No API key needed. No database. Zero config.

## License

MIT
