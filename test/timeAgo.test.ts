import { timeAgo } from '../src/timeAgo';

describe('timeAgo', () => {
  const referenceDate = new Date('2025-05-30T12:00:00Z');

  describe('basic time intervals', () => {
    test('should return "Just now" for times less than 1 second', () => {
      const date = new Date(referenceDate.getTime() - 500);
      expect(timeAgo(date, { referenceDate })).toBe('Just now');
    });

    test('should return "Ns ago" for 1-59 seconds', () => {
      const date = new Date(referenceDate.getTime() - 30000); // 30 seconds
      expect(timeAgo(date, { referenceDate })).toBe('30s ago');
      
      const date2 = new Date(referenceDate.getTime() - 1000); // 1 second
      expect(timeAgo(date2, { referenceDate })).toBe('1s ago');
      
      const date3 = new Date(referenceDate.getTime() - 59000); // 59 seconds
      expect(timeAgo(date3, { referenceDate })).toBe('59s ago');
    });

    test('should return "Nm ago" for 1-59 minutes', () => {
      const date = new Date(referenceDate.getTime() - 300000); // 5 minutes
      expect(timeAgo(date, { referenceDate })).toBe('5m ago');
      
      const date2 = new Date(referenceDate.getTime() - 60000); // 1 minute
      expect(timeAgo(date2, { referenceDate })).toBe('1m ago');
      
      const date3 = new Date(referenceDate.getTime() - 3540000); // 59 minutes
      expect(timeAgo(date3, { referenceDate })).toBe('59m ago');
    });

    test('should return "Nh ago" for 1-23 hours', () => {
      const date = new Date(referenceDate.getTime() - 3600000); // 1 hour
      expect(timeAgo(date, { referenceDate })).toBe('1h ago');
      
      const date2 = new Date(referenceDate.getTime() - 10800000); // 3 hours
      expect(timeAgo(date2, { referenceDate })).toBe('3h ago');
      
      const date3 = new Date(referenceDate.getTime() - 82800000); // 23 hours
      expect(timeAgo(date3, { referenceDate })).toBe('23h ago');
    });
  });

  describe('date formatting for 24+ hours', () => {
    test('should return "Month Day" for dates in current year', () => {
      const date = new Date('2025-01-15T12:00:00Z');
      expect(timeAgo(date, { referenceDate })).toBe('Jan 15');
      
      const date2 = new Date('2025-12-25T12:00:00Z');
      expect(timeAgo(date2, { referenceDate })).toBe('Dec 25');
    });

    test('should return "Month Day, Year" for dates in different year', () => {
      const date = new Date('2024-03-10T12:00:00Z');
      expect(timeAgo(date, { referenceDate })).toBe('Mar 10, 2024');
      
      const date2 = new Date('2026-07-04T12:00:00Z');
      expect(timeAgo(date2, { referenceDate })).toBe('Jul 4, 2026');
    });
  });

  describe('input type handling', () => {
    test('should handle Date objects', () => {
      const date = new Date(referenceDate.getTime() - 30000);
      expect(timeAgo(date, { referenceDate })).toBe('30s ago');
    });

    test('should handle timestamp numbers', () => {
      const timestamp = referenceDate.getTime() - 30000;
      expect(timeAgo(timestamp, { referenceDate })).toBe('30s ago');
    });

    test('should handle ISO date strings', () => {
      const dateString = new Date(referenceDate.getTime() - 30000).toISOString();
      expect(timeAgo(dateString, { referenceDate })).toBe('30s ago');
    });

    test('should throw error for invalid inputs', () => {
      expect(() => timeAgo('invalid-date', { referenceDate })).toThrow('Invalid date input');
      expect(() => timeAgo(NaN, { referenceDate })).toThrow('Invalid date input');
    });
  });

  describe('future dates', () => {
    test('should format future dates as dates by default', () => {
      const futureDate = new Date(referenceDate.getTime() + 86400000); // +1 day
      expect(timeAgo(futureDate, { referenceDate })).toBe('May 31');
    });

    test('should format future dates with "in" prefix when includeFuture is enabled', () => {
      const futureDate = new Date(referenceDate.getTime() + 30000); // +30 seconds
      expect(timeAgo(futureDate, { referenceDate, includeFuture: true })).toBe('in 30s');
      
      const futureDate2 = new Date(referenceDate.getTime() + 3600000); // +1 hour
      expect(timeAgo(futureDate2, { referenceDate, includeFuture: true })).toBe('in 1h');
    });
  });

  describe('edge cases', () => {
    test('should handle exactly 1 minute boundary', () => {
      const date = new Date(referenceDate.getTime() - 60000); // exactly 1 minute
      expect(timeAgo(date, { referenceDate })).toBe('1m ago');
    });

    test('should handle exactly 1 hour boundary', () => {
      const date = new Date(referenceDate.getTime() - 3600000); // exactly 1 hour
      expect(timeAgo(date, { referenceDate })).toBe('1h ago');
    });

    test('should handle exactly 24 hour boundary', () => {
      const date = new Date(referenceDate.getTime() - 86400000); // exactly 24 hours
      expect(timeAgo(date, { referenceDate })).toBe('May 29');
    });

    test('should handle leap year dates', () => {
      const leapYearDate = new Date('2024-02-29T12:00:00Z');
      const ref = new Date('2025-02-28T12:00:00Z');
      expect(timeAgo(leapYearDate, { referenceDate: ref })).toBe('Feb 29, 2024');
    });

    test('should work without reference date (uses current time)', () => {
      const now = Date.now();
      const pastDate = new Date(now - 30000); // 30 seconds ago
      const result = timeAgo(pastDate);
      expect(result).toMatch(/\d+s ago/);
    });
  });

  describe('month name formatting', () => {
    test('should format all months correctly', () => {
      const months = [
        { date: '2024-01-01', expected: 'Jan 1, 2024' },
        { date: '2024-02-01', expected: 'Feb 1, 2024' },
        { date: '2024-03-01', expected: 'Mar 1, 2024' },
        { date: '2024-04-01', expected: 'Apr 1, 2024' },
        { date: '2024-05-01', expected: 'May 1, 2024' },
        { date: '2024-06-01', expected: 'Jun 1, 2024' },
        { date: '2024-07-01', expected: 'Jul 1, 2024' },
        { date: '2024-08-01', expected: 'Aug 1, 2024' },
        { date: '2024-09-01', expected: 'Sep 1, 2024' },
        { date: '2024-10-01', expected: 'Oct 1, 2024' },
        { date: '2024-11-01', expected: 'Nov 1, 2024' },
        { date: '2024-12-01', expected: 'Dec 1, 2024' }
      ];

      months.forEach(({ date, expected }) => {
        expect(timeAgo(new Date(date), { referenceDate })).toBe(expected);
      });
    });
  });
}); 