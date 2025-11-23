import { Card, CardHeader, ConfirmationModal } from "@components/ui/index.js";
import { useToggleModal } from "@hooks/index.js";
import { GoalStepsForm, useStepForm, StepRecurrenceModal, createSubmissionButtons, createBackButtons } from "@features/goals/index.js";
import PlanningHeader from "./components/PlanningHeader.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { isOpen:isRepeatOpen, onOpen:onRepeatOpen, onClose:onRepeatClose } = useToggleModal();
    const { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop } = useStepForm();

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
                    steps={steps} 
                    staticStepId={staticStepId}
                    push={push} 
                    remove={remove}
                    handleChange={handleChange}
                    handleStaticKeyDown={handleStaticKeyDown}
                    handleSubmit={handleSubmit}
                    handleDragDrop={handleDragDrop}
                    onRepeatOpen={onRepeatOpen}
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

            {isRepeatOpen && <StepRecurrenceModal 
                onRepeatClose={onRepeatClose}
            />}
        </>
    );
}

export default GoalPlanning;