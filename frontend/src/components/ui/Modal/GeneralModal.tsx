import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { ModalWrapper } from "@components/ui/index.js";
import type { ModalButtonProps } from "@root/lib/types/index.js";
import "@root/index.css";
import './ModalWrapper.css';

/*
    This file is for creating dynamic modals. 
    It takes a <h1> string arg, <p> string (optional)
    and an array containing the buttons route destination 
    & text to display.
*/

interface ModalProps {
    header: string;
    paragraph?: string;
    buttons: ModalButtonProps[];
    onClose: (name: string | undefined) => void;
}

const ConfirmationModal = ({ header, paragraph, buttons, onClose }: ModalProps) => {
    return ReactDOM.createPortal(
        <>
            <ModalWrapper>
                <h1>{header}</h1>
                <p className="paragraph">{paragraph}</p>
                
                {/* 
                    This section of code lays out the buttons / links
                    depending on whether a set route is available to them
                 */}
                <div className="button-div-styles">
                    {buttons.map((button, index) => {
                        if (button.route) {
                            return (
                                    <Link 
                                        key={ index } 
                                        to={ button.route } 
                                        className="button-style" 
                                        onClick={ () => onClose(button.name) }
                                        state={{ fromApp: true }}
                                    >
                                        { button.text }
                                    </Link>
                            );
                        } else {
                            return (
                                <button key={ index } className="button-style" onClick={ () => onClose(button.name) }>
                                    { button.text }
                                </button>
                            );
                        }
                    })}
                </div>
            </ModalWrapper>
        </>,
        
        document.getElementById('root')!
    );
}

export default ConfirmationModal;