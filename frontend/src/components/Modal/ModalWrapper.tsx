// ModalWrapper.tsx (or ModalTemplate.tsx for consistency)
import React, { type ReactNode } from "react";
import ReactDOM from 'react-dom';
import "@root/index.css";
import "./ModalWrapper.css";

interface ModalWrapperProps {
    children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {

    return ReactDOM.createPortal(
        <>
            <div className="overlay-styles"></div>
            <div className="confirmation-style">
                {children}
            </div>
        </>,
        document.getElementById('root')!
    );
}

export default ModalWrapper;