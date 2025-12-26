import Cookies from 'js-cookie';
import type { addGoalParams, CompleteGoal } from '@features/index.js';
const API_BASE = "http://localhost:8000/api/goals/";


/**
 * API call to fetch all goals from the backend. 
 */
export const fetchGoals = async () => {

    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(API_BASE, {
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

    const response = await fetch(API_BASE, {
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