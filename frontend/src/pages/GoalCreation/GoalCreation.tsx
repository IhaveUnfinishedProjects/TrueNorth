import { ConfirmationModal, Card, CardHeader } from '@components/ui/index.js';
import { createBackButtons, createSubmissionButtons, initialValues, InputFieldData, Form, type Goal, addGoal, addStepsButName, addSubGoalButName} from "@features/goals/index.js";
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
    const [ curParentId, setCurParentId ] = useState<string>();
    const [ pendingGoal, setPendingGoal ] = useState<Goal>();


    /** 
     * When the goal is submitted this runs as the name
     * of the Submission modal button is returned on 
     * it's onClose();
     */
    useEffect(() => {
        if (subModal.name && pendingGoal) {
            
            const parentId = addGoal(pendingGoal);
            setCurParentId(parentId);

            // For when steps are being added
            if (subModal.name === addStepsButName) {
                navigate(`/PlanGoal/${parentId}`);
                return;
            }

            // For when a sub-goal is being made
            if (subModal.name === addSubGoalButName){
                resetForm();
                return;
            }

        }
    }, [subModal.name]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Mock API call to backend for parent id. 
        event.preventDefault();

        // Logging the data. 
        setPendingGoal({
            goalName: formValues.goalName,
            desiredAchievement: formValues.desiredAchievement,
            importance: formValues.importance,
            measurement: formValues.measurement,
            achievementDate: formValues.achievementDate,
            parent: curParentId ?? ''
        });

        subModal.onOpen();
    }

    return (
        <Card> 
            <CardHeader onBackOpen={backModal.onOpen} />

            <Form
                formValues={formValues} 
                handleChange={handleChange} 
                InputFieldData={InputFieldData} 
                handleSubmit={handleSubmit} 
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
                onClose={subModal.onClose}
            />}
        </Card>
    );
}

export default GoalCreation;