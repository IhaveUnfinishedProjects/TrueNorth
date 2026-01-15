import {RadioGroup, Radio, Label} from 'react-aria-components';
import './RadioForm.css';

interface displayObj {
    value: string; // Used as the id & name of the radio option.
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
    onChange: (value: string) => void;
    /** The name of the Radio component */
    name: string
    /** Optional css class name for the RadioGroup */
    className?: string;
}

export const RadioForm = ({ label, options, selected, onChange, name, className }: RadioFormProps) => {
    return(
        <RadioGroup value={selected} onChange={onChange} name={name} className={`radio-group-container ${className}`} aria-label='Radio Form'>
            {options.map(data => {
                return (
                    <Radio 
                        key={data.value} 
                        value={data.value}
                        className="radio-option"
                        aria-label={data.displayLabel}
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