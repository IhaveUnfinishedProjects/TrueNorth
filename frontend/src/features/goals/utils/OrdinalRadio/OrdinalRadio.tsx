import type { DateValue } from '@internationalized/date'
import { RadioForm } from '@components/ui/index.js';
import { useState } from 'react';

interface OrdinalRadioProps {
    interval: "Years" | "Months";
    selectedDate: DateValue;
}

/**
 * Displays radio buttons allowing the user to select a date / ordinal based step recurrence. 
 * @param interval - "Years" or "Months" --> Effects how the ordinal / date options are displayed
 * @param selectedDate - The date the ordinal / date options are calculated from
 */
export const OrdinalRadio = ({interval, selectedDate}: OrdinalRadioProps ) => {

    const [selected, setSelected] = useState("");

    const handleChange = (value: string) => {
        setSelected(value)
    };

    const dateSelected = selectedDate.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);
    let { dateDesc, ordinalDesc } = getOrdinalDateDescription(dateSelected);
    let recurrence = " on the";

    if (interval === "Months"){
        recurrence = "Monthly" + recurrence;
    } else if (interval === "Years") {
        recurrence = "Yearly" + recurrence;
        const monthName = dateSelected.toLocaleString(undefined, { month: 'long' });
        dateDesc = `${dateDesc} of ${monthName}`;
        ordinalDesc =  `${ordinalDesc} of ${monthName}`;
    }

    const options=[{value: 'date' as const, displayLabel: dateDesc}, {value: 'ordinal' as const, displayLabel: ordinalDesc}];

    return(
        <div>
            <RadioForm label={recurrence} options={options} selected={selected} handleChange={handleChange} name="type"/>
        </div>
    );
}

/**
 * A helper function for OrdinalRadio, calculating the date as an ordinal. 
 * @param date - The selected date
 * @returns a string version of the selected date with an ordinal option. E.G "6th of October" or "1st Saturday of October" for yearly. 
 */
export const getOrdinalDateDescription = (date: Date): { dateDesc: string, ordinalDesc: string } => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const ordinals = ["1st", "2nd", "3rd", "4th", "Last"];

    const dayOfMonth = date.getDate();
    const dayOfWeek = days[date.getDay()];
    
    // Calculate week number: (Day + 6) / 7 rounded down gives 0-index week
    let weekIndex = Math.ceil(dayOfMonth / 7) - 1;
    
    // Edge Case: If it's the 5th occurence
    if (weekIndex > 4) weekIndex = 4; 

    return {
        dateDesc: `${dayOfMonth}${getSuffix(dayOfMonth)}`,
        ordinalDesc: `${ordinals[weekIndex]} ${dayOfWeek}`
    };
};

// Helper for "st", "nd", "rd", "th"
function getSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

export default OrdinalRadio;