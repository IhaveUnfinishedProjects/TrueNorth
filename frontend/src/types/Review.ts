import type { REVIEW_TYPES } from "@features/goals/index.js";

export type ReviewType = typeof REVIEW_TYPES[number];

export interface Review {
    goalId: string;
    reviewType: ReviewType;
    firstInput: string;
    secondInput: string;
}