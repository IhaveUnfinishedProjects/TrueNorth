import type { ReviewType } from "@root/lib/types/index.js";
import { REVIEW_TYPES } from "@features/index.js";

export function isReviewType(val: string): val is ReviewType {
    return (REVIEW_TYPES as readonly string[]).includes(val);
}