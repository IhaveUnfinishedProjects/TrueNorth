import {Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";
import { useMemo, type Key } from 'react';
import "./ComboBox.css"

interface DropDownProps {
    toDisplay: string[];
    defaultString: string;
    handleChange: (value: string | Key | null) => void;
    name: string;
}

/**
 * Uses a react-aria ComboBox that combines a text input with a drop down box.
 * @param toDisplay array for the drop down box.
 * @param defaultString deafault input box string
 */
export const ComboBoxComponent = ({toDisplay, defaultString, handleChange, name}: DropDownProps) => {

    const mapUuidNumbers = useMemo(() => {
        const map = new Map<string, string>();
        toDisplay.forEach(val => map.set(val, crypto.randomUUID()));
        return map;
    }, [toDisplay]);

    return(
        <ComboBox 
            name={name}
            className="dropDownSelect" 
            inputValue={ defaultString }
            onInputChange={handleChange}
            selectedKey={defaultString}
            onSelectionChange={handleChange}
            aria-label='Select an option'
        >
            <Label></Label>
            <div className="flex">
                <Input className="dropDownInput" placeholder={ defaultString }/>
                <Button className="dropDownInputButton">
                    <FaChevronDown size={16} />
                </Button>
            </div>
            <Popover className="dropDownPopover">
                <ListBox className="combobox-listbox">
                    {toDisplay.map(value => 
                        <ListBoxItem className="listBoxItem" key={mapUuidNumbers.get(value)}>{value}</ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </ComboBox>
    );
}

export default ComboBoxComponent;