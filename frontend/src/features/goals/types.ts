import { z } from 'zod';

/**
 * Represents the return type for GoalStepForm when the form is submitted. 
 */
export interface GoalStepFormProps {
    handleSubmit: (steps: Step[]) => void;
}

/** 
 * Represents the metadata required to define a high-level Goal. 
 */
export type InputFormData = {
    goalName: string,
    desiredAchievement: string,
    importance: string,
    measurement: string,
    achievementDate: string,
    parent?: string
}

const MeridianLiteral = z.enum(['AM', 'PM']);
const OrdinalLiteral = z.enum(['date', 'ordinal']);

/** 
 * Configuration for recurring steps (e.g., "Every 2 weeks on Mon/Fri"). 
 */
export const RecurrenceSchema = z.object ({
    startDate: z.string().nonempty(),  // "2025-11-24"
    interval:  z.string().nonempty(),  // "1", "2"
    frequency: z.string().nonempty(),  // "Daily", "Weekly", "Monthly"
    time:      z.string().optional(),  // "12:00" (Optional)
    period:    MeridianLiteral.nullable().optional(), // "AM" | "PM" (Optional)
    selectedDays: z.array(z.string()).optional(),     // ["Mon", "Fri"] (Only for Weekly)
    type:      OrdinalLiteral.nullable().optional()   // (Only for Monthly/Yearly)
});

export type RecurrenceSchedule = z.infer<typeof RecurrenceSchema>;

/**
 * Represents the basic data a "Step" for a goal holds. 
 */
export type Step = {
    id: string, 
    description: string,
    recurrence?: RecurrenceSchedule
};

export const DayOfWeek = ["Mon", "Tue", "Wed", "Fri", "Thu", "Sat", "Sun"];