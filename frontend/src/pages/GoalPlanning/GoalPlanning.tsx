import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useGoBack, useToggleModal, useLoading, useAppNavigate } from "@hooks/index.js";
import { GoalStepsForm, confirmationButtons, type Step, addSteps, yesButtonName, type CompleteGoal, getGoal } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "@root/index.css";

export const GoalPlanning = () => {

    /* For navigating the user if the parent id is invalid */ 
    const navigate = useAppNavigate(); // To redirect when an id is invalid. 
    const { curParentId } = useParams<{ curParentId: string }>();
    const goBack = useGoBack();
    /* Hooks for displaying & hiding this pages modals */
    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose, name } = useToggleModal();
    const [steps, setSteps] = useState<Step[]>();
    const [goal, setGoal] = useState<CompleteGoal>();
    const { loading, setLoading } = useLoading.getState();
    
    /**
     * Checks the parent id is valid each time it changes. 
     * Returns the user home if it's not. 
     */
    useEffect(() => {
        const loadGoal = async () => {
            try {
                setLoading(true)
                const fetchedGoal = await getGoal(curParentId);
                if (! fetchedGoal) {
                    throw new Error(`Goal of id '${curParentId}' couldn't be found`);
                }
                setGoal(fetchedGoal);
            } catch (error) {
                console.warn(error);
                navigate('/', { replace: true });
            } finally {
                setLoading(false);
            }
        }
        loadGoal();
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
    const subOnCloseHandler = async (name: string | undefined) => {
        if (name === yesButtonName && steps && curParentId) {
            await addSteps({newSteps: steps, curParentId: curParentId});
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

    if (loading){ return null }
    return (
        <>
            <PlanningHeader />
            <Card>
                <CardHeader onBackOpen={onBackOpen}/>

                <GoalStepsForm 
                    handleSubmit={handleSubmit}
                    goal={goal}
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