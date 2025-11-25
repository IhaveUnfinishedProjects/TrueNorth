import { useState } from 'react';

/**
 * 
 * @returns 
 */
function useCheckbox () {

    const [ selectedBoxes, setSelectedBoxes ] = useState<string[]>([]);

    const handleChange = (values: string[]) => {
        setSelectedBoxes(values);
    }

    return { selectedBoxes, handleChange }
}

export default useCheckbox;