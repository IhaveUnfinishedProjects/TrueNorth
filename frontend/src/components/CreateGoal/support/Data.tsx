/*
    This file contains the static data for GoalCreation.tsx
    to pass into Input.tsx

    It includes the content for the models, the modals buttons,
    and the content for the <input/> tags. 
*/ 

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

export const InputFieldData: InputTagData[] = [
    {
        type: "text",
        name: "goalName",
        placeholder: "e.g., Job Promotion",
        required: true,
        h3: "Goal Name"
    },
    {
        type: "text",
        name: "desiredAchievement",
        placeholder: "e.g., Learn first aid",
        required: true,
        h3: "What do you want to achieve?"
    },
    {
        type: "text",
        name: "importance",
        placeholder: "e.g., I enjoy helping people",
        required: false,
        h3: "Why is this important to you?"
    },
    {
        type: "text",
        name: "measurement",
        placeholder: "e.g., Improve by 'x' amount weekly",
        required: false,
        h3: "How will you measure progress?"
    },
    {
        type: "date",
        name: "achievementDate",
        placeholder: "achievementDate",
        required: false,
        h3: "When do you want to achieve this by?"
    },
]

/* 
    TYPE DECLARATIONS
*/ 

export type InputFormData = {
    goalName: string,
    desiredAchievement: string,
    importance: string,
    measurement: string,
    achievementDate: string,
    parent?: string
}

export type InputTagData = {
    type: 'text'| 'date';
    name: keyof InputFormData;
    placeholder: string;
    required: boolean;
    h3: string;
}