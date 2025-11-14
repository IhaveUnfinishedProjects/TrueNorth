import {Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Popover} from 'react-aria-components';
import { today } from '@internationalized/date'; 
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";

import "./CalendarComponent.css"

function CalendarComponent () {

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return(
        <DatePicker defaultValue={today(userTimeZone)}>
            <Group>
                <DateInput className="aria-Input">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button  className="aria-Button ml-[1rem]">
                    <MdEditCalendar size={20} />
                </Button>
            </Group>
            
            <Popover>
                <Dialog>
                    <Calendar>
                        <header>
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

export default CalendarComponent;