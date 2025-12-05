import type { CompleteGoal, addStepsProps, addGoalParams } from "@features/goals/index.js";

const DB_KEY = 'app_goals_database';


/**
 * @returns an array of complete goals as stored in the local storage
 */
export const getGoals = (): CompleteGoal[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

export const getGoalsMap = (): Map<string, CompleteGoal> => {
    const goals = getGoals();
    const mappedGoals = new Map(goals.map(goal => [goal.id, goal]));
    return mappedGoals;
}

/**
 * @param id the id of the goal to get
 */
export const getGoal = (id: string | undefined): CompleteGoal | undefined => {
    const goals = getGoals();
    const goal = goals.find(goal => goal.id === id);

    return goal;
}

/** Returns any goal that isn't a parent */
export const getLeafGoals = () => {
    const goals: CompleteGoal[] = getGoals();
    const mappedGoals = new Map(goals.map(data => [data.id, data]));

    goals.forEach(goal => {
        if(goal.parent){
            mappedGoals.delete(goal.parent);
        }
    });

    return mappedGoals;
}

/**
 * Returns the oldest ancestor for a goal. 
 * @param id The id of the goal to find the oldest ancestor of 
 * @param goalMap a map to pass through for quicker run time
 */
export const getAncestor = (id: string): CompleteGoal | undefined => {
    const mappedGoals: Map<string, CompleteGoal> = getGoalsMap();

    const findAncestor = (id: string) => {
        const parent = mappedGoals.get(id)?.parent;
        if (!parent) {
            return mappedGoals.get(id);
        } else {
            return findAncestor(parent)
        }
    }
    return findAncestor(id);
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