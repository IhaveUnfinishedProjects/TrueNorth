import { useState } from "react";

export function useSelectDate () {


    const currentDate = new Date();
    var options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const currentDateString = currentDate.toLocaleDateString("en-CA", options)
    const [selectedDate, setSelectedDate] = useState<string>(currentDateString);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    }

    return { selectedDate, handleChange };
}

export default useSelectDate;