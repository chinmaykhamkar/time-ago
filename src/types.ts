/**
 * Input types that can be converted to a Date
 */
export type DateInput = Date | string | number;

/**
 * Configuration options for time formatting
 */
export interface TimeAgoOptions {
  /**
   * Reference date to compare against (defaults to current time)
   */
  referenceDate?: Date;
  
  /**
   * Whether to handle future dates by showing "in X time" format
   */
  includeFuture?: boolean;
}

/**
 * Result of time difference calculation
 */
export interface TimeDifference {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

/**
 * Month names for date formatting
 */
export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const; 