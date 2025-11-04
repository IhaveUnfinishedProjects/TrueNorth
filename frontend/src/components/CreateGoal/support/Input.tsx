import "@root/index.css";
import { InputFieldData } from "./Data.js"
import type { ChangeEvent } from "react";

/* 
    Renders and returns the input fields for GoalCreation
*/
type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Input = <T extends Record<string, any>> ({ formValues, handleChange }: InputProps<T>) => {
    return (
        <>
                {InputFieldData.map((data, index) => (
                    <div key={index} className="flex-wrapper">
                        <h3>{data.h3}</h3>
                        <input 
                            {...data}
                            value={String(formValues[data.name])}
                            onChange={handleChange}
                        />
                    </div>
                ))}
        </>
    );
}

export default Input;