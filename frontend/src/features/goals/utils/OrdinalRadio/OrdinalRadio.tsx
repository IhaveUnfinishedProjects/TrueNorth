import type { DateValue } from '@internationalized/date';
import { RadioForm } from '@components/ui/index.js';
import useOrdinalRadio from './useOrdinalRadio.js';

interface OrdinalRadioProps {
    interval: "Years" | "Months";
    selectedDate: DateValue;
    name: string;
}

/**
 * Displays radio buttons allowing the user to select a date / ordinal based step recurrence. 
 * @param interval - "Years" or "Months" --> Effects how the ordinal / date options are displayed
 * @param selectedDate - The date the ordinal / date options are calculated from
 */
export const OrdinalRadio = ({ interval, selectedDate, name }: OrdinalRadioProps) => {

    const { selected, handleChange, options, label } = useOrdinalRadio({ interval, selectedDate });

    return (
        <div>
            <RadioForm 
                label={label} 
                options={options} 
                selected={selected} 
                handleChange={handleChange} 
                name={name} 
            />
        </div>
    );
};

export default OrdinalRadio;