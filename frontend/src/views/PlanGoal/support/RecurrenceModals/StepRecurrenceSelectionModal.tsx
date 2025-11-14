import ModalWrapper from "@components/Modal/ModalWrapper.js"
import "@root/index.css";
import "../support.css";
import CalendarComponent from "./CalendarComponent.js";
import DropDown from "./DropDown.js";

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
                    <DropDown />
                </div>

                {/* Allows the user to select an OPTIONAL time */}
                <div className="recurrenceRows">
                    <p>Select time</p>
                </div>
            </form>

            <button onClick={onRepeatClose}>Back</button>
        </ModalWrapper>
    );
}

export default RepeatStepModal;