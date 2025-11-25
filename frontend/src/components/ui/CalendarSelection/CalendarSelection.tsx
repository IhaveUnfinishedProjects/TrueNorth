import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Popover} from 'react-aria-components';
import type { CalendarDate, DateValue } from '@internationalized/date'; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";
import "./CalendarSelection.css"

interface CalendarProps {
    selectedDate: DateValue;
    onDateChange: (value: DateValue | null) => void;
    currentDateString: CalendarDate;
}

/**
 * React-aria DatePicker that combines a text input with a popover
 * calendar grid to select from. 
 * * Wraps the aria-component allowing for custom styling
 * * uses default local time zones. 
 */
function CalendarSelection ({ selectedDate, onDateChange, currentDateString } : CalendarProps) {
    
    return(
        <DatePicker 
            defaultValue={selectedDate} 
            name={crypto.randomUUID()}
            aria-label='Select a date'
            onChange={onDateChange}
            minValue={currentDateString}
        >
            <Group aria-label='Select a date'>
                <DateInput className="aria-Input">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button  className="aria-Button aria-Calendar-Button">
                    <MdEditCalendar size={20} />
                </Button>
            </Group>
            
            <Popover>
                <Dialog>
                    <Calendar>
                        <header className="calendarHeader">
                            <Button className="aria-Button" slot="previous">
                                <FaChevronLeft size={20} />
                            </Button>
                            <Heading />
                            <Button  className="aria-Button"slot="next">
                                <FaChevronRight size={20} />
                            </Button>
                        </header>
                        <div className="flex flex-row justify-center">
                            <CalendarGrid className="CalendarGrid">
                                {(date) => <CalendarCell className="CalendarCell" date={date} />}
                            </CalendarGrid>
                        </div>
                    </Calendar>
                </Dialog>
            </Popover>
        </DatePicker>
    );
}

export default CalendarSelection;