import { type ChangeEvent } from "react"
import { type Step } from "./Data.js";
import BinImage from "./Bin.js";

interface DynamicFormProps {
    steps: Step[];
    staticStepId: string;
    push: (step: Step) => void;
    remove: (step: Step) => void;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleStaticKeyDown: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ 
        steps, 
        staticStepId, 
        push, remove,
        handleChange, 
        handleStaticKeyDown, 
        handleSubmit 
    }) => {

    const staticStep = steps.find(step => step.id === staticStepId)
    const dynamicSteps = steps.filter(step => step.id != staticStepId);

    return(
        <form onSubmit={handleSubmit}>
            {steps.length > 1 && <h3>First Step</h3>}
            {dynamicSteps.map((data) => {
                return (
                    <div key={data.id} className="w-[100%] flex flex-row justify-between items-center">
                        <input className="w-[90%]"
                            name={data.id} 
                            value={data.description}
                            placeholder="Add a step here!"
                            onChange={handleChange}
                        />
                        <BinImage step={data} remove={remove}/>
                    </div>
                );
            })}
            
            <h3>New Step</h3>
            {staticStep && (
                <input 
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

