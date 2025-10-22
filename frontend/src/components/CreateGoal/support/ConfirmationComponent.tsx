import { Link } from "react-router";
import ReactDOM, { createPortal } from 'react-dom';
interface ConfirmationProps {
    onClose: () => void;
}

const OVERLAY_STYLES: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
}

const CONFIRMATION_STYLE: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#FFFFFF",
    borderRadius: '10px',
    height: 200,
    width: 500,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
}

const BUTTON_DIV_STYLES: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
}

const BUTTON_STYLE: React.CSSProperties = {
    border: 'solid',
    padding: '10px',
    borderRadius: '10px',
    width: '200px',
    backgroundColor: '#3B82F6',
    color: 'white'
}

const ConfirmationComponent: React.FC<ConfirmationProps> = ({ onClose }) => {
    return ReactDOM.createPortal (
        <>
            <div style={OVERLAY_STYLES}></div>

            <div style={CONFIRMATION_STYLE}>
                
                <h1 className="text-[#3B82F6]">Go back?</h1>

                <div style={BUTTON_DIV_STYLES}>
                    <Link to="/">
                        <button style={BUTTON_STYLE} onClick={() => onClose()}>
                            Yes
                        </button>
                    </Link>
                    <button style={BUTTON_STYLE} onClick={() => onClose()}>
                        No
                    </button>
                </div>

            </div> 
        </>,
        document.getElementById('root')!
    );
}

export default ConfirmationComponent;