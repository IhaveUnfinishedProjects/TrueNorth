import "@root/index.css";
import type { ChangeEvent } from "react";
import { type InputFieldConfig } from "@root/types/inputTag.js";

/* 
    Renders and returns the input fields for GoalCreation
*/
type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    InputFieldData: InputFieldConfig<T>[];
};

const Input = <T extends Record<string, any>> ({ formValues, handleChange, InputFieldData }: InputProps<T>) => {
    return (
        <>
                {InputFieldData.map((data) => {
                    const { name, ...inputProps } = data;
                    return(
                    <div key={data.toString()} className="flex-wrapper">
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