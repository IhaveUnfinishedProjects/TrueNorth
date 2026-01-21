import { RxDragHandleDots2 } from "react-icons/rx";
import { MdEventRepeat } from "react-icons/md";
import { type DraggableProvided, Draggable } from "@hello-pangea/dnd";
import { type Step, BinImage } from "@features/index.js";
import { type ChangeEvent } from "react";
import './DraggableStep.css';

interface DraggableProps {
    step: Step;
    index: number;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    remove: (step: Step) => void;
    onRepeatOpen: () => void;
    setStep: (step: Step) => void;
};

/**
 * Provides a step for a goal which is controlled by a drag'n'drop area. Allows deletion & editing. 
 * @param step - The Step object for this item. Expected to contain at least `id` and `description`.
 * @param index - The zero-based index of this step within the draggable list (used by Draggable).
 * @param handleChange - ChangeEvent handler for the input. Called with events from the input or textarea when description changes.
 * @param remove - Function called to remove this step. Receives the current step as its argument.
 * @param onRepeatOpen - Callback invoked to open the repeat configuration UI/modal for the current step.
 * @param setStep - Function that accepts a step id (string) to mark the current step before invoking onRepeatOpen.
 */
export const DraggableSteps = ({step, index, handleChange, remove, onRepeatOpen, setStep }: DraggableProps) => {

    return (
        <Draggable 
            draggableId={step.id} 
            key={step.id} 
            index={index}
        >
            {(provided: DraggableProvided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    key={step.id} 
                    className="input-tags"
                >
                    <div {...provided.dragHandleProps}>
                        <RxDragHandleDots2 className="w-6 h-6"/>
                    </div>

                    <input className="w-[100%] pr-[2.5rem]"
                        name={step.id} 
                        value={step.description}
                        placeholder="Add a step here!"
                        onChange={handleChange}
                    />

                    <MdEventRepeat 
                        className="
                            absolute 
                            right-[4rem] 
                            top-1/2 
                            transform 
                            -translate-y-1/2 
                            h-[1.5rem] 
                            w-[1.5rem]"
                        onClick={ () => {setStep(step); onRepeatOpen()} }
                    />

                    <BinImage item={step} remove={remove}/>
                </div> 
            )}
        </Draggable>
    );
}

export default DraggableSteps;