import type { Review } from '@root/lib/types/index.js';
import { fetchReviewAPI, postReviewAPI } from './reviewService.js';
import { useGoBack } from '@hooks/index.js';

/**
 * @returns Array of Review items from storage
 */
export const getReviews = async (goalId: string | number): Promise<Review[]> => {

    try {
        const reviews = await fetchReviewAPI(goalId);
        return reviews;
    } catch (error) {
        console.warn(`Review for '${goalId} couldn't be accessed. + ${error}`);
        return [];
    }
}

/**
 * Used to add a review object to storage.
 * Associates it with the goal id. 
 */
export const AddReview = async ({goalId, reviewType, firstInput, secondInput}: Review) => {
    return await postReviewAPI({goalId, reviewType, firstInput, secondInput});
}