import { useState } from 'react';

interface useCheckboxProps {
    defaultVal: string[] | null | undefined;
}

/**
 * Holds the selected options of a react-aria-components check box. 
 */
function useCheckbox ({defaultVal}: useCheckboxProps) {

    const [ selectedBoxes, setSelectedBoxes ] = useState<string[]>(() =>{
        if (defaultVal) {
            return defaultVal;
        }
        return [];
    });

    const handleChange = (values: string[] | null) => {
        if (values) {
            setSelectedBoxes(values);
        }
    }

    return { selectedBoxes, handleChange }
}

export default useCheckbox;