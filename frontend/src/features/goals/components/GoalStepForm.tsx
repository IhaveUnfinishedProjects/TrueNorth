import { DragDropContext, Droppable} from "@hello-pangea/dnd";
import { type GoalStepFormProps, useStepForm, StepRecurrenceModal, type Step, type RecurrenceSchedule } from "@features/index.js";
import { useToggleModal } from "@hooks/index.js";
import DraggableSteps from "./DraggableStep/DraggableStep.js";
import { useState } from "react";

/*
    This component renders a form that manages and 
    allows the drag-and-drop reordering of dynamic 
    steps using the @hello-pangea/dnd library.
*/

export const GoalStepsForm = ({ handleSubmit, goal }: GoalStepFormProps) => {

    /* Hooks for managing form data */
    const { steps, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop, updateRecurrence } = useStepForm(goal);
    const { isOpen:isRepeatOpen, onOpen:onRepeatOpen, onClose:onRepeatClose } = useToggleModal();
    const [ curStep, setCurStep ] = useState<Step>();

    /* Separates the movable steps from the immovable one you type into */
    const staticStep = steps.find(step => step.id === staticStepId)
    const dynamicSteps = steps.filter(step => step.id != staticStepId);

    /**
     * Turns the GoalStepForm data into something GoalPlanning.tsx can consume
     */
    const handleLocalSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        /* 
            The steps on submission might have something
            typed into the static field. The static field 
            is contained by the steps[] array in the first 
            index. This just moves it to the end, then we 
            filter out any steps with a blank description. 
        */
        if (steps[0]){
            const [first, ...rest] = steps;
            const newSteps: Step[] = [...rest, first]
        }
        const result = steps.filter(step => step.description !== "");
        handleSubmit(result);
    }

    /**
     * Attaches the return object from the Step Recurrence form to it's respective step. 
     */
    const handleStepRecurrenceSubmit = (recurrenceData: RecurrenceSchedule) => {
        onRepeatClose();
        if (curStep) {
            updateRecurrence(curStep, recurrenceData);
        }
    }

    return(
        <>
            <form onSubmit={ handleLocalSubmit }>
                {/* Initializes the drag and drop context for the entire list */}
                <DragDropContext onDragEnd={handleDragDrop}>
                    {steps.length > 1 && <h3>First Step</h3>}

                    {/* Defines the drop zone where steps can be reordered */}
                    <Droppable droppableId="ROOT">
                        {(provided) => (
                            <div
                                /* Props required for the drop zone to function */
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {/* Renders the dynamic (draggable) steps */}
                                {dynamicSteps.map((step, index) => {
                                    return (
                                        // Custom component encapsulating the Draggable logic
                                        <div key={step.id}>
                                            <DraggableSteps
                                                step={step}
                                                index={index}
                                                handleChange={handleChange}
                                                remove={remove}
                                                onRepeatOpen={onRepeatOpen}
                                                setStep={setCurStep}
                                            />
                                        </div>
                                    )
                                })}

                                {/* Placeholder element required during dragging */}
                                {provided.placeholder}
                            </div>
                        )}

                    </Droppable>
                </DragDropContext>

                {/* Input for the new/static step (cannot be dragged) */}

                <h3>New Step</h3>
                {staticStep && (
                    <input
                        className="mb-[2rem]"
                        key={staticStep.id}
                        name={staticStep.id}
                        value={staticStep.description}
                        placeholder='Type and press "Enter" to create a new step!'
                        onChange={handleChange}
                        onKeyDown={handleStaticKeyDown}
                    />
                )}

                <button type="submit" className="formButton">
                    Continue
                </button>
            </form>

            {isRepeatOpen && <StepRecurrenceModal 
                submissionHandler = {handleStepRecurrenceSubmit}
                onRepeatClose={onRepeatClose}
                recurrence={curStep?.recurrence}
            />}
        </>
    );
}

export default GoalStepsForm;