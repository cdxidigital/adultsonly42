export type Choice = { value: string; label: string };

export type SpecField =
  | { key: string; label: string; kind: "choice"; options: Choice[]; required?: boolean }
  | { key: string; label: string; kind: "text"; max: number; placeholder: string; required?: boolean };

export type SpecSchema = {
  madeToOrder: boolean;
  blurb: string;
  fields: SpecField[];
};

const SIZE: Choice[] = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "2X", label: "2X" },
  { value: "3X", label: "3X" },
];

const INK: Choice[] = [
  { value: "ivory-navy", label: "Ivory on navy" },
  { value: "navy-ivory", label: "Navy on ivory" },
  { value: "magenta-void", label: "Magenta on void" },
];

const PRONOUNS: Choice[] = [
  { value: "they/them", label: "they/them" },
  { value: "she/they", label: "she/they" },
  { value: "he/they", label: "he/they" },
  { value: "she/her", label: "she/her" },
  { value: "he/him", label: "he/him" },
  { value: "any", label: "any" },
];

const LENGTH: Choice[] = [
  { value: "neck", label: "Neck" },
  { value: "hip", label: "Hip" },
  { value: "floor", label: "Floor" },
];

export const ATELIER_SPECS: Record<string, SpecSchema> = {
  "at-tee": {
    madeToOrder: false,
    blurb: "Size is a letter, not a gender. Cut sits on any body.",
    fields: [
      { key: "size", label: "Size", kind: "choice", options: SIZE, required: true },
      { key: "ink", label: "Ink", kind: "choice", options: INK, required: true },
    ],
  },
  "at-slip": {
    madeToOrder: true,
    blurb: "Bias-cut navy silk. One pattern, every body. Hemmed when you order.",
    fields: [
      { key: "size", label: "Size", kind: "choice", options: SIZE, required: true },
      { key: "stamp", label: "Hem stamp", kind: "text", max: 12, placeholder: "Chosen name" },
    ],
  },
  "at-robe": {
    madeToOrder: true,
    blurb: "Heavy cotton robe, navy. Monogram sits inside the cuff. Cut when you order.",
    fields: [
      { key: "size", label: "Size", kind: "choice", options: SIZE, required: true },
      { key: "mono", label: "Monogram", kind: "text", max: 3, placeholder: "VN", required: true },
    ],
  },
  "at-scarf": {
    madeToOrder: false,
    blurb: "Length is a choice. Initials go in the hem if you want them.",
    fields: [
      { key: "length", label: "Length", kind: "choice", options: LENGTH, required: true },
      { key: "stamp", label: "Hem stamp", kind: "text", max: 12, placeholder: "Initials" },
    ],
  },
  "at-key": {
    madeToOrder: true,
    blurb: "The cord is black. The stamp is yours. It still does not open a lock.",
    fields: [{ key: "stamp", label: "Stamp", kind: "text", max: 12, placeholder: "Chosen name", required: true }],
  },
  "at-print": {
    madeToOrder: false,
    blurb: "A line on the back, in pencil, if you want the print to belong to someone.",
    fields: [{ key: "note", label: "Dedication", kind: "text", max: 40, placeholder: "For —" }],
  },
  "at-strap": {
    madeToOrder: true,
    blurb: "Leather stamped once. Built for analog hands.",
    fields: [{ key: "stamp", label: "Stamp", kind: "text", max: 8, placeholder: "Initials", required: true }],
  },
  "at-case": {
    madeToOrder: true,
    blurb: "Navy leather, two pockets, the mark blind-stamped. Initials on the flap.",
    fields: [{ key: "mono", label: "Initials", kind: "text", max: 3, placeholder: "VN", required: true }],
  },
  "at-cuff": {
    madeToOrder: true,
    blurb: "A brass cuff with the lip curve. Stamp a name. Wear it on either wrist.",
    fields: [{ key: "stamp", label: "Stamp", kind: "text", max: 12, placeholder: "Chosen name", required: true }],
  },
  "at-cards": {
    madeToOrder: true,
    blurb: "A box of fifty. The file as an object. Name and pronouns on the face. No job title.",
    fields: [
      { key: "name", label: "Name on the card", kind: "text", max: 28, placeholder: "Vale Noir", required: true },
      { key: "pronouns", label: "Pronouns", kind: "choice", options: PRONOUNS, required: true },
    ],
  },
  "at-match": {
    madeToOrder: true,
    blurb: "Navy board, magenta strike. A name on the cover, or the mark alone.",
    fields: [{ key: "stamp", label: "Cover", kind: "text", max: 16, placeholder: "The house" }],
  },
};

export function specSchema(productId: string): SpecSchema | null {
  return ATELIER_SPECS[productId] ?? null;
}

function cleanValue(raw: string, field: SpecField): string {
  const v = raw.trim().replace(/\s+/g, " ");
  if (field.kind === "choice") {
    return field.options.some((o) => o.value === v) ? v : "";
  }
  return v.slice(0, field.max);
}

export function parseSpec(raw: string | null | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "string" && v.trim()) out[k] = v.trim();
    }
    return out;
  } catch {
    return {};
  }
}

export function encodeSpec(values: Record<string, string>): string {
  const keys = Object.keys(values).sort();
  const o: Record<string, string> = {};
  for (const k of keys) {
    const v = values[k]?.trim();
    if (v) o[k] = v;
  }
  return Object.keys(o).length ? JSON.stringify(o) : "";
}

export function validateSpec(productId: string, raw: string | undefined): string {
  const schema = specSchema(productId);
  if (!schema) return "";
  const parsed = parseSpec(raw ?? "");
  const next: Record<string, string> = {};
  for (const field of schema.fields) {
    const v = cleanValue(parsed[field.key] ?? "", field);
    if (field.required && !v) throw new Error(`Choose ${field.label.toLowerCase()}`);
    if (v) next[field.key] = v;
  }
  return encodeSpec(next);
}

export function specComplete(productId: string, values: Record<string, string>): boolean {
  const schema = specSchema(productId);
  if (!schema) return true;
  return schema.fields.every((f) => !f.required || Boolean(values[f.key]?.trim()));
}

export function specLabel(raw: string, productId?: string): string {
  const values = parseSpec(raw);
  const schema = productId ? specSchema(productId) : null;
  const parts: string[] = [];
  const keys = schema ? schema.fields.map((f) => f.key) : Object.keys(values);
  for (const key of keys) {
    const v = values[key];
    if (!v) continue;
    const field = schema?.fields.find((f) => f.key === key);
    if (field?.kind === "choice") {
      parts.push(field.options.find((o) => o.value === v)?.label ?? v);
    } else {
      parts.push(v);
    }
  }
  return parts.join(" · ");
}
