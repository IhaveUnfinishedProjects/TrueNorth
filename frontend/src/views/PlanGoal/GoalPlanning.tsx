import Card from "@root/components/ui/Card/card.js";
import CardHeader from "@root/components/ui/Card/Header/cardHeader.js";
import useToggleModal from "@hooks/useToggleModal.js";
import PlanningHeader from "./support/PlanningHeader.js";
import DynamicForm from "./support/DynamicForm.js";
import useArrayManipulation from "./support/DynamicFormSupport/useDynamicForm.js";
import ModalTemplate from "@root/components/ui/Modal/GeneralModal.js";
import useSelectDate from "@root/hooks/useSelectDate.js";
import RepeatStepModal from "./support/RecurrenceModals/StepRecurrenceSelectionModal.js";
import { backModalButtons, submissionModalButtons } from "./support/Constants.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { isOpen:isRepeatOpen, onOpen:onRepeatOpen, onClose:onRepeatClose } = useToggleModal();
    const { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown, handleDragDrop } = useArrayManipulation();
    const { selectedDate, handleChange: handleDateChange } = useSelectDate();

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
                onRepeatClose={onRepeatClose}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />}
        </>
    );
}

export default GoalPlanning;