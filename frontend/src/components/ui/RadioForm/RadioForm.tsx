import {RadioGroup, Radio, Label} from 'react-aria-components';
import './RadioForm.css';

interface displayObj {
    value: 'date' | 'ordinal';
    displayLabel: string;
}

interface RadioFormProps {
    /** The form label to display at the start */
    label: string;
    /** The options to display as radio buttons */
    options: displayObj[];
    /** The currently selected radio button(s) */
    selected: string;
    /** Change handler */
    handleChange: (value: string) => void;
}

export const RadioForm = ({ label, options, selected, handleChange }: RadioFormProps) => {
    return(
        <RadioGroup value={selected} onChange={handleChange} className="radio-group-container">
            <Label>{label}</Label>
            {options.map(data => {
                return (
                    <Radio 
                        key={data.value} 
                        value={data.value}
                        className="radio-option"
                    >
                        <div className="radio-circle" />
                        {data.displayLabel}
                    </Radio>
                );
            })}
        </RadioGroup>
    );
}

export default RadioForm;