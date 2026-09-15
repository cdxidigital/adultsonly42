import type { Entity } from "./types";

/** fleshsesh house records folded into the industry index. */
export const house: Entity[] = [
  {
    id: "fleshsesh",
    kind: "companies",
    name: "fleshsesh",
    subtitle: "Gender-fluid house · Perth",
    summary:
      "Perth house for signed talent, atelier objects, academy seats, and a professional industry index. Not a tube. Not a classifieds board.",
    body: "fleshsesh is a gender-fluid adult house. The roster is signed and consent-first. Creator OS, capture days, editorial lookbooks, and Perth nights sit on one ledger. The Atlas indexes public industry databases via Wikidata with a 21+ filter. No explicit media is hosted on this domain.",
    tags: ["house", "perth", "studio", "index", "gender-fluid"],
    region: "Perth, Western Australia",
    status: "Active",
    facts: [
      { label: "Founded", value: "Perth" },
      { label: "Model", value: "House + index + tools" },
      { label: "Door", value: "18+ on site · 21+ live index" },
    ],
    related: [
      { kind: "performers", id: "vale-noir" },
      { kind: "performers", id: "juniper-hale" },
      { kind: "agents", id: "fleshsesh-desk" },
      { kind: "events", id: "northbridge-silk-2026" },
      { kind: "law", id: "usc-2257" },
    ],
    socials: [{ platform: "Site", handle: "fleshsesh.com" }],
    source: "index",
  },
  {
    id: "fleshsesh-desk",
    kind: "agents",
    name: "fleshsesh desk",
    subtitle: "House representation · Perth",
    summary:
      "The desk that reads files. Roster management, campaign briefs, and lookbook leases. Pronouns travel with the paperwork.",
    tags: ["agency", "perth", "roster"],
    region: "Perth",
    status: "Active",
    facts: [
      { label: "Seat", value: "Perth" },
      { label: "Take", value: "File-based, not a walk-up" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "performers", id: "vale-noir" },
      { kind: "performers", id: "ash-vesper" },
    ],
    source: "index",
  },
  {
    id: "vale-noir",
    kind: "performers",
    name: "Vale Noir",
    subtitle: "Presence / campaign",
    aka: ["Vale"],
    summary:
      "Androgynous stills and live presence. The face the house uses when it does not want a gender on the poster.",
    tags: ["signed", "perth", "campaign", "they-them"],
    region: "Perth",
    status: "Signed",
    facts: [
      { label: "Pronouns", value: "they/them" },
      { label: "House", value: "fleshsesh" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "agents", id: "fleshsesh-desk" },
      { kind: "performers", id: "sable-quinn" },
    ],
    source: "index",
  },
  {
    id: "juniper-hale",
    kind: "performers",
    name: "Juniper Hale",
    subtitle: "Campaign / language",
    summary:
      "Editorial and brand work. Writes their own brief. Will not be recast as a type.",
    tags: ["signed", "editorial", "she-they"],
    region: "Perth",
    status: "Signed",
    facts: [
      { label: "Pronouns", value: "she/they" },
      { label: "House", value: "fleshsesh" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "agents", id: "fleshsesh-desk" },
    ],
    source: "index",
  },
  {
    id: "ash-vesper",
    kind: "performers",
    name: "Ash Vesper",
    subtitle: "Directed rooms",
    summary:
      "Directed rooms. Calm, unreadable, expensive. Books in two-hour blocks only.",
    tags: ["signed", "rooms", "he-they"],
    region: "Perth",
    status: "Signed",
    facts: [
      { label: "Pronouns", value: "he/they" },
      { label: "House", value: "fleshsesh" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "events", id: "closed-rehearsal-2026" },
    ],
    source: "index",
  },
  {
    id: "sable-quinn",
    kind: "performers",
    name: "Sable Quinn",
    subtitle: "Stills / atelier",
    summary:
      "Objects and bodies in the same frame. The atelier's quiet favourite.",
    tags: ["signed", "stills", "atelier"],
    region: "Perth",
    status: "Signed",
    facts: [
      { label: "Pronouns", value: "any" },
      { label: "House", value: "fleshsesh" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "performers", id: "vale-noir" },
    ],
    source: "index",
  },
  {
    id: "northbridge-silk-2026",
    kind: "events",
    name: "Northbridge silk",
    subtitle: "House night · Perth",
    summary:
      "A Perth night with a door. Gender-fluid dress code: none. Members first. 19 September 2026.",
    tags: ["perth", "night", "upcoming", "house"],
    region: "Perth",
    status: "Upcoming",
    venue: "The Velvet Room, Northbridge",
    dateStart: "2026-09-19",
    facts: [
      { label: "When", value: "19 September 2026" },
      { label: "Where", value: "Northbridge, Perth" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "events", id: "fremantle-heat-2026" },
    ],
    source: "public",
  },
  {
    id: "fremantle-heat-2026",
    kind: "events",
    name: "Fremantle heat",
    subtitle: "House night · Fremantle",
    summary: "Harbour air, a magenta line, a two-hour door. 3 October 2026.",
    tags: ["fremantle", "night", "upcoming"],
    region: "Fremantle",
    status: "Upcoming",
    venue: "South jetty loft",
    dateStart: "2026-10-03",
    facts: [
      { label: "When", value: "3 October 2026" },
      { label: "Where", value: "Fremantle" },
    ],
    related: [{ kind: "companies", id: "fleshsesh" }],
    source: "public",
  },
  {
    id: "closed-rehearsal-2026",
    kind: "events",
    name: "Closed rehearsal",
    subtitle: "House night · Perth",
    summary:
      "Signed talent and House passes. Directed stills. If you do not have a file, the door will not know you. 12 October 2026.",
    tags: ["perth", "rehearsal", "upcoming"],
    region: "Perth",
    status: "Upcoming",
    venue: "Navy Corridor",
    dateStart: "2026-10-12",
    facts: [
      { label: "When", value: "12 October 2026" },
      { label: "Where", value: "Perth" },
    ],
    related: [
      { kind: "companies", id: "fleshsesh" },
      { kind: "performers", id: "ash-vesper" },
    ],
    source: "public",
  },
];
