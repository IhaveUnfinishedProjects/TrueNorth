export type Step = {id: string, description: string};

export const staticStep = {
    id: crypto.randomUUID(),
    description: ""
}

export const backModalButtons = [
    {
        text: "Yes",
        route: "/CreateGoal"
    },
    {
        text: "No",
    }
];

export const submissionModalButtons = [
    {
        text: "Something",
        //route: "/CreateGoal"
    },
    {
        text: "Something",
        //route: "/PlanGoal"
    }
]