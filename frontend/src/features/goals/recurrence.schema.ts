import { z } from 'zod';

/* Constants for schemas enums */ 
export const MeridianEnum = z.enum(['AM', 'PM']);
export const OrdinalEnum = z.enum(['date', 'ordinal']);

/** 
 * Configuration for recurring steps (e.g., "Every 2 weeks on Mon/Fri"). 
 */
export const RecurrenceSchema = z.object ({
    startDate: z.string().min(1),      // "2025-11-24"
    interval:  z.string().min(1),      // "1", "2"
    frequency: z.string().min(1),      // "Daily", "Weekly", "Monthly"
    time:      z.string().optional(),  // "12:00" (Optional)
    meridian:    MeridianEnum.nullish(),  // "AM" | "PM" (Optional)
    selectedDays: z.array(z.string()).optional(), // ["Mon", "Fri"] (Only for Weekly)
    type:      OrdinalEnum.nullish()   // (Only for Date/Ordinal)
});


export type RecurrenceSchedule = z.infer<typeof RecurrenceSchema>;
export type MeridianType = z.infer<typeof MeridianEnum>;
export type OrdinalType = z.infer<typeof OrdinalEnum>;