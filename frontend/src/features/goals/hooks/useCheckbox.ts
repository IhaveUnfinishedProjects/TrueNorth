import { useState } from 'react';

interface useCheckboxProps {
    value: string[] | null | undefined;
}

/**
 * Holds the selected options of a react-aria-components check box. 
 */
function useCheckbox ({value}: useCheckboxProps) {
    const [ selectedBoxes, setSelectedBoxes ] = useState<string[]>(() =>{
        if (value) {
            return value;
        }
        return [];
    });

    const handleChange = ({value}: useCheckboxProps) => {
        if (value) {
            setSelectedBoxes(value);
        }
    }

    return { selectedBoxes, handleChange }
}

export default useCheckbox;