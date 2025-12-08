import type { CompleteGoal, RecurrenceSchedule } from './index.js';

/**
 * Represents the return type for GoalStepForm when the form is submitted. 
 */
export interface GoalStepFormProps {
    handleSubmit: (steps: Step[]) => void;
    goal: CompleteGoal | undefined;
}

/** 
 * Represents the metadata required to define a high-level Goal. 
 */
export type Goal = {
    /** Name of the goal */
    goalName: string,
    /** What the user specifically want to achieve */
    desiredAchievement: string,
    /** Why this goal is important to the user */
    importance: string,
    /** How the user will measure progress */
    measurement: string,
    /** The date the user will complete this goal by */
    achievementDate: string,
    /** The id of the goals parent (if applicable) */
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