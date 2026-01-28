import { describe, it, expect, vi } from 'vitest';
import { useFormatDate } from './useFormatDate.js';
import { getLocalTimeZone, parseDate } from "@internationalized/date";

describe('useFormatDate', () => {
    const { formatISO8601 } = useFormatDate();
    const testDateString = "2023-11-23"; // November 23, 2023
    const testDateObj = parseDate(testDateString);

    it('formats a date string correctly for different styles', () => {
        // Formats might vary based on the environment locale, but we can check if it returns a non-empty string
        // or mock the locale if we need strict equality. For now, basic output check.
        // Assuming en-US default for many environments, but resilient checks are better.

        const shortDate = formatISO8601({ dateObj: testDateString, dateStyle: 'short' });
        expect(shortDate).toBeDefined();
        // 11/23/23 or 23/11/2023 etc.

        const fullDate = formatISO8601({ dateObj: testDateString, dateStyle: 'full' });
        expect(fullDate).toBeDefined();
        // Thursday, November 23, 2023
        expect(fullDate).toContain('2023');
    });

    it('formats a CalendarDate object correctly', () => {
        const mediumDate = formatISO8601({ dateObj: testDateObj, dateStyle: 'medium' });
        expect(mediumDate).toBeDefined();
    });

    it('handles invalid date strings gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        // The implementation logs console.warn and returns undefined
        const invalidDate = formatISO8601({ dateObj: "invalid-date", dateStyle: 'short' });
        expect(invalidDate).toBeUndefined();
        consoleSpy.mockRestore();
    });
});
