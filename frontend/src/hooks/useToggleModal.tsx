import { useState, useCallback } from "react";

/* 
    This hook is used to toggle the open and closed state 
    of a modal. 
*/
export function useToggleModal() {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return { isOpen, onOpen, onClose };
}

export default useToggleModal;