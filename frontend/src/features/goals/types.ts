import type { RecurrenceSchedule } from './index.js';

/**
 * Represents the return type for GoalStepForm when the form is submitted. 
 */
export interface GoalStepFormProps {
    handleSubmit: (steps: Step[]) => void;
}

/** 
 * Represents the metadata required to define a high-level Goal. 
 */
export type Goal = {
    goalName: string,
    desiredAchievement: string,
    importance: string,
    measurement: string,
    achievementDate: string,
    parent?: string,
}

/**
 * Represents the basic data a "Step" for a goal holds. 
 */
export type Step = {
    id: string, 
    description: string,
    recurrence?: RecurrenceSchedule
};