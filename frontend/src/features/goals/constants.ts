/**
 * Initialises the input the user types into in
 * the GoalStepForm
 */
export const staticStep = {
    id: crypto.randomUUID(),
    description: ""
}

/**
 * Provides the step recurrence intervals
 * for how often a step can reoccur
 */
export const REPEATING_INTERVALS = [
    "Days", 
    "Weeks", 
    "Months", 
    "Years"
];

/**
 * Provides the days of the week for when 'weeks' is selected
 * in the step recurrence form. 
 */
export const DayOfWeek = ["Mon", "Tue", "Wed", "Fri", "Thu", "Sat", "Sun"];

/**
 * Provides the times of day on a 12 hour clock
 * for selecting a time. 
 */
export const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2) + 1;
  const m = (i % 2) * 30;
  return `${h}:${m === 0 ? '00' : '30'}`;
});

/**
 * An array of numbers (1-99) for selecting the gap interval
 * of a goal. 
 */
export const REPEATING_FREQUENCY = Array.from({ length: 99 }, (_, i) => (i + 1).toString());

/**
 * the options for the radio form in goal review
 */
export const REVIEW_TYPES = ['behind', 'on track', 'ahead'] as const;
