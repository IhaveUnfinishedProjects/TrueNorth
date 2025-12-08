import { useState, type ChangeEvent } from "react";
import { staticStep } from "../constants.js";
import { type DropResult } from "@hello-pangea/dnd";
import type { CompleteGoal, RecurrenceSchedule, Step } from "@features/goals/index.js";


/**
 * Allows the creation, deletion, and swapping of elements
 * in the step creation for for a specific goal. 
 */
export function useStepForm(goal: CompleteGoal | undefined) {

    console.log(goal);
    const [steps, setSteps] = useState<Step[]>(() => {
        return goal?.steps ? [staticStep,  ...goal.steps] : [staticStep];
    });
    const staticStepId = staticStep.id;

    /**
     * Removes a step object.
     * @param step - The step to remove
     */
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

    /**
     * Adds or updates the recurrence information for a Step.
     * @param curStep The current step to add the recurrence object too
     * @param recurrence The recurrence information we want to store
     */
    function updateRecurrence(curStep: Step, recurrence: RecurrenceSchedule): void {
        setSteps(prevSteps =>
            prevSteps.map(data => {

                if (data.id === curStep.id) {
                    return {...data, recurrence};
                }
                return data;
            })
        );
    }

    return { steps, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop, updateRecurrence };
}

/**
* Helper function. 
* Reorders the array. Takes an item from an index and moves it to a new one
*/
const reorder = (list: Step[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    if (removed){
        result.splice(endIndex, 0, removed);
    }

    return result;
};

export default useStepForm;