import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { apiUrl } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseFileName(name: string) {
  return name.substring(0, name.lastIndexOf(".")) +
    ".webp";
}
export function downloadFromUrl(url: string, fileName: string) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
}