import { type InputFieldConfig } from "@root/lib/types/InputTag.js";
import { type Goal } from "./types.js";
import type { ModalButtonProps } from "@root/lib/types/index.js";

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

export const yesButtonName = "yesButton";
export const noButtonName = "noButton";

/**
 * Back Button options for goal creation
 */
export const confirmationButtons: ModalButtonProps[] = [
    {
        text: "Yes",
        name: `${yesButtonName}`
    },
    {
        text: "No",
        name: `${noButtonName}`
    }
];


export const addStepsButName = "AddSteps";
export const addSubGoalButName = "AddSubGoal";
/**
 * Submission button options for goal creation submission
 */
export const createSubmissionButtons: ModalButtonProps[] = [
    {
        text: "Add Sub-Goal",
        name: `${addSubGoalButName}`
    },
    {
        text: "Add Steps",
        name: `${addStepsButName}`
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