import { getAncestor, type CompleteGoal } from '@root/features/goals/api/index.js';
import { BACKGROUND_COLORS } from './index.js';

/** Returns a new colour to alternate the pattern */
export const getColour = (index: number): string => {
    return BACKGROUND_COLORS[(index - Math.floor(index / BACKGROUND_COLORS.length)) % (BACKGROUND_COLORS.length)] ?? '';
}

/** Returns the bread crumb string for a goal */
export const getBreadCrumb = (goal: CompleteGoal | undefined): string => {
    let ancestor: CompleteGoal | undefined;
    let breadCrumb = "";
    if (goal) {
        ancestor = getAncestor(goal.id)
        if (ancestor?.id === goal.id) {
            breadCrumb = goal.goalName;
        } else {
            breadCrumb = `${ancestor?.goalName} > ${goal.goalName}`;
        }
    }

    return breadCrumb;
}