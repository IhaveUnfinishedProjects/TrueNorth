// ModalWrapper.tsx (or ConfirmationModal.tsx for consistency)
import { type ReactNode } from "react";
import ReactDOM from 'react-dom';
import "@root/index.css";
import "./ModalWrapper.css";

interface ModalWrapperProps {
    children: ReactNode;
}

const ModalWrapper = ({ children }: ModalWrapperProps) => {

    return ReactDOM.createPortal(
        <>
            <div className="overlay-styles"></div>
            <div className="confirmation-style">
                {children}
            </div>
        </>,
        document.getElementById('portal')!
    );
}

export default ModalWrapper;