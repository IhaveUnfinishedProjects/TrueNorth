import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { type Step, staticStep } from "./Data.js";

export function useArrayManipulation() {
    const [steps, setSteps] = useState<Step[]>([staticStep]);

    const staticStepId = staticStep.id;

    const push = (step: Step) => {
        setSteps(prevSteps => [...prevSteps, step]);
    }

    const remove = (step: Step) => {
        const newSteps = steps.filter(curStep => curStep.id !== step.id);
        setSteps(newSteps);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget;

        setSteps(prevSteps => 
            prevSteps.map(data => 
                data.id === name ? { ...data, description : value } : data
            )
        );
    }

    function handleStaticKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>){
        if (event.key === 'Enter') {

            // Create a new Step Object
            event.preventDefault();
            const { name, value } = event.currentTarget;
            const newId = crypto.randomUUID();
            const newStep: Step = {id: newId, description: value};

            // Clear the current value for the static step object 
            setSteps(prevSteps => {
                const staticClearedSteps = prevSteps.map(data => 
                    data.id === name ? { ...data, description: ""} : data
                );

                return [...staticClearedSteps, newStep];
            });
        }
    }

    return { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown };
}

export default useArrayManipulation;