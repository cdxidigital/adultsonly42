export type LiveKind = "performers" | "productions" | "companies";

export type LiveDatabase = {
  name: string;
  href: string;
};

export type LiveHit = {
  qid: string;
  kind: LiveKind;
  name: string;
  summary: string;
  region?: string;
  databases: LiveDatabase[];
  wikipedia?: string;
};

export type LiveSearchResult = {
  q: string;
  hits: LiveHit[];
  error?: string;
};
