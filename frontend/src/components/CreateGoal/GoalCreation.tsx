import { useState } from 'react';
import "@root/index.css";
import BackButton from '@assets/backButton.svg?react';
import InputField from './support/InputField.js';
import ConfirmationComponent from './support/ConfirmationComponent.js';

/*
    This function is responsible for rendering the new goal creation component.
    It uses <InputField /> to display the text boxes for the user to type, and 
    manages a back button / back button modal with <ConfirmationComponent />
*/

const GoalCreation = () => {

    // A hook to display / hide the ConfirmationComponent for returning to home page.
    const [isBackComponentOpen, setIsBackComponentOpen] = useState(false);
    const backButtonClicked = () => {
        setIsBackComponentOpen(true);
    }

    return (
        <div 
            className = {`
                flex 
                flex-col 
                justify-around
                w-1/2
                h-200
                mx-auto 
                px-5
                items-center 
                bg-[#D9D9D9]
                border-2 
                rounded-2xl
            `}
        >   
            {/* Contains header & back button */}
            <div className="flex flex-row my-5 w-[100%]">
                
                <button onClick={backButtonClicked} 
                    className="flex items-center justify-center bg-white rounded-full h-8 w-8"> 
                    <BackButton /> 
                </button>

                <h2 className="mx-auto">Create New Goal</h2>
                <div style={{ width: '24px' }} className="flex-shrink-0 invisible"> {/*This div acts as a right hand spacer*/} </div>
            </div>
            
            {/* Contains the input fields*/}
            <div className = "w-[95%]">
                <InputField />
            </div>

            { isBackComponentOpen && <ConfirmationComponent onClose={() => setIsBackComponentOpen(false)} />}
        </div>

    );
}

export default GoalCreation;