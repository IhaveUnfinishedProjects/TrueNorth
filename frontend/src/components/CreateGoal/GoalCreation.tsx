import { useState } from 'react';
import "@root/index.css";
import BackButton from '@assets/backButton.svg?react';
import Input from './support/Input.js';
import ModalTemplate from './support/Modal.js'
import { backModalButtons, initialValues, submissionModalButtons, InputFieldData} from "./support/Data.js";
import { useToggleModal } from "@root/hooks/useToggleModal.js";
import { useForm } from "@hooks/useFormData.js";

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    // Custom hook to toggle modals. 
    const { isOpen, onOpen, onClose } = useToggleModal();
    const { formValues, handleChange, resetForm } = useForm(initialValues);
    const [isSubmitComponentOpen, setIsSubmitComponentOpen] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        // Mock API call to backend for parent id. 
        event.preventDefault();
        const parentId: string = Date.now().toString();
        resetForm;
        setIsSubmitComponentOpen(true);
    }

    return (
        <div 
            className = {`
                flex 
                flex-col 
                justify-around
                w-1/2
                h-200
                mx-auto 
                px-5
                items-center 
                bg-[#D9D9D9]
                border-2 
                rounded-2xl
            `}
        >   
            {/* Contains header & back button */}
            <div className="flex flex-row my-5 w-[100%]">
                
                <button onClick={onOpen} 
                    className="flex items-center justify-center bg-white rounded-full h-8 w-8"> 
                    <BackButton /> 
                </button>

                <h2 className="mx-auto">Create New Goal</h2>
                <div style={{ width: '24px' }} className="flex-shrink-0 invisible"> {/*This div acts as a right hand spacer*/} </div>
            </div>
            
            {/* Contains the input fields*/}
            <div className = "w-[95%]">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input formValues={formValues} handleChange={handleChange} InputFieldData={InputFieldData}/>
                    <button type = "submit" className="border-[1px] rounded-lg h-10 mb-10 text-white bg-[#3B82F6]">
                        + Create Goal
                    </button>
                </form>
            </div>

            { isOpen && <ModalTemplate 
                header = "Go back?"
                buttons={submissionModalButtons}
                onClose={onClose}
            />}

            {isSubmitComponentOpen && <ModalTemplate 
                header = "Create SubGoal?"
                paragraph= 'Is this a goal made of smaller goals (like "Launch a Company"), or can you list the steps right away?'
                buttons = {backModalButtons}
                onClose={() => setIsSubmitComponentOpen(false)}
            />}
        </div>

    );
}

export default GoalCreation;