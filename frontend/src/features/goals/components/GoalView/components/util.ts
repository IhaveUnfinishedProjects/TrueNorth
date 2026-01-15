import { type CompleteGoal } from '@root/features/goals/api/index.js';
import { BACKGROUND_COLORS } from './index.js';

interface BreadCrumbProps {
    goal: CompleteGoal;
    goals: CompleteGoal[];
}

/** Returns a new colour to alternate the pattern */
export const getColour = (index: number): string => {
    return BACKGROUND_COLORS[(index - Math.floor(index / BACKGROUND_COLORS.length)) % (BACKGROUND_COLORS.length)] ?? '';
}

export const getAncestor = ({goal, goals}: BreadCrumbProps): CompleteGoal | undefined => {
    const mappedGoals = new Map(goals.map(goal => [goal.id, goal]));

    const findAncestor = (id: string) => {
        const parent = mappedGoals.get(id)?.parent;
        if (!parent) {
            return mappedGoals.get(id);
        } else {
            return findAncestor(parent)
        }
    }
    return findAncestor(goal.id);
}

/** Returns the bread crumb string for a goal */
export const getBreadCrumb = ({goal, goals}: BreadCrumbProps): string => {
    let ancestor: CompleteGoal | undefined;
    let breadCrumb = "";
    if (goal) {
        ancestor = getAncestor({goal, goals})
        if (ancestor?.id === goal.id) {
            breadCrumb = goal.goalName;
        } else {
            breadCrumb = `${ancestor?.goalName} > ${goal.goalName}`;
        }
    }

    return breadCrumb;
}