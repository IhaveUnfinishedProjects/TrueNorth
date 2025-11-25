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

/** 
 * Configuration for recurring steps (e.g., "Every 2 weeks on Mon/Fri"). 
 */
export type RecurrenceSchedule = {
    frequency: string;         // "Daily", "Weekly", "Monthly"
    interval: string;          // "1", "2"
    startDate: string;         // "2025-11-24"
    time?: string;             // "12:00" (Optional)
    period?: string;           // "AM" | "PM" (Optional)
    selectedDays?: string[];   // ["Mon", "Fri"] (Only for Weekly)
    type?: 'date' | 'ordinal'; // (Only for Monthly/Yearly)
}

/**
 * Represents the basic data a "Step" for a goal holds. 
 */
export type Step = {
    id: string, 
    description: string,
    recurrence?: RecurrenceSchedule
};

export const DayOfWeek = ["Mon", "Tue", "Wed", "Fri", "Thu", "Sat", "Sun"];