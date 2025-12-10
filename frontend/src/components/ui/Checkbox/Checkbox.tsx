import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';
import "./Checkbox.css";

interface CheckBoxOptions {
    id: string;
    description: string;
}

interface RecurrenceCheckboxProps {
    /** The list of currently selected values */
    curSelected: string[];
    /** Handler called when selection changes, returning a new list of values */
    onChange: (values: string[] | null) => void;
    /** The options to display */
    options: CheckBoxOptions[];
    name: string;
    label?: string;
}

export const CheckboxComponent = ({ curSelected, onChange, options, name, label }: RecurrenceCheckboxProps) => {
    return (
        <CheckboxGroup 
            value={curSelected} 
            onChange={onChange} 
            className="react-aria-Checkbox"
            name={name}
        >
            <Label className="checkbox-group-label">{label}</Label>
            
            <div className="checkbox-grid">
                {options.map((data) => (
                    <Checkbox key={data.id} value={data.id} className="checkbox-option">
                        {/* The Visual Box */}
                        <div className="checkbox-box">
                            <svg viewBox="0 0 18 18" aria-hidden="true">
                                <polyline points="1 9 7 14 15 4" />
                            </svg>
                        </div>
                        {/* The Label */}
                        {data.description}
                    </Checkbox>
                ))}
            </div>
        </CheckboxGroup>
    );
}

export default CheckboxComponent;