import { DateInput, TimeAgoOptions } from './types';
import { toDate, getTimeDifference, formatDate, isSameYear } from './utils';

/**
 * Formats a date/timestamp into a human-readable "time ago" string
 * 
 * @param input - The date to format (Date, string, or number)
 * @param options - Optional configuration
 * @returns Formatted time string
 * 
 * @example
 * ```typescript
 * timeAgo(new Date(Date.now() - 30000)) // "30s ago"
 * timeAgo(new Date(Date.now() - 3600000)) // "1h ago"
 * timeAgo(new Date('2024-01-15')) // "Jan 15, 2024"
 * ```
 */
export function timeAgo(input: DateInput, options: TimeAgoOptions = {}): string {
  try {
    const date = toDate(input);
    const referenceDate = options.referenceDate || new Date();
    
    const diff = getTimeDifference(date, referenceDate);
    
    // Handle future dates (if enabled)
    if (diff.milliseconds < 0) {
      if (options.includeFuture) {
        return formatFutureTime(Math.abs(diff.seconds));
      }
      // For future dates, fall back to date format
      return formatDate(date, !isSameYear(date, referenceDate));
    }
    
    // Less than 1 second
    if (diff.seconds < 1) {
      return 'Just now';
    }
    
    // 1-59 seconds
    if (diff.seconds < 60) {
      return `${diff.seconds}s ago`;
    }
    
    // 1-59 minutes
    if (diff.minutes < 60) {
      return `${diff.minutes}m ago`;
    }
    
    // 1-23 hours
    if (diff.hours < 24) {
      return `${diff.hours}h ago`;
    }
    
    // For dates more than 24 hours ago, ensure we're comparing dates at midnight
    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);
    const startOfReference = new Date(referenceDate);
    startOfReference.setHours(0, 0, 0, 0);
    
    // 24+ hours - use date format
    const includeYear = !isSameYear(startOfDate, startOfReference);
    return formatDate(date, includeYear);
    
  } catch (error) {
    throw new Error(`Failed to format time: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Formats future time (when includeFuture option is enabled)
 */
function formatFutureTime(seconds: number): string {
  if (seconds < 60) {
    return `in ${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `in ${minutes}m`;
  }
  
  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return `in ${hours}h`;
  }
  
  const days = Math.floor(seconds / 86400);
  return `in ${days}d`;
} 