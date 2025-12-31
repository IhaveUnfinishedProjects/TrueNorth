import type { CompleteGoal, addStepsProps, addGoalParams, toggleStepParams, Goal } from "@features/goals/index.js";
import type { Review } from '@root/lib/types/index.js';
import { createGoal, isReviewType, fetchGoals, fetchGoal, updateSteps } from '@features/goals/index.js';
import { useLoading } from '@hooks/index.js';

const DB_GOALS_KEY = 'app_goals_database';
const DB_REVIEW_KEY = 'app_reviews_database';
const { setLoading } = useLoading.getState();

/**
 * This file routes the API requests. 
 */

/**
 * @returns an array of complete goals as stored in the local storage
 */
export const getGoals = async (): Promise<CompleteGoal[]> => {
    const goals = await fetchGoals();
    return goals;
}

export const getGoalsMap = async(): Promise<Map<string, CompleteGoal>> => {
    const goals = await getGoals();
    const mappedGoals = new Map(goals.map(goal => [goal.id, goal]));
    return mappedGoals;
}

/**
 * @param id the id of the goal to get
 */
export const getGoal = async (id: string | undefined): Promise<CompleteGoal | undefined> => {
    if (!id) {
        console.warn("Goal id was not specified");
        return undefined;
    }

    const goal = await fetchGoal(id);
    return goal;
}

/** Returns any goal that isn't a parent */
export const getLeafGoals = async () => {
    const goals: CompleteGoal[] = await getGoals();
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
export const getAncestor = async (id: string): Promise<CompleteGoal | undefined> => {
    const mappedGoals: Map<string, CompleteGoal> = await getGoalsMap();

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
export const addGoal = async ({newGoal, curParentId}: addGoalParams): Promise<string> => {
    try {
        setLoading(true);
        const parentId = await createGoal({newGoal, curParentId});
        return parentId;
    } catch (error) {
        console.warn(error);
        return '';
    } finally {
        setLoading(false);
    }
}

export const updateGoal = async (goalId: string | undefined, newGoal: Goal) => {
    const goalToUpdate = getGoal(goalId);
    
    if (!goalToUpdate || !newGoal) {
        throw new Error ("Goal couldn't be found");
        return;
    }

    const allGoals = await getGoals();
    const newGoals = allGoals.map(goal => {
        return goal.id === goalId ? {
            ...goal, 
            goalName: newGoal.goalName,
            desiredAchievement: newGoal.desiredAchievement,
            importance: newGoal.importance,
            measurement: newGoal.measurement,
            achievementDate: newGoal.achievementDate
        }: goal});

    localStorage.setItem(DB_GOALS_KEY, JSON.stringify(newGoals));
}

/**
 * Add steps allows submitted steps to be added to the local storage
 * @param newSteps - The steps to add the the goal object
 * @param curParentId - The parent object id to add steps to.
 */
export const addSteps = async ({newSteps, curParentId}: addStepsProps) => {
    const goal: CompleteGoal | undefined = await getGoal(curParentId);

    if (!goal?.steps) {
        return;
    }

    const combinedSteps = [...goal.steps, ...newSteps];
    updateSteps(combinedSteps, goal);
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


/** 
 * Used to toggle whether a step is completed or not.
 * Allows progress to be measured. 
 */
export const setStepsComplete = ({ goalId, completeSteps }: toggleStepParams) => {
    const allGoals = getGoals();
    
    const goal = allGoals.find(g => g.id === goalId);
    if (!goal) throw new Error("Goal couldn't be found");

    const newGoals = allGoals.map(g => {
        if (g.id !== goalId) return g;
        
        return {
            ...g,
            completeSteps: completeSteps
        };
    });

    localStorage.setItem(DB_GOALS_KEY, JSON.stringify(newGoals));
};

/**
 * @returns Array of Review items from storage
 */
export const getReviews = (): Review[] => {
    const data = localStorage.getItem(DB_REVIEW_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Used to add a review object to storage.
 * Associates it with the goal id. 
 */
export const AddReview = ({goalId, reviewType, firstInput, secondInput}: Review) => {
    if (!isGoal(goalId)) {
        console.warn("Goal didn't exist to add review");
        return;
    }

    const allReviews = getReviews();
    const newReview: Review = {
        goalId: goalId,
        reviewType: reviewType,
        firstInput: firstInput,
        secondInput: secondInput
    }
    localStorage.setItem(DB_REVIEW_KEY, JSON.stringify([...allReviews, newReview]));
}