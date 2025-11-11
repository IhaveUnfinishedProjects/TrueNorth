import ModalWrapper from "@components/Modal/ModalWrapper.js"
import "../support.css";

interface RepeatProps {
    stepFrequency: string[];
    checkIsSelected: (value: string) => boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRepeatClose: () =>void;
}

export const RepeatStepModal: React.FC<RepeatProps> = ({ stepFrequency, checkIsSelected, handleChange, onRepeatClose }) =>  {

    return (
        <ModalWrapper>
            <form className="pt-[1rem]">

                {/* Disaplys the radio inputs with text for selection */}
                {stepFrequency.map((data, index) => {
                    return (
                        <label key={crypto.randomUUID()} className="radioLabel">
                            <span>{data}</span>
                            <input
                                type="radio"
                                value={data}
                                name="RepeatSelection"
                                checked={checkIsSelected(data)}
                                onChange={handleChange}
                                className="w-[1rem]"
                            />
                        </label>
                    )
                })}

                {/* Display the cancel & confirm form buttons */}
                <div className="flex flex-row justify-between">
                    <button className="stepFrequencyModalButton" onClick={onRepeatClose}>
                        Cancel
                    </button>

                    <button className="stepFrequencyModalButton">
                        Next
                    </button>
                </div>

            </form>
        </ModalWrapper>
    );
}

export default RepeatStepModal;