import { ConfirmationModal, Card, CardHeader } from '@components/ui/index.js';
import { createBackButtons, createSubmissionButtons, initialValues, InputFieldData, Form, type Goal, addGoal, addStepsButName, addSubGoalButName, isGoal, getGoals, getGoal, type CompleteGoal} from "@features/goals/index.js";
import { useToggleModal, useForm } from '@hooks/index.js';
import "./GoalCreation.css";
import "@root/index.css";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    const navigate = useNavigate();
    const backModal = useToggleModal();
    const subModal = useToggleModal();
    const { formValues, handleChange, resetForm } = useForm(initialValues);
    const [ parentGoal, setParentGoal ] = useState<CompleteGoal>();

    /**
     * * Submits the data to create a complete goal object. 
     * * Sets the made goal to be the parent goal for the next step. 
     * * Routes the user to where they need to be. 
     * @param buttonName Name of the button pressed to decide route. 
     */
    const submitData = (buttonName: string | undefined) => {
        const newGoal: Goal = {...formValues};
        const goalId = addGoal(newGoal);
        setParentGoal(getGoal(goalId));

        if (buttonName === addStepsButName) {
            navigate(`/PlanGoal/${goalId}`);
            return;
        }

        if (buttonName === addSubGoalButName){
            resetForm(undefined);
            return;
        } 
    }

    const localSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        subModal.onOpen();
    }

    return (
        <Card> 
            <CardHeader onBackOpen={backModal.onOpen} />

            <Form
                formValues={formValues} 
                handleChange={handleChange} 
                InputFieldData={InputFieldData} 
                handleSubmit={localSubmit} 
            />

            {/* Contains Modal Logic (Open & Close) */}
            
            { backModal.isOpen && <ConfirmationModal 
                header = "Go back?"
                buttons={createBackButtons}
                onClose={backModal.onClose}
            />}

            {subModal.isOpen && <ConfirmationModal 
                header = "Create SubGoal?"
                paragraph= 'Is this a goal made of smaller goals (like "Launch a Company"), or can you list the steps right away?'
                buttons = {createSubmissionButtons}
                onClose={submitData}
            />}
        </Card>
    );
}

export default GoalCreation;