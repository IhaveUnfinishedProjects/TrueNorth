import { useState, type Key } from "react";

interface ComboBoxProps<T> {
    arr: T[];
}

function useComboBox<T> ({arr}: ComboBoxProps<T>) {

    const [selected, setSelected] = useState<string>(() => {
        return arr.length > 0 ? arr[0]!.toString() : "";
    });

    const handleChange = (value: string | Key | null ) => {
        if (value) {
            setSelected(value.toString());
        }
    }

    return {selected, handleChange};
}

export default useComboBox;