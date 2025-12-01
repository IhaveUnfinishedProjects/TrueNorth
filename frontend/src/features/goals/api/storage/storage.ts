import type { Goal, Step } from "@features/goals/index.js";

export interface CompleteGoal extends Goal {
    id: string;
    steps?: Step[];
}
const DB_KEY = 'app_goals_database';


/**
 * @returns an array of complete goals as stored in the local storage
 */
export const getGoals = (): CompleteGoal[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Used to add goal to the local storage for a mock db.
 * @param newGoal This is the newly submitted goal. 
 * @returns The newly created goal so the ID can be accessed. 
 */
export const addGoal = (newGoal: Goal): string => {

    const completeGoal: CompleteGoal = {
        ...newGoal,
        id: crypto.randomUUID(),
        steps: []
    }

    const currentGoals = getGoals();
    localStorage.setItem(DB_KEY, JSON.stringify([...currentGoals, completeGoal]));

    return completeGoal.id;
}

interface addStepsProps {
    newSteps: Step[],
    curParentId: string;
}
/**
 * Add steps allows submitted steps to be added to the local storage
 * @param newSteps - The steps to add the the goal object
 * @param curParentId - The parent object id to add steps to.
 */
export const addSteps = ({newSteps, curParentId}: addStepsProps) => {
    const completeGoals = getGoals();
    
    const newGoals = completeGoals.map(goal => {
        goal.id === curParentId ? {...goal, steps: newSteps} : goal;
    })

    localStorage.setItem(DB_KEY, JSON.stringify(newGoals))
}

/**
 * Check if a goal exists given an id. 
 * @param id The id of the goal we want to check
 * @returns Return true if the goal exists, false if it doesn't
 */
export const isGoal = (id: string): boolean => {
    const goals = getGoals();
    const goal = goals.find(goal => goal.id === id);
    return (goal !== undefined);
}