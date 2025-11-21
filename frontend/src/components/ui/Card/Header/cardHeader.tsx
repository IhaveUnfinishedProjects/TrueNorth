import BackButton from '@assets/backButton.svg?react';
import '../card.css';

interface CardHeaderProps {
    onBackOpen: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ onBackOpen }) => {
    return (
        <div className="cardHeader">
    
            <button onClick={onBackOpen} 
                className="backButton"
            > 
                <BackButton /> 
            </button>

            <h2 className="mx-auto">Create New Goal</h2>
            <div style={{ width: '24px' }} className="flex-shrink-0 invisible"> {/*This div acts as a right hand spacer*/} </div>
        </div>
    );
}

export default CardHeader;