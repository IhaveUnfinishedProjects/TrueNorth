import type { CompleteGoal, addStepsProps, addGoalParams, toggleStepParams, Goal } from "@features/goals/index.js";
import type { Review } from '@root/lib/types/index.js';
import { createGoal, fetchGoals, fetchGoal, updateSteps, updateStepCompletion, updateGoalPartial } from '@features/goals/index.js';
import { useLoading } from '@hooks/index.js';

const DB_GOALS_KEY = 'app_goals_database';
const DB_REVIEW_KEY = 'app_reviews_database';

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

/**
 * @param id the id of the goal to get
 */
export const getGoal = async (id: string | undefined): Promise<CompleteGoal | undefined> => {
    if (!id) {
        console.warn("Goal id was not specified");
        return undefined;
    }
    try {
        const goal = await fetchGoal(id);
        return goal;
    } catch (error) {
        console.warn(`Goal of ID '${id}' could not be found.`, error);
        return undefined;
    }
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
 * Used to add goal to the local storage for a mock db.
 * @param newGoal This is the newly submitted goal. 
 * @returns The newly created goal so the ID can be accessed. 
 */
export const addGoal = async ({newGoal, curParentId}: addGoalParams): Promise<string> => {
    const { setLoading } = useLoading.getState();
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
    try {
        const goalToUpdate = await getGoal(goalId);
        if (goalToUpdate && goalId) {
            await updateGoalPartial(goalId, goalToUpdate);
        }
    } catch (error) {
        console.warn(`Goal of ID '${goalId}' couldn't be updated.`, goalId);
    }

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
export const isGoal = async (id: string): Promise<boolean> => {
    return await (getGoal(id) !== undefined);
}


/** 
 * Used to toggle whether a step is completed or not.
 * Allows progress to be measured. 
 */
export const setStepsComplete = async ({ goalId, completeSteps }: toggleStepParams) => {
    
    const goal = await getGoal(goalId);
    if (!goal) throw new Error("Goal couldn't be found");

    await updateStepCompletion(goalId, completeSteps);
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