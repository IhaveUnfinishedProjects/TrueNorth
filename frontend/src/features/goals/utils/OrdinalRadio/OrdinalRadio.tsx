import type { DateValue } from '@internationalized/date';
import { RadioForm } from '@components/ui/index.js';
import useOrdinalRadio from './useOrdinalRadio.js';
import type { OrdinalType } from '@features/goals/index.js';

interface OrdinalRadioProps {
    ordinalChoice: OrdinalType;
    onChange: ( ordinal: string ) => void;
    interval: "Years" | "Months";
    selectedDate: DateValue;
    name: string;
}

/**
 * Displays radio buttons allowing the user to select a date / ordinal based step recurrence.
 * @param ordinalChoice - Currently selected Ordinal (drdinal | date)
 * @param onChange - Change handler, returns a string ('ordinal' | 'date') 
 * @param interval - "Years" or "Months" --> Effects how the ordinal / date options are displayed
 * @param selectedDate - The date the ordinal / date options are calculated from
 */
export const OrdinalRadio = ({ ordinalChoice, onChange, interval, selectedDate, name }: OrdinalRadioProps) => {

    const { options, recurrenceLabel } = useOrdinalRadio({ interval, selectedDate });

    return (
        <div>
            <RadioForm 
                label={recurrenceLabel} 
                options={options} 
                selected={ ordinalChoice } 
                onChange={onChange} 
                name={name} 
            />
        </div>
    );
};

export default OrdinalRadio;