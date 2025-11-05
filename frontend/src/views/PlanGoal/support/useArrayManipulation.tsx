import { useState, type ChangeEvent } from "react";
import { type Step } from "./Data.js";

export function useArrayManipulation() {
    const [steps, setSteps] = useState<Step[]>([]);

    const push = (step: Step) => {
        setSteps(prevSteps => [...prevSteps, step]);
    }

    const remove = (step: Step) => {
        const newSteps = steps.filter(curStep => curStep.id !== step.id);
        setSteps(newSteps);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        // Get index, create new array, swap them out   
    }

    return { steps, push, remove, handleChange };
}

export default useArrayManipulation;