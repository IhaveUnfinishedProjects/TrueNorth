import React from "react";
import ReactDOM, { createPortal } from 'react-dom';
import { Link } from "react-router";
import "@root/index.css";

interface ButtonProps {
    text: string;
    route?: string;
}

interface ModalProps {
    header: string;
    paragraph?: string;
    buttons: ButtonProps[];
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
    display: 'inline-block',
    textAlign: 'center',
    border: 'solid',
    padding: '10px',
    borderRadius: '10px',
    width: '200px',
    backgroundColor: '#3B82F6',
    color: 'white',
}

const SubmitModal:React.FC<ModalProps> = ({ header, paragraph, buttons, onClose }) => {
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={CONFIRMATION_STYLE}>
                <h1>{header}</h1>
                <p className="px-7">{paragraph}</p>
                
                {/* 
                    This section of code lays out the buttons / links
                    depending on whether a set route is available to them
                 */}
                <div style={BUTTON_DIV_STYLES}>
                    {buttons.map((button, index) => {
                        if (button.route) {
                            return (
                                <Link key={ index } to={ button.route } style={BUTTON_STYLE} onClick={ onClose }>
                                    { button.text }
                                </Link>
                            );
                        } else {
                            return (
                                <button key={ index } style={BUTTON_STYLE} onClick={ onClose }>
                                    { button.text }
                                </button>
                            );
                        }
                    })}
                </div>
            </div>
        </>,
        
        document.getElementById('root')!
    );
}

export default SubmitModal;