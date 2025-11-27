import { RxDragHandleDots2 } from "react-icons/rx";
import { MdEventRepeat } from "react-icons/md";
import { type DraggableProvided, Draggable } from "@hello-pangea/dnd";
import BinImage from "../StepDeleteButton.js";
import type { Step } from "@features/goals/index.js";
import type { ChangeEvent } from "react";
import './DraggableStep.css';

interface DraggableProps {
    step: Step;
    index: number;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    remove: (step: Step) => void;
    onRepeatOpen: () => void;
    setStep: (step: Step) => void;
};


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
                    className="inputTags"
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
                        onClick={ () => {setStep(step), onRepeatOpen() }}
                    />

                    <BinImage step={step} remove={remove}/>
                </div> 
            )}
        </Draggable>
    );
}

export default DraggableSteps;