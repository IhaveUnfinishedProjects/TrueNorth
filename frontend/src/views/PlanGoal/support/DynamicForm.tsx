import { useEffect, type ChangeEvent, type KeyboardEvent } from "react"
import { type Step } from "./Data.js";

interface DynamicFormProps {
    steps: Step[];
    staticStepId: string;
    push: (step: Step) => void;
    remove: (step: Step) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStaticKeyDown: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ steps, staticStepId, push, remove, handleChange, handleStaticKeyDown }) => {

    const staticStep = steps.find(step => step.id === staticStepId)
    const dynamicSteps = steps.filter(step => step.id != staticStepId);

    return(
        <form className="flex flex-col">
            {dynamicSteps.map((data) => {
                return (
                    <input
                        key={data.id}
                        name={data.id} 
                        value={data.description}
                        onChange={handleChange}
                    />
                );
            })}

            {staticStep && (
                <input 
                    key={staticStep.id}
                    name={staticStep.id}
                    value={staticStep.description}
                    onChange={handleChange}
                    onKeyDown={handleStaticKeyDown}
                />
            )}
        </form>
    );
}

export default DynamicForm;

