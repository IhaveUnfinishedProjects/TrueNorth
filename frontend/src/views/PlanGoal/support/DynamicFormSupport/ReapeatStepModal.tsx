import ModalWrapper from "@components/Modal/ModalWrapper.js"
import "../support.css";

interface RepeatProps {
    days: string[];
    checkIsSelected: (value: string) => boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RepeatStepModal: React.FC<RepeatProps> = ({ days, checkIsSelected, handleChange }) =>  {

    return (
        <ModalWrapper>
            <form>
                {days.map((data, index) => {
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
            </form>
        </ModalWrapper>
    );
}

export default RepeatStepModal;