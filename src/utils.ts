import { DateInput, TimeDifference, MONTH_NAMES } from './types';

/**
 * Converts various input types to a Date object
 */
export function toDate(input: DateInput): Date {
  if (input instanceof Date) {
    return input;
  }
  
  const date = new Date(input);
  
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date input: ${input}`);
  }
  
  return date;
}

/**
 * Calculates the time difference between two dates
 */
export function getTimeDifference(date: Date, referenceDate: Date): TimeDifference {
  const diffMs = referenceDate.getTime() - date.getTime();
  
  return {
    milliseconds: diffMs,
    seconds: Math.floor(diffMs / 1000),
    minutes: Math.floor(diffMs / (1000 * 60)),
    hours: Math.floor(diffMs / (1000 * 60 * 60)),
    days: Math.floor(diffMs / (1000 * 60 * 60 * 24))
  };
}

/**
 * Formats a date as "Month Day" or "Month Day, Year"
 */
export function formatDate(date: Date, includeYear: boolean = false): string {
  // Use UTC methods to ensure consistent date formatting across timezones
  const month = MONTH_NAMES[date.getUTCMonth()];
  const day = date.getUTCDate();
  
  if (includeYear) {
    const year = date.getUTCFullYear();
    return `${month} ${day}, ${year}`;
  }
  
  return `${month} ${day}`;
}

/**
 * Checks if two dates are in the same year
 */
export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getUTCFullYear() === date2.getUTCFullYear();
}

/**
 * Validates that a date is not invalid
 */
export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
} 