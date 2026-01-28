import { describe, it, expect } from 'vitest';
import { RecurrenceSchema } from './recurrence.schema.js';

describe('RecurrenceSchema', () => {
    it('validates a correct weekly recurrence object', () => {
        const validWeekly = {
            startDate: "2023-11-23",
            interval: "2",
            frequency: "Weekly",
            selectedDays: ["Mon", "Wed"],
        };

        const result = RecurrenceSchema.safeParse(validWeekly);
        expect(result.success).toBe(true);
    });

    it('validates a correct daily recurrence object', () => {
        const validDaily = {
            startDate: "2023-11-23",
            interval: "1",
            frequency: "Daily",
            time: "10:00",
            meridian: "AM",
        };

        const result = RecurrenceSchema.safeParse(validDaily);
        expect(result.success).toBe(true);
    });

    it('fails when required fields are missing', () => {
        const invalid = {
            startDate: "2023-11-23",
            // missing interval and frequency
        };
        const result = RecurrenceSchema.safeParse(invalid);
        expect(result.success).toBe(false);
    });

    it('validates field types', () => {
        const invalidTypes = {
            startDate: 123, // should be string
            interval: "1",
            frequency: "Daily"
        };
        const result = RecurrenceSchema.safeParse(invalidTypes);
        expect(result.success).toBe(false);
    });
});
