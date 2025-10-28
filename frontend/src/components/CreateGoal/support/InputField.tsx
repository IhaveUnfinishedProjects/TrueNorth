import React, { useState } from 'react';
import "@root/index.css";

/* 
    Renders and returns the input fields for GoalCreation
*/

const InputField = () => {

    /* 
        This section defines the input field input types & 
        stores them when they change. Additionally handles the
        submit 
    */

    type InputValues = {
        goalName: string,
        desiredAchievement: string,
        importance: string,
        measurement: string,
        achievementDate: Date
    }

    const [inputValues, setInputValues] = useState({
        goalName:'',
        desiredAchievement:'',
        importance:'',
        measurement:'',
        achievementDate:''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // event.target.value is the text currently in the input box
        const { name, value } = event.target;

        setInputValues(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Form was submitted:", inputValues);
    }

    /* 
        This section defines the types for which the <Input /> field
        takes, and stores an array of the fields the input fields will
        take so we can map them. 
    */ 

    type InputFieldData = {
        type: 'text'| 'date';
        name: keyof InputValues;
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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            {InputFieldData.map((data) => (
                <>
                    <h3>{data.h3}</h3>
                    <input 
                        key={data.name}
                        {...data}
                        value={String(inputValues[data.name])}
                        onChange={handleChange}
                    />
                </>
            ))}
            <button type = "submit" className="border-[1px] rounded-lg h-10 mb-10 text-white bg-[#3B82F6]">
                + Create Goal
            </button>
        </form>
    );
}

export default InputField;