import type { ChangeEvent } from "react";
import { type InputFieldConfig } from "@root/types/InputTag.js";

/* 
    Renders and returns the input fields for GoalCreation
*/

/*
    PLEASE NOTE: 
    This file is unused & being kept for now just in case. 
    Will be deleted soon. 
*/

type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    InputFieldData: InputFieldConfig<T>[];
};

const Input = <T extends Record<string, any>> ({ formValues, handleChange, InputFieldData }: InputProps<T>) => {
    return (
        <>
                {InputFieldData.map((data, index) => {
                    const { name, ...inputProps } = data;
                    return(
                    <div key={index} className="flex-wrapper">
                        <h3>{data.h3}</h3>
                        <input 
                            {...data}
                            name = {name.toString()}
                            value={String(formValues[data.name])}
                            onChange={handleChange}
                        />
                    </div>
                )})}
        </>
    );
}

export default Input;