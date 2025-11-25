import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useToggleModal } from "@hooks/index.js";
import { GoalStepsForm, createSubmissionButtons, createBackButtons } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";
import "@root/index.css";

export const GoalPlanning = () => {

    /* Hooks for displaying & hiding this pages modals */
    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();

    /* Hooks for recieving submitted data from this pages forms & modals */

    const handleSubmit = (event: React.FormEvent) => {
        // Mock API call to backend
        event.preventDefault();
        //resetForm();
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
                header="Something" 
                buttons={createSubmissionButtons} 
                onClose={onSubmitClose}
            />}
        </>
    );
}

export default GoalPlanning;