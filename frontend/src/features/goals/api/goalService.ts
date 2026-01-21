import Cookies from 'js-cookie';
import type { addGoalParams, Step, CompleteGoal, Goal, CompleteStep } from '@features/index.js';
import { GOALS_URL } from '@root/library/constants.js';

/**
 * API call to fetch all goals from the backend. 
 */
export const fetchGoals = async () => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(GOALS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include", 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch goals");
    }
    return response.json();
};

/**
 * API call to fetch a single goal from the backend. 
 */
export const fetchGoal = async (goalId: string | number) => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(`${GOALS_URL}${goalId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include", 
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch goal with id: ${goalId}`);
    }
    return response.json();
};

/**
 * API call to create goal in the backend & recieve the parent id. 
 */
export const createGoal = async ({ newGoal, curParentId }: addGoalParams) => {

    const csrfToken = Cookies.get('csrftoken');
    const payload = {
        goal_name: newGoal.goalName,
        desired_achievement: newGoal.desiredAchievement,
        importance: newGoal.importance,
        measurement: newGoal.measurement,
        achievement_date: newGoal.achievementDate,
        parent: curParentId || null,
        steps: [] 
    }

    const response = await fetch(GOALS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    const data: CompleteGoal = await response.json();

    if (!response.ok) {
        throw data; 
    }
    return data.id;
};

/**
 * API call to update an existing, non-complete goal without steps
 */
export const updateGoalPartial = async (goalId: string | undefined, newGoal: Goal) => {

    const csrfToken = Cookies.get('csrftoken');
    const payload = {
        ...(newGoal.goalName && { goal_name: newGoal.goalName}),
        ...(newGoal.desiredAchievement && { desired_achievement: newGoal.desiredAchievement }),
        ...(newGoal.importance && { importance: newGoal.importance }),
        ...(newGoal.measurement && { measurement: newGoal.measurement }),
        ...(newGoal.achievementDate && { achievement_date: newGoal.achievementDate }),
    }

    const response = await fetch(`${GOALS_URL}${goalId}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to update goal with id: ${goalId}`);
    }
    return response.json();
}

/**
 * API Call to add steps. Passes in a patch so we don't have to pass in the rest of the goal. 
 */
export const updateSteps = async (newSteps: Step[], goal: CompleteGoal) => {
        
    const csrfToken = Cookies.get('csrftoken');

    const payloadSteps = newSteps.map(step => {
        const isTempId = isNaN(Number(step.id));
        return {
            ...step,
            id: isTempId ? undefined : step.id 
        };
    });

    const payload = { steps: payloadSteps };

    const response = await fetch(`${GOALS_URL}${goal.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Failed to add steps to goal with id: ${goal.id}`);
    }
    const data = await response.json();
    return data;
}

export const updateStepCompletion = async (goalId: string, allCompletedStepIds: CompleteStep) => {
    
    const csrfToken = Cookies.get('csrftoken');
    const payload = {
        completeSteps: allCompletedStepIds
    };

    return await fetch(`${GOALS_URL}${goalId}/`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        body: JSON.stringify(payload),
        credentials: "include"
    });
};

/**
 * API call to delete a goal. 
 */
export const deleteGoal = async (goalId: string | number) => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(`${GOALS_URL}${goalId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include", 
    });

    if (!response.ok) {
        throw new Error("Failed to delete goal");
    }
    return response.json();
};