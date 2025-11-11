import { useState } from "react";

export function useRadioButtons () {
    const [selectedButton, setSelectedButton] = useState<string>("");

    const checkIsSelected = (current: string) => {
        return (current === selectedButton);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedButton(event.target.value);
    }

    return { checkIsSelected, handleChange };
}

export default useRadioButtons;