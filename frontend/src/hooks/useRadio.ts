import { useState } from "react";

export function useRadio() {
    const [selected, setSelected] = useState<string>('');

    const handleChange = (value: string | null) => {
        setSelected(value ?? '');
    }

    return {selected, handleChange};
}

export default useRadio;