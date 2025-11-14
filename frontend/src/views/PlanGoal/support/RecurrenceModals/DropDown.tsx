import {Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import { FaChevronDown } from "react-icons/fa";


export function DropDown () {
    const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
    return(
        <Select>
            <Label></Label>
            <Button>
                <SelectValue />
                <span aria-hidden="true">
                <FaChevronDown size={16} />
                </span>
            </Button>
            <Popover>
                <ListBox>
                    {numbers.map(num => 
                        <ListBoxItem key={crypto.randomUUID()}>{num}</ListBoxItem>
                    )}
                </ListBox>
            </Popover>
        </Select>
    );
}

export default DropDown;