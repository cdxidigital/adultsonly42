export const KINDS = [
  "performers",
  "productions",
  "companies",
  "agents",
  "events",
  "social",
  "law",
] as const;

export type Kind = (typeof KINDS)[number];

export type Fact = { label: string; value: string };

export type Credit = {
  role: string;
  title: string;
  year: string;
  kind?: Kind;
  id?: string;
};

export type Related = { kind: Kind; id: string; label?: string };

export type SocialLink = {
  platform: "X" | "Instagram" | "YouTube" | "Site" | "Vellum" | "Cobalt";
  handle: string;
  href?: string;
};

export type Entity = {
  id: string;
  kind: Kind;
  name: string;
  subtitle?: string;
  aka?: string[];
  summary: string;
  body?: string;
  tags: string[];
  region?: string;
  status?: string;
  facts: Fact[];
  credits?: Credit[];
  related: Related[];
  socials?: SocialLink[];
  jurisdiction?: string;
  citation?: string;
  venue?: string;
  dateStart?: string;
  dateEnd?: string;
  source?: "index" | "public";
};

export const KIND_META: Record<
  Kind,
  { label: string; singular: string; blurb: string }
> = {
  performers: {
    label: "Performers",
    singular: "Performer",
    blurb: "Signed and public-record talent. Search a name to query live industry databases (21+).",
  },
  productions: {
    label: "Productions",
    singular: "Production",
    blurb: "Features, series, and titles listed in the public industry databases.",
  },
  companies: {
    label: "Companies",
    singular: "Company",
    blurb: "Studios, platforms, agencies, distributors, and trade bodies — including houses listed in IAFD and AFDB.",
  },
  agents: {
    label: "Agents",
    singular: "Agent",
    blurb: "Representation, casting, and roster management.",
  },
  events: {
    label: "Events",
    singular: "Event",
    blurb: "Awards, expos, trade fairs, and industry convenings.",
  },
  social: {
    label: "Social",
    singular: "Profile",
    blurb: "Public handles attached to talent, houses, and organizations.",
  },
  law: {
    label: "Law",
    singular: "Statute",
    blurb: "Statutes, cases, and compliance notes that govern the trade.",
  },
};
