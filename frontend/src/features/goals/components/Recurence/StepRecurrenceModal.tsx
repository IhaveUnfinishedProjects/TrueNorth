import { ComboBox, ModalWrapper, CalendarSelection, CheckboxComponent } from "@components/ui/index.js";
import { useSelectDate } from '@hooks/index.js';
import { OrdinalRadio, useCheckbox, DayOfWeek } from '@features/goals/index.js';
import {
    REPEATING_FREQUENCY,
    TIME_OPTIONS,
    MERIDIAN_OPTIONS,
    REPEATING_INTERVALS,
    useComboBox
} from '@features/goals/index.js';
import '@features/goals/components/Recurence/recurrence.css'


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

    /* Hooks for combo box handling */
    const { selected: frequency, handleChange: setFrequency } = useComboBox({ arr: REPEATING_FREQUENCY });
    const { selected: interval, handleChange: setInterval }   = useComboBox({ arr: REPEATING_INTERVALS });
    const { selected: time, handleChange: setTime }           = useComboBox({ arr: TIME_OPTIONS });
    const { selected: period, handleChange: setPeriod }       = useComboBox({ arr: MERIDIAN_OPTIONS });

    /* Hooks for calendar selection handling */
    const { selectedDate, handleChange: onDateChange, currentDateString } = useSelectDate();

    /* Hook for selecting days of the week */
    const { selectedBoxes: selectedDays, handleChange: onDayChange } = useCheckbox();
    const displayOrdinalRadio = interval === "Years" || interval === "Months";
    const displayWeeklyRadio = interval === "Weeks";

    return (
        <ModalWrapper>

            {/* Lets the user select how often their goal step occurs */}
            <form className="recurrenceForm">
                <h1 className="ml-auto mr-auto">Add Repeats</h1>

                {/* Displays the recurrence start date & allows reselection */}
                <div className="recurrenceGroup">
                    <h3>Start</h3>
                    <div className="recurrenceRows">
                        <CalendarSelection 
                            selectedDate={selectedDate}
                            onDateChange={onDateChange}
                            currentDateString={currentDateString}
                        />
                    </div>

                    <h3>Repeat every</h3>
                    <div className="recurrenceRows">
                        {/* Allows selection to repeat every x days/weeks/months */}
                        <ComboBox toDisplay={REPEATING_FREQUENCY} defaultString={frequency} handleChange={setFrequency}/>
                        <ComboBox toDisplay={REPEATING_INTERVALS} defaultString={interval} handleChange={setInterval}/>
                    </div>
                </div>
                
                {/* Allows the selection of ordinal or date for months & years */}
                {displayOrdinalRadio && 
                    <div className="recurrenceGroup">
                        <OrdinalRadio interval={interval} selectedDate={selectedDate}/>
                    </div>
                }   

                {/* Allows the selection of days within a week */}
                {displayWeeklyRadio && 
                    <div className="recurrenceGroup">
                        <CheckboxComponent curSelected={selectedDays} onChange={onDayChange} options={DayOfWeek}/>
                    </div>
                }                

                {/* Allows selecting an OPTIONAL time (am/pm) & (1-12) */}
                <div className="recurrenceGroup">
                    <h3>Select time</h3>
                    <div className="recurrenceRows">
                        <ComboBox toDisplay={TIME_OPTIONS} defaultString={time} handleChange={setTime}/>
                        <ComboBox toDisplay={MERIDIAN_OPTIONS} defaultString={period} handleChange={setPeriod}/>
                    </div>
                </div>

                <div className="recurrenceSubmitButtons">
                    <button type="button" className="recurrenceSubmitButton" onClick={onRepeatClose}>Back</button>
                    <button type="button" className="recurrenceSubmitButton" onClick={onRepeatClose}>Save</button>
                </div>
            </form>
        </ModalWrapper>
    );
}

export default StepRecurrenceModal;