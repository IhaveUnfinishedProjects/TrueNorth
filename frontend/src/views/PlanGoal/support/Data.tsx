import type { DropResult } from "@hello-pangea/dnd";
import type { ChangeEvent } from "react";

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

export interface DynamicFormProps {
    steps: Step[];
    staticStepId: string;
    push: (step: Step) => void;
    remove: (step: Step) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStaticKeyDown: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleDragDrop: (result: DropResult) => void;
    onRepeatOpen: () => void;
}