import { useState } from "react";
import { parseDate, today, type DateValue } from '@internationalized/date'; 

interface useSelectDateProps {
    defaultVal: string | null | undefined;
}

export function useSelectDate ({defaultVal}: useSelectDateProps) {
    console.log(defaultVal);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = today(userTimeZone);
    const [selectedDate, setSelectedDate] = useState<DateValue>(() => {
        if (defaultVal) {
            try {
                const dateValueObject: DateValue = parseDate(defaultVal);
                return dateValueObject
            } catch (error) {
                console.error(error);
            }
        }  
        return currentDate;
    });

    const handleChange = (value: DateValue | null) => {
        if (value){
            setSelectedDate(value);
        }
    }

    return { selectedDate, handleChange, currentDate };
}

export default useSelectDate;