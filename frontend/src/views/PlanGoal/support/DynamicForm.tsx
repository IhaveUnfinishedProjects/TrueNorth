import { useEffect, type ChangeEvent } from "react"
import { type Step } from "./Data.js";

interface DynamicFormProps {
    steps: Step[];
    push: (step: Step) => void;
    remove: (step: Step) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ steps, push, remove, handleChange }) => {

    useEffect(() => {
        const newStep = {id: "Id name", description: "Description"};
        push(newStep);
    }, []);

    return(
        <form className="flex flex-col">
            {steps.map((data, index) => {
                return (
                    <input
                    key={index}
                    value={data.id}
                    name={data.description} 
                    onChange={handleChange}
                />);
            })}
        </form>
    );
}

export default DynamicForm;