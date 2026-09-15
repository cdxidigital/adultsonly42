import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** The mark is always lowercase, even inside display type. */
export function houseCase(name: string) {
  return /fleshsesh/i.test(name) ? "lowercase" : "uppercase";
}
