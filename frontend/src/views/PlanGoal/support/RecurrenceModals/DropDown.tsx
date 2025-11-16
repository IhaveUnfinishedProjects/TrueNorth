import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";
import "./DropDown.css"


export function DropDown () {

    /* Sets up the drop down options and assigns them keys beforehand */
    const defaultValue = "1";
    const dropDownNumbers = Array.from({ length: 99 }, (_, i) => i + 1);
    const numberToUuidMap = new Map<number, string>();
    for (const number of dropDownNumbers) {
        numberToUuidMap.set(number, crypto.randomUUID());
    }
    const defaultValuesKey = numberToUuidMap.get(1);

    return(
        <Select className="dropDownSelect" defaultValue={defaultValuesKey || 1} placeholder={defaultValue || "1"}>
            <Button className="dropDownButton">
                <SelectValue/>
                <span aria-hidden="true">
                    <FaChevronDown size={16} />
                </span>
            </Button>
            <Popover className="dropDownPopover">
                <ListBox className="max-h-[200px] overflow-y-auto">
                    {dropDownNumbers.map(num => 
                        <ListBoxItem key={numberToUuidMap.get(num)}>{num}</ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </Select>
    );
}

export default DropDown;