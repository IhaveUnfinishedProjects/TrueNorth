import { ConfirmationModal, Card, CardHeader } from '@components/ui/index.js';
import { createBackButtons, createSubmissionButtons, initialValues, InputFieldData, Form, type Goal, addGoal, addStepsButName, addSubGoalButName, isGoal, getGoal, yesBackButton, noBackButton, type CompleteGoal} from "@features/goals/index.js";
import { useToggleModal, useForm, useGoBack, useAppNavigate } from '@hooks/index.js';
import "./GoalCreation.css";
import "@root/index.css";
import { useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    const navigate = useAppNavigate();
    const backModal = useToggleModal();
    const subModal = useToggleModal();
    const { formValues, handleChange, resetForm } = useForm(initialValues);
    const { goBack } = useGoBack();
    const { curParentId } = useParams<{ curParentId?: string, goalId?: string }>();
    const isEditMode = location.pathname.includes("/EditGoal");
    console.log(isEditMode);

    /**
     * Resets the form when the parent id changes.
     * This is how we know to create a new form, 
     * and if the form we're making is a sub goal.
     */
    useEffect(() => {
        if (curParentId) {
            if (isGoal(curParentId)) {
                if (isEditMode) {
                    const goal: CompleteGoal | undefined = getGoal(curParentId);
                    resetForm(goal);
                } else {
                    resetForm(undefined);
                }
            } else {
                navigate('/CreateGoal', {replace: true});
            }
        }
    }, [curParentId, isEditMode])

    /**
     * * Submits the data to create a complete goal object. 
     * * Sets the made goal to be the parent goal for the next step. 
     * * Routes the user to where they need to be. 
     * @param buttonName Name of the button pressed to decide route. 
     */
    const submitData = (buttonName: string | undefined) => {
        const newGoal: Goal = {...formValues};
        const goalId = addGoal({newGoal, curParentId});
        navigate(`/EditGoal/${goalId}`, {replace: true});
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

    /**
     * Local handler for when the a button in
     * the back modal is pressed. Routes the user
     * to their last page or to home. 
     */
    function localBackHandler (buttonName: string | undefined) {
        if (buttonName === yesBackButton) {
            goBack();
        }

        backModal.onClose();
        return;
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
                onClose={localBackHandler}
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