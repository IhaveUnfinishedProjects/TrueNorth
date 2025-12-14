import type { REVIEW_TYPES } from "@features/goals/index.js";

export type ReviewType = typeof REVIEW_TYPES[number];

export interface IncompleteReview {
    goalId: string;
    reviewType: ReviewType | string;
    firstInput: string;
    secondInput: string;
}

export interface Review extends IncompleteReview {
    reviewType: ReviewType; 
}