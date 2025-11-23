import { useState } from "react";
import { today, type DateValue } from '@internationalized/date'; 

export function useSelectDate () {


    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDateString = today(userTimeZone);
    const [selectedDate, setSelectedDate] = useState<DateValue>(currentDateString);

    const handleChange = (value: DateValue | null) => {
        if (value){
            setSelectedDate(value);
        }
    }

    return { selectedDate, handleChange };
}

export default useSelectDate;