import { type InputFieldConfig } from "@root/types/InputTag.js";
import { type Goal } from "./types.js";

/*
    This file contains the static data for GoalCreation.tsx
    to pass into Input.tsx

    It includes the content for the models, the modals buttons,
    and the content for the <input/> tags. 
*/ 

/**
 * Initial Values for Goal Creation
 */
export const initialValues: Goal = {
    goalName:'',
    desiredAchievement:'',
    importance:'',
    measurement:'',
    achievementDate:'',
    parent:''
};

/**
 * Back Button options for goal creation
 */
export const createBackButtons = [
    {
        text: "Yes",
        route: "/"
    },
    {
        text: "No",
    }
];

/**
 * Submission button options for goal creation submission
 */
export const createSubmissionButtons = [
    {
        text: "Add Sub-Goal",
        route: "/CreateGoal"
    },
    {
        text: "Add Steps",
        route: "/PlanGoal"
    }
]

/**
 * Back button options for planning the steps
 * of a goal
 */
export const planBackButtons = [
    {
        text: "Yes",
        route: "/CreateGoal"
    },
    {
        text: "No",
    }
];

/**
 * Submission button options for submitting the
 * steps of a goal
 */
export const planSubmissionButtons = [
    {
        text: "No",
    },
    {
        text: "Yes",
        route: "/"
    }
]

export const InputFieldData: InputFieldConfig<Goal>[] = [
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