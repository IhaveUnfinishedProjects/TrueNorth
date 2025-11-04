import "@root/index.css";
import BackButton from '@assets/backButton.svg?react';
import Input from '../../components/FormInput/Input.js';
import ModalTemplate from '../../components/Modal/Modal.js'
import { Card } from "@root/components/Card/card.js";
import { backModalButtons, initialValues, submissionModalButtons, InputFieldData} from "./support/Data.js";
import { useToggleModal } from "@root/hooks/useToggleModal.js";
import { useForm } from "@hooks/useFormData.js";
import CardHeader from "@root/components/Card/Header/header.js";
import Form from "@root/components/FormInput/Form.js";
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
            <CardHeader onBackOpen={onBackOpen} />

            <Form
                formValues={formValues} 
                handleChange={handleChange} 
                InputFieldData={InputFieldData} 
                handleSubmit={handleSubmit} 
            />

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