import {Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";
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
export const DropDown =({toDisplay, defaultString}: DropDownProps) => {

    const mapUuidNumbers = new Map<string, string>();
    for (const displayVal of toDisplay ){
        mapUuidNumbers.set(displayVal, crypto.randomUUID());
    }

    const defaultUuid = mapUuidNumbers.get(defaultString);

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

export default DropDown;