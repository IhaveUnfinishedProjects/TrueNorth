import React from "react";
import ReactDOM, { createPortal } from 'react-dom';
import { Link } from "react-router";
import "@root/index.css";
import "./Modal.css";
import type { ModalButtonProps } from "@root/types/modalButtons.js";

/*
    This file is for creating dynamic models. 
    It takes a <h1> string arg, <p> string (optional)
    and an array containing the buttons route destination 
    & text to display.
*/

interface ModalProps {
    header: string;
    paragraph?: string;
    buttons: ModalButtonProps[];
    onClose: () => void;
}

const ModalTemplate:React.FC<ModalProps> = ({ header, paragraph, buttons, onClose }) => {
    return ReactDOM.createPortal(
        <>
            <div className="overlay-styles"></div>
            <div className="confirmation-style">
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
                                <Link key={ index } to={ button.route } className="button-style" onClick={ onClose }>
                                    { button.text }
                                </Link>
                            );
                        } else {
                            return (
                                <button key={ index } className="button-style" onClick={ onClose }>
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

export default ModalTemplate;