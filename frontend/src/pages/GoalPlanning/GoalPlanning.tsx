import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useGoBack, useToggleModal } from "@hooks/index.js";
import { GoalStepsForm, confirmationButtons, type Step, addSteps, yesButtonName, getGoal } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@root/index.css";

export const GoalPlanning = () => {

    /* For navigating the user if the parent id is invalid */ 
    const navigate = useNavigate(); // To redirect when an id is invalid. 
    const { curParentId } = useParams<{ curParentId: string }>();
    const goBack = useGoBack();
    /* Hooks for displaying & hiding this pages modals */
    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose, name } = useToggleModal();
    const [steps, setSteps] = useState<Step[]>();
    
    /**
     * Checks the parent id is valid each time it changes. 
     * Returns the user home if it's not. 
     */
    useEffect(() => {
        if (!curParentId) {
            console.warn("No goal was found to create steps for.");
            navigate('/', { replace: true });
        }
        }, [curParentId]);

    
    /**
     * Local submit handler stores a temp version of
     * steps, then opens a confirmation modal. 
     */
    const handleSubmit = (steps: Step[]) => {       
        setSteps(steps); 
        onSubmitOpen();
    }

    /**
     * Checks if the submit button was pressed. 
     * This allows the steps to be added and the user
     * to be navigated home. 
     */
    const subOnCloseHandler = (name: string | undefined) => {
        if (name === yesButtonName && steps && curParentId) {
            addSteps({newSteps: steps, curParentId: curParentId});
            navigate('/');
            return;
        } else {
            console.error("Steps was unable to be added");
            navigate('/');
        }
        onSubmitClose();
    }

    /**
     * Checks if the user wants to go back to editing the goal. 
     */
    const backOnCloseHander = (name: string | undefined) => {
        if (name === yesButtonName) {
            goBack();
        }
        onBackClose();
    }
    return (
        <>
            <PlanningHeader />
            <Card>
                <CardHeader onBackOpen={onBackOpen}/>

                <GoalStepsForm 
                    handleSubmit={handleSubmit}
                    goal={getGoal(curParentId)}
                />
            </Card>

            {isBackOpen && <ConfirmationModal 
                header="Go back?" 
                buttons={confirmationButtons} 
                onClose={backOnCloseHander}
            />}
            
            {isSubmitOpen && <ConfirmationModal 
                header="Finished?" 
                buttons={confirmationButtons} 
                onClose={subOnCloseHandler}
            />}
        </>
    );
}

export default GoalPlanning;