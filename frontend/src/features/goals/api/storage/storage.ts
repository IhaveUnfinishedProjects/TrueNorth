import type { CompleteGoal, addStepsProps, addGoalParams } from "@features/goals/index.js";

const DB_KEY = 'app_goals_database';


/**
 * @returns an array of complete goals as stored in the local storage
 */
export const getGoals = (): CompleteGoal[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * @param id the id of the goal to get
 */
export const getGoal = (id: string): CompleteGoal | undefined => {
    const goals = getGoals();
    const goal = goals.find(goal => goal.id === id);

    return goal;
}

/**
 * Used to add goal to the local storage for a mock db.
 * @param newGoal This is the newly submitted goal. 
 * @returns The newly created goal so the ID can be accessed. 
 */
export const addGoal = ({newGoal, curParentId}: addGoalParams): string => {

    const completeGoal: CompleteGoal = {
        ...newGoal,
        id: crypto.randomUUID(),
        steps: [],
        parent: curParentId ?? ''
    }

    const currentGoals = getGoals();
    localStorage.setItem(DB_KEY, JSON.stringify([...currentGoals, completeGoal]));

    return completeGoal.id;
}

/**
 * Add steps allows submitted steps to be added to the local storage
 * @param newSteps - The steps to add the the goal object
 * @param curParentId - The parent object id to add steps to.
 */
export const addSteps = ({newSteps, curParentId}: addStepsProps) => {
    const completeGoals = getGoals();
    
    const newGoals = completeGoals.map(goal => {
        return goal.id === curParentId ? { ...goal, steps: newSteps} : goal;
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