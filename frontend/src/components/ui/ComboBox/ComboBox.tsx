import {Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";
import { type Key } from 'react';
import "./ComboBox.css"

interface DropDownProps {
    name: string;
    options: Map<Key, string>;
    input: string;
    selectKey: Key | null;
    onChangeInput: (value: string) => void;
    onChangeKey: (key: Key | null) => void;
}

/**
 * Uses a react-aria ComboBox that combines a text input with a drop down box.
 * @param toDisplay array for the drop down box.
 * @param defaultString deafault input box string
 */
export const ComboBoxComponent =({ name, options, input, selectKey, onChangeInput, onChangeKey }: DropDownProps) => {

    return(
        <ComboBox 
            name={name}
            className="dropDownSelect" 
            inputValue={input} 
            onInputChange={onChangeInput}
            selectedKey={selectKey ? selectKey.toString() : null}
            onSelectionChange={onChangeKey}
            aria-label='Select an option'
        >
            <div className="flex">
                <Input className="dropDownInput" placeholder={input}/>
                <Button className="dropDownInputButton">
                    <FaChevronDown size={16} />
                </Button>
            </div>
            <Popover className="dropDownPopover">
                <ListBox className="combobox-listbox">
                    {[...options.entries()].map(([data, value]) => 
                        <ListBoxItem className='listBoxItem' key={data} id={data.toString()}>{value}</ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </ComboBox>
    );
}

export default ComboBoxComponent;