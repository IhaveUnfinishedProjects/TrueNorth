import { ConfirmationModal, Card, CardHeader } from '@components/ui/index.js';
import { createBackButtons, createSubmissionButtons, initialValues, InputFieldData, Form} from "@features/goals/index.js";
import { useToggleModal, useForm } from '@hooks/index.js';
import "./GoalCreation.css";
import "@root/index.css";

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { formValues, handleChange, resetForm } = useForm(initialValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Mock API call to backend for parent id. 
        event.preventDefault();
        const parentId: string = Date.now().toString();

        // Logging the data. 
        const data = Object.fromEntries(new FormData(event.currentTarget).entries());
        console.log(data);

        resetForm();
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
            
            { isBackOpen && <ConfirmationModal 
                header = "Go back?"
                buttons={createBackButtons}
                onClose={onBackClose}
            />}

            {isSubmitOpen && <ConfirmationModal 
                header = "Create SubGoal?"
                paragraph= 'Is this a goal made of smaller goals (like "Launch a Company"), or can you list the steps right away?'
                buttons = {createSubmissionButtons}
                onClose={onSubmitClose}
            />}
        </Card>
    );
}

export default GoalCreation;