import { useMemo } from "react";
import type { DateValue } from '@internationalized/date';

interface UseOrdinalRadioProps {
    interval: "Years" | "Months";
    selectedDate: DateValue;
}

/**
 * Takes the interval "Years" or "Months" allowing us to produce a 
 * ordinal and date string in accordance based on the selected date. 
 */
function useOrdinalRadio({ interval, selectedDate }: UseOrdinalRadioProps) {

    // Helper for "st", "nd", "rd", "th"
    const getSuffix = (day: number): string => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const { options, recurrenceLabel } = useMemo(() => {
        /** * A helper function for OrdinalRadio, calculating the date as an ordinal. 
         * Returns a string version of the selected date with an ordinal option. 
         * E.G "6th of October" or "1st Saturday of October" for yearly.
         */
        const dateObj = selectedDate.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone);
        const dayOfMonth = dateObj.getDate();
        const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

        // Calculate week number: (Day + 6) / 7 rounded down gives 0-index week
        let weekIndex = Math.ceil(dayOfMonth / 7) - 1;
        
        // Edge Case: If it's the 5th occurence (use "Last" index 4)
        if (weekIndex > 4) weekIndex = 4; 

        const ordinals = ["1st", "2nd", "3rd", "4th", "Last"];
        
        let dateDesc = `${dayOfMonth}${getSuffix(dayOfMonth)}`;
        let ordinalDesc = `${ordinals[weekIndex]} ${dayOfWeek}`;
        let recurrenceLabel = " on the";

        if (interval === "Months") {
            recurrenceLabel = "Monthly" + recurrenceLabel;
        } else {
            // "Years" logic
            recurrenceLabel = "Yearly" + recurrenceLabel;
            const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
            dateDesc += ` of ${monthName}`;
            ordinalDesc += ` of ${monthName}`;
        }

        return {
            recurrenceLabel,
            options: [
                { value: 'date' as const, displayLabel: dateDesc },
                { value: 'ordinal' as const, displayLabel: ordinalDesc }
            ]
        };
    }, [selectedDate, interval]);

    return { options, recurrenceLabel };
}

export default useOrdinalRadio;