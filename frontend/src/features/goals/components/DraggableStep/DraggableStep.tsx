import { RxDragHandleDots2 } from "react-icons/rx";
import { MdEventRepeat } from "react-icons/md";
import { type DraggableProvided, Draggable } from "@hello-pangea/dnd";
import BinImage from "../StepDeleteButton.js";
import type { Step } from "@features/goals/index.js";
import type { ChangeEvent } from "react";
import './DraggableStep.css';

interface DraggableProps {
    data: Step;
    index: number;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    remove: (step: Step) => void;
    onRepeatOpen: () => void;
    setStepId: (id: string) => void;
};


export const DraggableSteps = ({data, index, handleChange, remove, onRepeatOpen, setStepId }: DraggableProps) => {

    const localHandler = () => {
        setStepId(data.id);
        onRepeatOpen();
    }

    return (
        <Draggable 
            draggableId={data.id} 
            key={data.id} 
            index={index}
        >
            {(provided: DraggableProvided) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    key={data.id} 
                    className="inputTags"
                >
                    <div {...provided.dragHandleProps}>
                        <RxDragHandleDots2 className="w-6 h-6"/>
                    </div>

                    <input className="w-[100%] pr-[2.5rem]"
                        name={data.id} 
                        value={data.description}
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
                        onClick={ localHandler }
                    />

                    <BinImage step={data} remove={remove}/>
                </div> 
            )}
        </Draggable>
    );
}

export default DraggableSteps;