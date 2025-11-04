import "@root/index.css";
import BackButton from '@assets/backButton.svg?react';
import Input from '../../components/Input/Input.js';
import ModalTemplate from '../../components/Modal/Modal.js'
import { Card } from "@root/components/Card/card.js";
import { backModalButtons, initialValues, submissionModalButtons, InputFieldData} from "./support/Data.js";
import { useToggleModal } from "@root/hooks/useToggleModal.js";
import { useForm } from "@hooks/useFormData.js";
import "./GoalCreation.css";

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { formValues, handleChange, resetForm } = useForm(initialValues);

    const handleSubmit = (event: React.FormEvent) => {
        // Mock API call to backend for parent id. 
        event.preventDefault();
        const parentId: string = Date.now().toString();
        resetForm;
        onSubmitOpen();
    }

    return (
        <Card> 

            {/* Contains header & back button */}
            <div className="flex flex-row my-5 w-[100%]">
                
                <button onClick={onBackOpen} 
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

            {/* Contains Modal Logic (Open & Close) */}
            { isBackOpen && <ModalTemplate 
                header = "Go back?"
                buttons={backModalButtons}
                onClose={onBackClose}
            />}

            {isSubmitOpen && <ModalTemplate 
                header = "Create SubGoal?"
                paragraph= 'Is this a goal made of smaller goals (like "Launch a Company"), or can you list the steps right away?'
                buttons = {submissionModalButtons}
                onClose={onSubmitClose}
            />}
        </Card>
    );
}

export default GoalCreation;