import { useState, type ChangeEvent } from 'react';

export const useInput = () => {

    const [selected, setSelected] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelected(e.target.value);
    };

    return { selected, onChange };
};

export default useInput;