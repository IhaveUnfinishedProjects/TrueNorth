import Card from "@root/components/Card/card.js";
import CardHeader from "@root/components/Card/Header/header.js";
import useToggleModal from "@hooks/useToggleModal.js";

export const GoalPlanning = () => {

    const { isOpen:isBackOpen, onOpen:onBackOpen, onClose:onBackClose } = useToggleModal();
    return (
        <Card>
            <CardHeader onBackOpen={onBackOpen}/>
        </Card>
    );
}

export default GoalPlanning;