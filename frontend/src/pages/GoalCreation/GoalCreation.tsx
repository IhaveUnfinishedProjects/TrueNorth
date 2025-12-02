import { ConfirmationModal, Card, CardHeader } from '@components/ui/index.js';
import { createBackButtons, createSubmissionButtons, initialValues, InputFieldData, Form, type Goal, addGoal, addStepsButName, addSubGoalButName, isGoal, getGoals, getGoal, type CompleteGoal} from "@features/goals/index.js";
import { useToggleModal, useForm } from '@hooks/index.js';
import "./GoalCreation.css";
import "@root/index.css";
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

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
    const { curParentId } = useParams<{ curParentId: string }>();

    /**
     * Resets the form when the parent id changes.
     * This is how we know to create a new form, 
     * and if the form we're making is a sub goal.
     */
    useEffect(() => {
        if (curParentId && isGoal(curParentId)) {
            resetForm(undefined);
        }

        if (curParentId && !(isGoal(curParentId))) {
            navigate(`/CreateGoal`, { replace: true }); // Safety check for if no goals exist
        } 
    }, [curParentId])

    /**
     * * Submits the data to create a complete goal object. 
     * * Sets the made goal to be the parent goal for the next step. 
     * * Routes the user to where they need to be. 
     * @param buttonName Name of the button pressed to decide route. 
     */
    const submitData = (buttonName: string | undefined) => {
        const newGoal: Goal = {...formValues};
        const goalId = addGoal({newGoal, curParentId});

        if (buttonName === addStepsButName) {
            navigate(`/PlanGoal/${goalId}`);
        }

        if (buttonName === addSubGoalButName){
            navigate(`/CreateGoal/${goalId}`);
        } 
        subModal.onClose();
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