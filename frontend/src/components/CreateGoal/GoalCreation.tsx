import '../../index.css';
import BackButton from '../../assets/backButton.svg?react';
import InputField from './support/InputField.js';
import ConfirmationComponent from './support/ConfirmationComponent.js';
import { useState } from 'react';

const GoalCreation = () => {

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

            <div className="flex flex-row my-5 w-10/10 pl-0">
                {/* Contains header & back button */}
                
                <button onClick={backButtonClicked} className="flex items-center justify-center bg-white rounded-full h-8 w-8">
                    <BackButton className="" />
                </button>

                <h2 className="mx-auto">Create New Goal</h2>

                <div style={{ width: '24px' }} className="flex-shrink-0 invisible">
                    {/*This div is a spacer*/}
                </div>

            </div>

            <div className = "w-[95%]">
                <InputField />
            </div>

            { isBackComponentOpen && <ConfirmationComponent onClose={() => setIsBackComponentOpen(false)} />}
        </div>

    );
}

export default GoalCreation;