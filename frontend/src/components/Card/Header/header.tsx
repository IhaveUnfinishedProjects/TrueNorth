import BackButton from '@assets/backButton.svg?react';

interface CardHeaderProps {
    onBackOpen: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ onBackOpen }) => {
    return (
        <div className="flex flex-row my-5 w-[100%]">
    
            <button onClick={onBackOpen} 
                className="flex items-center justify-center bg-white rounded-full h-8 w-8"> 
                <BackButton /> 
            </button>

            <h2 className="mx-auto">Create New Goal</h2>
            <div style={{ width: '24px' }} className="flex-shrink-0 invisible"> {/*This div acts as a right hand spacer*/} </div>
        </div>
    );
}

export default CardHeader;