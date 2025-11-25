export const staticStep = {
    id: crypto.randomUUID(),
    description: ""
}

export const REPEATING_INTERVALS = [
    "Days", 
    "Weeks", 
    "Months", 
    "Years"
];


/* Export this into the GoalPlanning & pass it into StepRecurrence */
export const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2) + 1;
  const m = (i % 2) * 30;
  return `${h}:${m === 0 ? '00' : '30'}`;
});

export const MERIDIAN_OPTIONS = ["AM", "PM"];

export const REPEATING_FREQUENCY = Array.from({ length: 99 }, (_, i) => (i + 1).toString());