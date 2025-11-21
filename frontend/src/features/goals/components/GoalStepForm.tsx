import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import type { DynamicFormProps } from "../types/Constants.js";
import DraggableSteps from "./DraggableStep.js";
import "./support.css";

/*
    This component renders a form that manages and 
    allows the drag-and-drop reordering of dynamic 
    steps using the @hello-pangea/dnd library.
*/

export const DynamicForm: React.FC<DynamicFormProps> = ({ 
        steps, 
        staticStepId, 
        push, 
        remove,
        handleChange, 
        handleStaticKeyDown, 
        handleSubmit,
        handleDragDrop,
        onRepeatOpen 
    }) => {

    const staticStep = steps.find(step => step.id === staticStepId)
    const dynamicSteps = steps.filter(step => step.id != staticStepId);

    return(
        <form onSubmit={handleSubmit}>
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
                            {dynamicSteps.map((data, index) => {
                                return (
                                    // Custom component encapsulating the Draggable logic
                                    <div key={data.id}>
                                        <DraggableSteps
                                            data={data}
                                            index={index}
                                            handleChange={handleChange}
                                            remove={remove}
                                            onRepeatOpen={onRepeatOpen}
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
    );
}

export default DynamicForm;