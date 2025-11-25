import { useState, type ChangeEvent } from "react";
import { staticStep } from "../constants.js";
import { type DropResult } from "@hello-pangea/dnd";
import type { Step } from "@features/goals/index.js";

/**
*    Reorders the array. Takes an item from an index and moves it to a new one
*/
const reorder = (list: Step[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    if (removed){
        console.log(list, startIndex, endIndex);
        result.splice(endIndex, 0, removed);
    }

    return result;
};

export function useStepForm() {

    const [steps, setSteps] = useState<Step[]>([staticStep]);
    const staticStepId = staticStep.id;

    // Pushes a new step to the end of the array.
    const push = (step: Step) => {
        setSteps(prevSteps => [...prevSteps, step]);
    }

    // Removes a given step by id
    const remove = (step: Step) => {
        const newSteps = steps.filter(curStep => curStep.id !== step.id);
        setSteps(newSteps);
    };

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget;

        setSteps(prevSteps => 
            prevSteps.map(data => 
                data.id === name ? { ...data, description : value } : data
            )
        );
    };

    function handleDragDrop(result: DropResult) {
        const { source, destination } = result;

        if (!destination || source.index === destination.index){ return; }

        setSteps(prevSteps =>
            reorder(prevSteps, source.index + 1, destination.index + 1)
        );
    };

    function handleStaticKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>){
        if (event.key === 'Enter') {

            // Creates a new Step Object
            event.preventDefault();
            const { name, value } = event.currentTarget;
            const newId = crypto.randomUUID();
            const newStep: Step = {id: newId, description: value};

            // Clears the current description for the static step object 
            setSteps(prevSteps => {
                const staticClearedSteps = prevSteps.map(data => 
                    data.id === name ? { ...data, description: ""} : data
                );
                
                return [...staticClearedSteps, newStep];
            });
        }
    };

    return { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop };
}

export default useStepForm;