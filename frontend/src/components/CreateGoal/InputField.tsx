import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import "../../index.css";


const InputField = () => {

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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">

            <h3>Goal Name</h3>
            <input
                type="text"
                name="goalName"
                value={inputValues.goalName}
                onChange={handleChange}
                placeholder="e.g., Job Promotion"
                required
            />

            <h3>What do you want to achieve?</h3>
            <input
                type="text"
                name="desiredAchievement"
                value={inputValues.desiredAchievement}
                onChange={handleChange}
                placeholder="e.g., Learn first aid"
                required
            />

            <h3>Why is this important to you?</h3>
            <input
                type="text"
                name="importance"
                value={inputValues.importance}
                onChange={handleChange}
                placeholder="e.g., I enjoy helping people"
            />

            <h3>How will you measure progress?</h3>
            <input
                type="text"
                name="measurement"
                value={inputValues.measurement}
                onChange={handleChange}
                placeholder="e.g., Improve by 'x' amount weekly"
            />

            <h3>When do you want to achieve this by?</h3>
            <input
                type="date"
                name="achievementDate"
                value={inputValues.achievementDate}
                onChange={handleChange}
                placeholder="achievementDate"
            />

            <button type = "submit" className="border-[1px] rounded-lg h-10 mb-10 text-white bg-[#3B82F6]">
                + Create Goal
            </button>
        </form>
    );
}

export default InputField;