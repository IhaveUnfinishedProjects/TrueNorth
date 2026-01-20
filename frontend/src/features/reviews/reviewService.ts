import type { Review } from '@root/library/index.js';
import Cookies from 'js-cookie';
import { GOALS_URL } from '@root/library/index.js';
/**
 * API call to fetch a goals reviews from backend
 */
export const fetchReviewAPI = async (goalId: string | number): Promise<Review[]> => {
    const csrfToken = Cookies.get('csrftoken');
    const response = await fetch(`${GOALS_URL}${goalId}/reviews/`, {
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

    const response = await fetch(`${GOALS_URL}${goalId}/reviews/`, {
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