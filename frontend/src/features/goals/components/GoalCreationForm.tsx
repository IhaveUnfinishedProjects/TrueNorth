import type { ChangeEvent } from "react";
import { type InputFieldConfig } from "@root/library/types/InputTag.js";

type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    InputFieldData: InputFieldConfig<T>[];
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleFocus: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const Form = <T extends Record<string, string>> ({ formValues, handleChange, InputFieldData, handleSubmit, handleFocus }: InputProps<T>) => {

    const today = new Date();
    const getLocalDate = () => {
        const offset = today.getTimezoneOffset();
        const localToday = new Date(today.getTime() - (offset * 60 * 1000));
        return localToday.toISOString().split('T')[0];
    };

    const localToday = getLocalDate();
    const maxDate = new Date(
        today.getFullYear() + 10, 
        today.getMonth(), 
        today.getDate()
    ).toISOString().split('T')[0];

    return (
        <>
            <form onSubmit={handleSubmit}>
                {InputFieldData.map((data, index) => {
                    const { name, warningMessage, ...inputProps } = data;
                    const currentValue = String(formValues[data.name] || '');
                    const isAtLimit = data.maxLength && currentValue.length >= data.maxLength;

                    return(
                        <div key={index} className="flex-wrapper">
                            <h3>{data.h3}</h3>
                            <input 
                                className="mb-[0.5rem]"
                                {...inputProps}
                                name = {name.toString()}
                                value={currentValue}
                                onChange={handleChange}
                                onBlur={handleFocus}
                                maxLength={data.maxLength}
                            />
                            {isAtLimit && warningMessage && (
                                <span className="text-red-500 text-sm mb-[2.5rem] block">
                                    {warningMessage}
                                </span>
                            )}
                            {(!isAtLimit || !warningMessage) && <div className="mb-[3rem]"></div>}
                        </div>
                    )
                })}
                <button type = "submit" className="formButton">
                    + Create Goal
                </button>
            </form>
        </>
    );
}

export default Form;