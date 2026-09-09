import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDimension(val: number, unit = "mm"): string {
  return `${val} ${unit}`;
}

export function formatPricePerGram(rate: number): string {
  return `₹${rate}/g`;
}
