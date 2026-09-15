import { create } from "zustand";
import type { Kind } from "@/lib/catalog/types";

const KEY = "fleshsesh.saved";
const LEGACY_KEYS = ["fleshsearch.saved", "flesh.saved", "canon.saved"];

export type SavedRef = { kind: Kind; id: string; name?: string };

type SavedState = {
  items: SavedRef[];
  toggle: (ref: SavedRef) => void;
  has: (ref: SavedRef) => boolean;
};

function read(): SavedRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw =
      window.localStorage.getItem(KEY) ??
      LEGACY_KEYS.map((k) => window.localStorage.getItem(k)).find(Boolean);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedRef[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: SavedRef[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

function keyOf(r: SavedRef) {
  return `${r.kind}:${r.id}`;
}

export const useSaved = create<SavedState>((set, get) => ({
  items: [],
  has: (ref) => get().items.some((i) => keyOf(i) === keyOf(ref)),
  toggle: (ref) => {
    const k = keyOf(ref);
    const items = get().items.some((i) => keyOf(i) === k)
      ? get().items.filter((i) => keyOf(i) !== k)
      : [ref, ...get().items];
    write(items);
    set({ items });
  },
}));

export function hydrateSaved() {
  useSaved.setState({ items: read() });
}

export function isLiveId(id: string): boolean {
  return /^Q[1-9]\d{0,12}$/.test(id);
}
