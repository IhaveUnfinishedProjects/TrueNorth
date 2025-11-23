import CalendarComponent from "./CalendarComponent.js";
import { ComboBox, ModalWrapper } from "@components/ui/index.js";
import { dropDownNums, defaultDropDownNum, defaultDropDownFrequency, defaultMeridian, defaultTime, timeIntervals, meridian, DROP_DOWN_FREQUENCIES } from '@features/goals/index.js'
import "@root/index.css";

interface RepeatProps {
    onRepeatClose: () => void;
    selectedDate: string;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A popup modal to select how often a step should repeat during a goal.
 * * Allows Date based (the 11th of every 'x' month(s))
 * * Allows Positional based (the second Tuesday of every 'x' month(s)) 
 * @param onRepeatClose - Call back to close the modal
 *  
 */
export const StepRecurrenceModal = ({ onRepeatClose, selectedDate, handleDateChange }: RepeatProps) =>  {

    return (
        <ModalWrapper>

            {/* Lets the user select how often their goal step occurs */}
            <form className="recurrenceForm">

                {/* Displays the recurrence start date & allows reselection */}
                <div className="recurrenceRows">
                    <p>Start</p>
                    <CalendarComponent/>
                </div>

                {/* Allows selection to repeat every x days/weeks/months */}
                <div className="recurrenceRows">
                    <p>Repeat every</p>
                    <ComboBox toDisplay={dropDownNums} defaultString={defaultDropDownNum} />
                    <ComboBox toDisplay={DROP_DOWN_FREQUENCIES} defaultString={defaultDropDownFrequency} />
                </div>

                {/* Allows selecting an OPTIONAL time (am/pm) & (1-12) */}
                <div className="recurrenceRows">
                    <p>Select time</p>
                    <ComboBox toDisplay={timeIntervals} defaultString={defaultTime} />
                    <ComboBox toDisplay={meridian} defaultString={defaultMeridian} />
                </div>
            </form>

            <button onClick={onRepeatClose}>Back</button>
        </ModalWrapper>
    );
}

export default StepRecurrenceModal;