import React, { useState } from 'react';
import "@root/index.css";
import ModalTemplate from './Modal.js';
import { type InputFormData, initialValues, backModalButtons } from "./Data.js"
import { useForm } from "@hooks/useFormData.js";

/* 
    Renders and returns the input fields for GoalCreation
*/

const Input = () => {

    /* 
        This section defines the input field input types & 
        stores them when they change.
    */

    // NOTE: MOVE TO TOP LEVEL COMPONENT
    const { formValues, handleChange, resetForm } = useForm(initialValues);

    /* 
        This section defines the types for which the <Input /> field
        takes, and stores an array of the fields the input fields will
        take so we can map them. 
    */ 

    type InputFieldData = {
        type: 'text'| 'date';
        name: keyof InputFormData;
        placeholder: string;
        required: boolean;
        h3: string;
    }

    const InputFieldData: InputFieldData[] = [
        {
            type: "text",
            name: "goalName",
            placeholder: "e.g., Job Promotion",
            required: true,
            h3: "Goal Name"
        },
        {
            type: "text",
            name: "desiredAchievement",
            placeholder: "e.g., Learn first aid",
            required: true,
            h3: "What do you want to achieve?"
        },
        {
            type: "text",
            name: "importance",
            placeholder: "e.g., I enjoy helping people",
            required: false,
            h3: "Why is this important to you?"
        },
        {
            type: "text",
            name: "measurement",
            placeholder: "e.g., Improve by 'x' amount weekly",
            required: false,
            h3: "How will you measure progress?"
        },
        {
            type: "date",
            name: "achievementDate",
            placeholder: "achievementDate",
            required: false,
            h3: "When do you want to achieve this by?"
        },
    ]

    /* 
        This section is dedicated to handling the form submission
    */

    const [isSubmitComponentOpen, setIsSubmitComponentOpen] = useState(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // API call to the backend the data
        console.log(formValues);

        // Recieve an id back from the backend
        const parentId: string = Date.now().toString();
        console.log("Recieved an id " + parentId);


        // clear the content for the input field states & assign parent id
        resetForm;

        console.log("Input values cleared: " + formValues, "\nparent:", formValues.parent);

        // Confirm the component was submitted 
        setIsSubmitComponentOpen(true);
        console.log("Form was submitted:", formValues);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">
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
                <button type = "submit" className="border-[1px] rounded-lg h-10 mb-10 text-white bg-[#3B82F6]">
                    + Create Goal
                </button>
            </form>
            {isSubmitComponentOpen && <ModalTemplate 
                header = "Create SubGoal?"
                paragraph= 'Is this a goal made of smaller goals (like "Launch a Company"), or can you list the steps right away?'
                buttons = {backModalButtons}
                onClose={() => setIsSubmitComponentOpen(false)}
            />}
        </>
    );
}

export default Input;