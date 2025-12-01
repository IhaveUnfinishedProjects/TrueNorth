import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useToggleModal } from "@hooks/index.js";
import { GoalStepsForm, planSubmissionButtons, createBackButtons, type Step, isGoal } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@root/index.css";

export const GoalPlanning = () => {

    const navigate = useNavigate(); // To redirect when an id is invalid. 
    const { curParendId } = useParams<{ curParendId: string }>();

    useEffect(() => {
        if (curParendId){
            const bool = isGoal(curParendId);
            if (bool) {
                return;
            }
        }
        // If this runs the parent goal doesn't exist
        console.error(`Goal resource not found. Invalid ID: ${curParendId}.`);
        navigate('/', { replace: true });
        return;

        }, [curParendId, navigate]);

    /* Hooks for displaying & hiding this pages modals */
    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    
    const handleSubmit = (steps: Step[]) => {
        //resetForm();
        // Make an API call 
        
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