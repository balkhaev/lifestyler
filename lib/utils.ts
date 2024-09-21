import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exclude(
  user: Record<string, string | null | Date>,
  keys: string[]
) {
  for (const key of keys) {
    delete user[key]
  }
  return user
}
