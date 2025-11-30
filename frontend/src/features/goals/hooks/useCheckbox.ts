import { useState } from 'react';

interface useCheckboxProps {
    defaultVal: string[] | null | undefined;
}

/**
 * 
 */
function useCheckbox ({defaultVal}: useCheckboxProps) {

    const [ selectedBoxes, setSelectedBoxes ] = useState<string[]>(() =>{
        if (defaultVal) {
            return defaultVal;
        }
        return [];
    });

    const handleChange = (values: string[]) => {
        setSelectedBoxes(values);
    }

    return { selectedBoxes, handleChange }
}

export default useCheckbox;