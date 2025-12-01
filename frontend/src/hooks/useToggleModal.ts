import { useState, useCallback } from "react";

/* 
    This hook is used to toggle the open and closed state 
    of a modal. 
*/
export function useToggleModal() {

    /**
     * Used to toggle the modal open or closed
     * using true / false
     */
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Returns the name of the button clicked, if given one
     */
    const [name, setName] = useState<string>()

    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = (name?: string) => {
        if (name) {
            setName(name);
        }
        setIsOpen(false);
    }

    return { isOpen, onOpen, onClose, name };
}

export default useToggleModal;