import CalendarComponent from "./CalendarComponent.js";
import { ComboBox, ModalWrapper } from "@components/ui/index.js";
import { dropDownNums, defaultDropDownNum, defaultDropDownFrequency, defaultMeridian, defaultTime, timeIntervals, meridian, DROP_DOWN_FREQUENCIES } from '@features/goals/index.js'
import "@root/index.css";
//import "../support.css";

interface RepeatProps {
    onRepeatClose: () => void;
    selectedDate: string;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StepRecurrenceModal: React.FC<RepeatProps> = ({ onRepeatClose, selectedDate, handleDateChange }) =>  {

    return (
        <ModalWrapper>

            {/* This form lets the user select how often their step occurs */}
            <form className="recurrenceForm">

                {/* Contains the start date option & calendar widget */}
                <div className="recurrenceRows">
                    <p>Start</p>
                    <CalendarComponent/>
                </div>

                {/* Contains the repeat every x days/weeks/months */}
                <div className="recurrenceRows">
                    <p>Repeat every</p>
                    <ComboBox toDisplay={dropDownNums} defaultString={defaultDropDownNum} />
                    <ComboBox toDisplay={DROP_DOWN_FREQUENCIES} defaultString={defaultDropDownFrequency} />
                </div>

                {/* Allows the user to select an OPTIONAL time */}
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