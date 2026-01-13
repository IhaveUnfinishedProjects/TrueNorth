import type { Review } from '@root/lib/index.js';
import Cookies from 'js-cookie';
const API_BASE = "http://localhost:8000/api/goals/";

/**
 * API call to fetch a goals reviews from backend
 */
export const fetchReviewAPI = async (goalId: string | number): Promise<Review[]> => {
    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(`${API_BASE}${goalId}/reviews/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "X-CSRFToken": csrfToken || "",
        }, 
        credentials: "include",
    })

    const data: Promise<Review[]> = await response.json();
    
    if (!response.ok) {
        throw data;
    }

    return data;
}   

/**
 * API call to post a goals review data to backend
 */
export const postReviewAPI = async ({goalId, reviewType, firstInput, secondInput}: Review) => {
    const csrfToken = Cookies.get('csrftoken');
    const payload = {
        reviewType, firstInput, secondInput
    }

    const response = await fetch(`${API_BASE}${goalId}/reviews/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify(payload)
    })

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }

    return data
}