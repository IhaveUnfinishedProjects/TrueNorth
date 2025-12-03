import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useToggleModal } from "@hooks/index.js";
import { GoalStepsForm, planSubmissionButtons, confirmButtonName, createBackButtons, type Step, isGoal, addSteps } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@root/index.css";

export const GoalPlanning = () => {

    /* For navigating the user if the parent id is invalid */ 
    const navigate = useNavigate(); // To redirect when an id is invalid. 
    const { curParentId } = useParams<{ curParentId: string }>();
    /* Hooks for displaying & hiding this pages modals */
    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose, name } = useToggleModal();
    const [steps, setSteps] = useState<Step[]>();
    
    /**
     * Checks the parent id is valid each time it changes. 
     * Returns the user home if it's not. 
     */
    useEffect(() => {
        if (curParentId){
            const bool = isGoal(curParentId);
            if (bool) {
                return; // Returns if parent goal exists
            }
        }
        // Take the user home if the goal doesn't exist
        console.error(`Goal resource not found. Invalid ID: ${curParentId}.`);
        navigate('/', { replace: true });
        return;

        }, [curParentId]);

    /**
     * Checks if the submit button was pressed. 
     * This allows the steps to be added and the user
     * to be navigated home. 
     */
    useEffect(() => {
        if (name) {
            if (name === confirmButtonName && steps && curParentId) {
                addSteps({newSteps: steps, curParentId: curParentId});
                navigate('/');
                return;
            }
        }
    }, [name])
    
    const handleSubmit = (steps: Step[]) => {       
        setSteps(steps); 
        onSubmitOpen();
    }

    return (
        <>
            <PlanningHeader />
            <Card>
                <CardHeader onBackOpen={onBackOpen}/>

                <GoalStepsForm 
                    handleSubmit={handleSubmit}
                />
            </Card>

            {isBackOpen && <ConfirmationModal 
                header="Go back?" 
                buttons={createBackButtons} 
                onClose={onBackClose}
            />}
            
            {isSubmitOpen && <ConfirmationModal 
                header="Finished?" 
                buttons={planSubmissionButtons} 
                onClose={onSubmitClose}
            />}
        </>
    );
}

export default GoalPlanning;