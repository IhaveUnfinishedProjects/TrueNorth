import { useState } from "react";

interface ComboBoxProps<T> {
    arr: T[];
}

function useComboBox<T> ({arr}: ComboBoxProps<T>) {
    const [selected, setSelected] = useState("");

    const handleChange = (value: T | null) => {
        if (value && arr.includes(value)) {
            setSelected(value.toString());
            console.log(value.toString());
        }
    }

    return {selected, handleChange};
}

export default useComboBox;