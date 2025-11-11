import Card from "@root/components/Card/card.js";
import CardHeader from "@root/components/Card/Header/cardHeader.js";
import useToggleModal from "@hooks/useToggleModal.js";
import PlanningHeader from "./support/PlanningHeader.js";
import DynamicForm from "./support/DynamicForm.js";
import useArrayManipulation from "./support/DynamicFormSupport/useArrayManipulation.js";
import ModalTemplate from "@root/components/Modal/GeneralModal.js";
import useRadioButtons from "@root/hooks/useRadioButtons.js";
import RepeatStepModal from "./support/RecurrenceModals/StepRecurrenceSelectionModal.js";
import { backModalButtons, submissionModalButtons, stepFrequency } from "./support/Constants.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { isOpen:isRepeatOpen, onOpen:onRepeatOpen, onClose:onRepeatClose } = useToggleModal();
    const { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop } = useArrayManipulation();
    const { checkIsSelected, handleChange: handleRadioChange } = useRadioButtons();

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

                <DynamicForm 
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

            {isBackOpen && <ModalTemplate 
                header="Go back?" 
                buttons={backModalButtons} 
                onClose={onBackClose}
            />}
            
            {isSubmitOpen && <ModalTemplate 
                header="Something" 
                buttons={submissionModalButtons} 
                onClose={onSubmitClose}
            />}

            {isRepeatOpen && <RepeatStepModal 
                stepFrequency={stepFrequency}
                checkIsSelected={checkIsSelected}
                handleChange={handleRadioChange}
                onRepeatClose={onRepeatClose}
            />}
        </>
    );
}

export default GoalPlanning;