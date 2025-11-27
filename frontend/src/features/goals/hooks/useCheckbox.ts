import { useState } from 'react';

/**
 * 
 * @returns 
 */
function useCheckbox () {

    const [ selectedBoxes, setSelectedBoxes ] = useState<string[]>([]);

    const handleChange = (values: string[] | null) => {
        if (values) {
            setSelectedBoxes(values);
        }
    }

    return { selectedBoxes, handleChange }
}

export default useCheckbox;