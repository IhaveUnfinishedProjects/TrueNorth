import { CheckboxGroup, Checkbox, Label } from 'react-aria-components';
import "./Checkbox.css";

interface RecurrenceCheckboxProps {
    /** The list of currently selected values */
    curSelected: string[];
    /** Handler called when selection changes, returning a new list of values */
    onChange: (values: string[] | null) => void;
    /** The options to display */
    options: string[];
    name: string;
}

export const CheckboxComponent = ({ curSelected, onChange, options, name }: RecurrenceCheckboxProps) => {
    return (
        <CheckboxGroup 
            value={curSelected} 
            onChange={onChange} 
            className="react-aria-Checkbox"
            name={name}
        >
            <Label className="checkbox-group-label">Repeat on days</Label>
            
            <div className="checkbox-grid">
                {options.map((data) => (
                    <Checkbox key={data} value={data} className="checkbox-option">
                        {/* The Visual Box */}
                        <div className="checkbox-box">
                            <svg viewBox="0 0 18 18" aria-hidden="true">
                                <polyline points="1 9 7 14 15 4" />
                            </svg>
                        </div>
                        {/* The Label */}
                        {data}
                    </Checkbox>
                ))}
            </div>
        </CheckboxGroup>
    );
}

export default CheckboxComponent;