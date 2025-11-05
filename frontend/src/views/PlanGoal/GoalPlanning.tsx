import Card from "@root/components/Card/card.js";
import CardHeader from "@root/components/Card/Header/cardHeader.js";
import useToggleModal from "@hooks/useToggleModal.js";
import PlanningHeader from "./support/PlanningHeader.js";
import DynamicForm from "./support/DynamicForm.js";
import useArrayManipulation from "./support/useArrayManipulation.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { steps, push, remove, handleChange, staticStepId, handleStaticKeyDown } = useArrayManipulation();

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
                />
            </Card>
        </>
    );
}

export default GoalPlanning;