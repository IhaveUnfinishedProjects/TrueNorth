import Card from "@root/components/Card/card.js";
import CardHeader from "@root/components/Card/Header/cardHeader.js";
import useToggleModal from "@hooks/useToggleModal.js";
import PlanningHeader from "./support/PlanningHeader.js";
import DynamicForm from "./support/DynamicForm.js";
import useArrayManipulation from "./support/useArrayManipulation.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    const { steps, push, remove, handleChange } = useArrayManipulation();

    return (
        <>
            <PlanningHeader />
            <Card>
                <CardHeader onBackOpen={onBackOpen}/>

                <DynamicForm 
                    steps={steps} 
                    push={push} 
                    remove={remove}
                    handleChange={handleChange}
                />
            </Card>
        </>
    );
}

export default GoalPlanning;