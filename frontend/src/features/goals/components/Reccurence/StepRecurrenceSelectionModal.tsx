import ModalWrapper from "@root/components/ui/Modal/ModalWrapper.js"
import "@root/index.css";
import "../support.css";
import CalendarComponent from "./CalendarComponent.js";
import ComboBox from "@root/components/ui/ComboBox/ComboBox.js";
import { dropDownNums, defaultDropDownNum, dropDownFrequencies, defaultDropDownFrequency, timeIntervals, meridian, defaultMeridian, defaultTime } from "../../../../features/goals/types/Constants.js";

interface RepeatProps {
    onRepeatClose: () => void;
    selectedDate: string;
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RepeatStepModal: React.FC<RepeatProps> = ({ onRepeatClose, selectedDate, handleDateChange }) =>  {

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
                    <ComboBox toDisplay={dropDownFrequencies} defaultString={defaultDropDownFrequency} />
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

export default RepeatStepModal;