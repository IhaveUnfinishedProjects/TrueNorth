import Card from "@root/components/Card/card.js";
import CardHeader from "@root/components/Card/Header/cardHeader.js";
import useToggleModal from "@hooks/useToggleModal.js";
import PlanningHeader from "./support/PlanningHeader.js";
import DynamicForm from "./support/DynamicForm.js";
import useArrayManipulation from "./support/useArrayManipulation.js";
import ModalTemplate from "@root/components/Modal/Modal.js";
import { backModalButtons, submissionModalButtons } from "./support/Data.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { isOpen:isSubmitOpen, onOpen:onSubmitOpen, onClose:onSubmitClose } = useToggleModal();
    const { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown } = useArrayManipulation();

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
        </>
    );
}

export default GoalPlanning;