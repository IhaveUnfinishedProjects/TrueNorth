import type { ChangeEvent } from "react";
import { type InputFieldConfig } from "@root/types/InputTag.js";

type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    InputFieldData: InputFieldConfig<T>[];
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = <T extends Record<string, string>> ({ formValues, handleChange, InputFieldData, handleSubmit }: InputProps<T>) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                {InputFieldData.map((data, index) => {
                    const { name, ...inputProps } = data;
                    return(
                    <div key={index} className="flex-wrapper">
                        <h3>{data.h3}</h3>
                        <input 
                            className="mb-[3rem]"
                            {...data}
                            name = {name.toString()}
                            value={String(formValues[data.name])}
                            onChange={handleChange}
                        />
                    </div>
                )})}
                <button type = "submit" className="formButton">
                    + Create Goal
                </button>
            </form>
        </>
    );
}

export default Form;