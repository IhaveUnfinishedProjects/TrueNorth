
import Input from "./Input.js";
import type { ChangeEvent } from "react";
import { type InputFieldConfig } from "@root/types/InputTag.js";

type InputProps<T> = {
    formValues: T;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    InputFieldData: InputFieldConfig<T>[];
    handleSubmit: (event: React.FormEvent) => void;
};

export const Form = <T extends Record<string, any>> ({ formValues, handleChange, InputFieldData, handleSubmit }: InputProps<T>) => {
    return (
        <div className = "w-[95%]">
            <form onSubmit={handleSubmit} className="flex flex-col">
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
                <button type = "submit" className="border-[1px] rounded-lg h-10 mb-10 text-white bg-[#3B82F6]">
                    + Create Goal
                </button>
            </form>
        </div>
    );
}

export default Form;