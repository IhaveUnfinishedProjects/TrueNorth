import { BACKGROUND_COLORS } from './index.js';

/** Returns a new colour to alternate the pattern */
export const getColour = (index: number): string => {
    return BACKGROUND_COLORS[(index - Math.floor(index / BACKGROUND_COLORS.length)) % (BACKGROUND_COLORS.length)] ?? '';
}