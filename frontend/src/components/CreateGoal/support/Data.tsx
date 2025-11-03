/*
    This file contains the static data for GoalCreation.tsx
    to pass into Input.tsx

    It includes the content for the models, the modals buttons,
    and the content for the <input/> tags. 
*/ 

export type InputFormData = {
    goalName: string,
    desiredAchievement: string,
    importance: string,
    measurement: string,
    achievementDate: string,
    parent?: string
}

export const initialValues: InputFormData = {
    goalName:'',
    desiredAchievement:'',
    importance:'',
    measurement:'',
    achievementDate:'',
    parent:''

};

export const submissionModalButtons = [
    {
        text: "Yes",
        route: "/"
    },
    {
        text: "No"
    }
];

export const backModalButtons = [
        {
            text: "Add Sub-Goal",
            route: "/"
        },
        {
            text: "Add Steps",
            route: "/"
        }

    ]


/* 
    TYPE DECLARATIONS
*/ 