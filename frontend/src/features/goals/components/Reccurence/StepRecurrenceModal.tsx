import CalendarSelection from "./CalendarSelection.js";
import { ComboBox, ModalWrapper } from "@components/ui/index.js";
import { useSelectDate } from '@hooks/useSelectDate.js';
import {
    REPEATING_FREQUENCY,
    TIME_OPTIONS,
    MERIDIAN_OPTIONS,
    REPEATING_INTERVALS,
    useComboBox
} from '@features/goals/index.js';
import "@root/index.css";

interface RepeatProps {
    onRepeatClose: () => void;
}

/**
 * A popup modal to select how often a step should repeat during a goal.
 * * Allows Date based (the 11th of every 'x' month(s))
 * * Allows Positional based (the second Tuesday of every 'x' month(s)) 
 * @param onRepeatClose - Callback to close the modal
 * @param selectedDate - Displays the current selected date (DateValue)
 * @param onDateChange - onChange handler for the selected date
 */

export const StepRecurrenceModal = ({ onRepeatClose }: RepeatProps) =>  {

    const {selected: frequency, handleChange: setFrequency } = useComboBox({ arr: REPEATING_FREQUENCY });
    const {selected: interval, handleChange: setInterval } = useComboBox({ arr: REPEATING_INTERVALS });
    const {selected: time, handleChange: setTime } = useComboBox({ arr: TIME_OPTIONS });
    const { selected: period, handleChange: setPeriod } = useComboBox({ arr: MERIDIAN_OPTIONS });
    const { selectedDate, handleChange: onDateChange } = useSelectDate();

    return (
        <ModalWrapper>

            {/* Lets the user select how often their goal step occurs */}
            <form className="recurrenceForm">

                {/* Displays the recurrence start date & allows reselection */}
                <div className="recurrenceRows">
                    <p>Start</p>
                    <CalendarSelection 
                        selectedDate={selectedDate}
                        onDateChange={onDateChange}
                    />
                </div>

                {/* Allows selection to repeat every x days/weeks/months */}
                <div className="recurrenceRows">
                    <p>Repeat every</p>
                    <ComboBox toDisplay={REPEATING_FREQUENCY} defaultString={frequency} handleChange={setFrequency}/>
                    <ComboBox toDisplay={REPEATING_INTERVALS} defaultString={interval} handleChange={setInterval}/>
                </div>

                {/* Allows selecting an OPTIONAL time (am/pm) & (1-12) */}
                <div className="recurrenceRows">
                    <p>Select time</p>
                    <ComboBox toDisplay={TIME_OPTIONS} defaultString={time} handleChange={setTime}/>
                    <ComboBox toDisplay={MERIDIAN_OPTIONS} defaultString={period} handleChange={setPeriod}/>
                </div>
                
            </form>

            <button onClick={onRepeatClose}>Back</button>
        </ModalWrapper>
    );
}

export default StepRecurrenceModal;