import type { Goal, Step } from '@features/goals/index.js';

/**
 * An extension of Goal for after a goal 
 * has been created
 */
export interface CompleteGoal extends Goal {
    id: string;
    steps?: Step[];
}

/**
 * The props the Add Steps in storage takes
 */
export interface addStepsProps {
    newSteps: Step[],
    curParentId: string;
}

/**
 * The props the Add Goal in storage takes
 */
export interface addGoalParams {
    newGoal: Goal;
    curParentId: string | undefined;
}