import { ComboBox, ModalWrapper, CalendarSelection, CheckboxComponent } from "@components/ui/index.js";
import { useSelectDate } from '@hooks/index.js';
import { MeridianEnum, OrdinalRadio, useCheckbox, DayOfWeek, type RecurrenceSchedule, type MeridianType } from '@features/index.js';
import {
    REPEATING_FREQUENCY,
    TIME_OPTIONS,
    REPEATING_INTERVALS,
    useComboBox,
    useOrdinalRadio
} from '@features/index.js';
import '@features/goals/components/Recurence/recurrence.css'

interface RepeatProps {
    submissionHandler: (recurrence: RecurrenceSchedule) => void;
    onRepeatClose: () => void;
    recurrence: RecurrenceSchedule | undefined;
}

/**
 * A popup modal to select how often a step should repeat during a goal.
 * * Allows Date based (the 11th of every 'x' month(s))
 * * Allows Positional based (the second Tuesday of every 'x' month(s)) 
 * @param submissionHandler - Callback to pass event data on submission
 * @param onRepeatClose - Callback to close the modal
 * @param recurrence - The recurrence data of the selected step (if it exists)
 */

export const StepRecurrenceModal = ({ submissionHandler, onRepeatClose, recurrence }: RepeatProps) =>  {

    /* Hooks for combo box handling */
    const fComboBox = useComboBox({ arr: REPEATING_FREQUENCY, defaultVal: recurrence?.frequency });
    const iComboBox = useComboBox({ arr: REPEATING_INTERVALS, defaultVal: recurrence?.interval });
    const tComboBox = useComboBox({ arr: TIME_OPTIONS, defaultVal: recurrence?.time });
    const mComboBox = useComboBox({ arr: MeridianEnum.options, defaultVal: recurrence?.meridian });

    /* Hooks for calendar selection handling */
    const { selectedDate, handleChange: onDateChange, currentDate } = useSelectDate({defaultVal: recurrence?.startDate});

    /* Hook for selecting days of the week */
    const { selectedBoxes: selectedDays, handleChange: onDayChange } = useCheckbox({defaultVal: recurrence?.selectedDays});
    const selectedDayOptions = DayOfWeek.map(day => ({id: day, description: day}));

    /* Hook for remembering the option between ordinal & date */
    const { ordinal, onOrdinalChange } = useOrdinalRadio({defaultVal: recurrence?.type});

    /* Acts as a condition to check against for opening ordinal & weekly view. */ 
    const interval = iComboBox.input;

    /**
     * Blocks enter from submitting the form
     * @param e key board press
     */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const localHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
             const meridian: MeridianType = MeridianEnum.parse(mComboBox.input);

            const recurrencePayload: RecurrenceSchedule = {
                startDate: selectedDate.toString(),
                interval: iComboBox.input,
                frequency: fComboBox.input,
                time: tComboBox.input,
                meridian: meridian,
                selectedDays: selectedDays,
                type: ordinal
            };

            submissionHandler(recurrencePayload);
            
        } catch (error) {
            console.error("Validation failed:", error);
            alert("Please fill out all required fields.");
        }
    };

    return (
        <ModalWrapper>

            {/* Lets the user select how often their goal step occurs */}
            <form 
                className="recurrenceForm"
                onSubmit={localHandler}
                onKeyDown={handleKeyDown}
            >
                <h1 className="ml-auto mr-auto">Add Repeats</h1>

                {/* Displays the recurrence start date & allows reselection */}
                <div className="recurrenceGroup">
                    <h3>Start</h3>
                    <div className="recurrenceRows">
                        <CalendarSelection 
                            selectedDate={selectedDate}
                            onDateChange={onDateChange}
                            currentDate={currentDate}
                            name="startDate"
                        />
                    </div>

                    <h3>Repeat every</h3>
                    <div className="recurrenceRows">
                        {/* Allows selection to repeat every x days/weeks/months */}
                        <ComboBox 
                            name="interval"
                            options={fComboBox.options}
                            input={fComboBox.input}
                            selectKey={fComboBox.selectKey}
                            onChangeInput={fComboBox.onChangeInput}
                            onChangeKey={fComboBox.onChangeKey}
                        />
                        <ComboBox 
                            name="frquency"
                            options={iComboBox.options}
                            input={iComboBox.input}
                            selectKey={iComboBox.selectKey}
                            onChangeInput={iComboBox.onChangeInput}
                            onChangeKey={iComboBox.onChangeKey}
                        />
                    </div>
                </div>
                
                {/* Allows the selection of ordinal or date for months & years */}
                {(interval === "Years" || interval === "Months") && 
                    <div className="recurrenceGroup">
                        <OrdinalRadio ordinalChoice={ordinal} onChange={onOrdinalChange} interval={interval} selectedDate={selectedDate} name="type"/>
                    </div>
                }   

                {/* Allows the selection of days within a week */}
                {interval === "Weeks" && 
                    <div className="recurrenceGroup">
                        <CheckboxComponent curSelected={selectedDays} onChange={onDayChange} options={selectedDayOptions} name="recurrence-checkbox" label="Repeat on days"/>
                    </div>
                }                

                {/* Allows selecting an OPTIONAL time (am/pm) & (1-12) */}
                <div className="recurrenceGroup">
                    <h3>Select time</h3>
                    <div className="recurrenceRows">
                        <ComboBox 
                            name="time"
                            options={tComboBox.options}
                            input={tComboBox.input}
                            selectKey={tComboBox.selectKey}
                            onChangeInput={tComboBox.onChangeInput}
                            onChangeKey={tComboBox.onChangeKey}
                        />                        
                        <ComboBox 
                            name="meridian"
                            options={mComboBox.options}
                            input={mComboBox.input}
                            selectKey={mComboBox.selectKey}
                            onChangeInput={mComboBox.onChangeInput}
                            onChangeKey={mComboBox.onChangeKey}
                        />                        
                    </div>
                </div>

                <div className="recurrenceSubmitButtons">
                    <button type="button" className="recurrenceSubmitButton" onClick={onRepeatClose}>Back</button>
                    <button type="submit" className="recurrenceSubmitButton">Save</button>
                </div>
            </form>
        </ModalWrapper>
    );
}

export default StepRecurrenceModal;