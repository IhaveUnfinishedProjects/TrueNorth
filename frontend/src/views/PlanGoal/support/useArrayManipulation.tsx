import { useState, useEffect, type ChangeEvent, type KeyboardEvent } from "react";
import { type Step, staticStep } from "./Data.js";
import { type DropResult } from "@hello-pangea/dnd";

export function useArrayManipulation() {

    const [steps, setSteps] = useState<Step[]>([staticStep]);
    const staticStepId = staticStep.id;

    const push = (step: Step, stepArray?: Step[], index?: number) => {

        if (stepArray && index){
            return [
                ...stepArray.slice(0, index),
                step,
                ...stepArray.slice(index)
            ];
        } 

        setSteps(prevSteps => [...prevSteps, step]);
    }

    const remove = (step: Step, stepArray?: Step[]) => {

        if (stepArray){
            return stepArray.filter(curStep =>  curStep.id !== step.id)
        }

        const newSteps = steps.filter(curStep => curStep.id !== step.id);
        setSteps(newSteps);
    };

    const getStep = (id: string): Step | undefined => {
        const targetStep = steps.find(step => step.id === id);

        if (targetStep){
            return targetStep;
        }
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
        if (!destination || source.index === destination.index){
            return;
        }

        const step = getStep(result.draggableId);
        if (step) {

            setSteps(prevSteps => {
                const stepsAfterRemoval = remove(step, prevSteps); 
                const finalSteps = push(step, stepsAfterRemoval, destination.index + 1);

                if (finalSteps){
                    return finalSteps;
                } else {
                    return prevSteps;
                }
            })
        }
    };

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
    };

    return { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop };
}

export default useArrayManipulation;