import { RxDragHandleDots2 } from "react-icons/rx";
import { MdEventRepeat } from "react-icons/md";
import { type DraggableProvided, Draggable } from "@hello-pangea/dnd";
import BinImage from "./TrashIcon.js";
import type { Step } from "../Constants.js";
import type { ChangeEvent } from "react";

interface DraggableProps {
    data: Step;
    index: number;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    remove: (step: Step) => void;
    onRepeatOpen: () => void;
};


export const DraggableSteps = ({data, index, handleChange, remove, onRepeatOpen }: DraggableProps) => {
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

                    <input className="w-[90%] pr-[0.6rem]"
                        name={data.id} 
                        value={data.description}
                        placeholder="Add a step here!"
                        onChange={handleChange}
                    />

                    <MdEventRepeat 
                        className="
                            absolute 
                            right-[2.5rem] 
                            top-1/2 
                            transform 
                            -translate-y-1/2 
                            h-[1.5rem] 
                            w-[1.5rem]"
                        
                        onClick={onRepeatOpen}
                    />

                    <BinImage step={data} remove={remove}/>
                </div> 
            )}
        </Draggable>
    );
}

export default DraggableSteps;