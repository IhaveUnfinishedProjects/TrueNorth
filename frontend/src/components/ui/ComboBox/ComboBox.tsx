import {Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";
import { useMemo } from 'react';
import "./DropDown.css"

interface DropDownProps {
    toDisplay: string[];
    defaultString: string;
}

/*
    args:
        toDisplay: string[] --> Provides the options to display in the selection as strings.

        defaultString: contains the value of the default selection, which will act as a key
        for finding it's uuid. 
*/ 

/**
 * Uses a react-aria ComboBox that combines a text input with a drop down box.
 * @param toDisplay array for the drop down box.
 * @param defaultString deafault input box string
 */
export const ComboBoxComponent =({toDisplay, defaultString}: DropDownProps) => {

    const mapUuidNumbers = useMemo(() => {
        const map = new Map<string, string>();
        toDisplay.forEach(val => map.set(val, crypto.randomUUID()));
        return map;
    }, [toDisplay]);

    return(
        <ComboBox 
            className="dropDownSelect" 
            defaultInputValue={ defaultString } 
            name={crypto.randomUUID()}
            aria-label='Select an option'
        >
            <Label></Label>
            <div className="flex">
                <Input className="dropDownInput" placeholder={ defaultString }/>
                <Button>
                    <FaChevronDown size={16} />
                </Button>
            </div>
            <Popover className="dropDownPopover">
                <ListBox className="max-h-[200px] overflow-y-auto">
                    {toDisplay.map(value => 
                        <ListBoxItem key={mapUuidNumbers.get(value)}>{value}</ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </ComboBox>
    );
}

export default ComboBoxComponent;