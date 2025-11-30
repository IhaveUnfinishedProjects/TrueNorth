import { useState } from "react";
import { OrdinalEnum, type OrdinalType } from '@features/goals/index.js';

interface ordinalProps {
    defaultVal: OrdinalType | undefined | null;
}

export function useOrdinalRadio({defaultVal}: ordinalProps) {
    const [ordinal, setOrdinal] = useState<OrdinalType>(() => {
        const result = OrdinalEnum.safeParse(defaultVal);

        if (result.success){
            return result.data;
        } else {
            return OrdinalEnum.enum.date;
        }
    });

    const onOrdinalChange = (choice: string) => {
        const result = OrdinalEnum.safeParse(choice);

        if (result.success) {
            setOrdinal(result.data);
        } else {
            console.warn("Invalid ordinal | date selected: " + choice);
        }
    }

    return {ordinal, onOrdinalChange};
}

export default useOrdinalRadio;