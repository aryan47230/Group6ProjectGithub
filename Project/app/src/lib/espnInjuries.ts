import * as cheerio from "cheerio";

export type NBAInjury = {
  player: string;
  team: string;
  position: string;
  date: string;
  injury: string;
  status: string;
};

const ESPN_NBA_INJURIES_URL = "https://www.espn.com/nba/injuries";

export async function fetchNbaInjuries(): Promise<NBAInjury[]> {
  const res = await fetch(ESPN_NBA_INJURIES_URL, {
    // Use Next.js / node fetch on the server
    next: { revalidate: 60 }, // cache for 60s to avoid hammering ESPN
    headers: {
      // Some sites (including ESPN at times) are picky about user agents.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ESPN injuries: ${res.status}`);
  }

  const html = await res.text();

  const $ = cheerio.load(html);
  const injuries: NBAInjury[] = [];

  // Debug: high-level info about the DOM we received
  const tableCount = $("table").length;
  console.log("ESPN NBA injuries: tables found =", tableCount);

  // Fallback: just harvest every table row that looks like an injury row
  $("table tbody tr").each((_, row) => {
    const cells = $(row).find("td");
    if (cells.length < 5) return;

    const player = $(cells[0]).text().trim();
    const position = $(cells[1]).text().trim();
    const date = $(cells[2]).text().trim();
    const status = $(cells[3]).text().trim();
    const injury = $(cells[4]).text().trim();

    if (!player || player.toLowerCase().includes("name")) return;

    injuries.push({
      player,
      team: "", // team isn't clearly labeled near each table in this DOM
      position,
      date,
      injury,
      status,
    });
  });

  console.log("ESPN NBA injuries parsed count:", injuries.length);
  console.log("Sample injuries:", injuries.slice(0, 10));

  return injuries;
}

