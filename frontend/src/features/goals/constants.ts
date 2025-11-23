export const staticStep = {
    id: crypto.randomUUID(),
    description: ""
}

export const RECURRENCE_OPTIONS = [
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
    "Custom"
]

export const DROP_DOWN_FREQUENCIES = [
    "Days", 
    "Weeks", 
    "Months", 
    "Years"
];


/* Export this into the GoalPlanning & pass it into StepRecurrence */
export const timeIntervals = Array.from({ length: 24 }, (_, i) => {
  const h = Math.floor(i / 2) + 1;
  const m = (i % 2) * 30;
  return `${h}:${m === 0 ? '00' : '30'}`;
});

export const meridian = ["AM", "PM"];