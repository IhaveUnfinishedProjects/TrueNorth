import { useRef } from "react";
import { Link } from "react-router-dom";

import '@root/index.css';
import './Header.css';
import Logo from "@assets/logo.svg?react";
import { useHeaderDetails, useUser, useToggleModal } from '@hooks/index.js';
import { NavBarData } from './config.js';
import { ConfirmationModal} from '@components/index.js';
import { confirmationButtons, yesButtonName } from "@root/features/index.js";

/*
    This file is responsible for rendering the Header component.
    It takes a function call as a prop "onHeightMeasured" which accepts
    an input "height". 

    This height value is taken from the height of the header component, and 
    is passed into onHeightMeasured to offset the background by the header height. 
*/


// Specifies the input & return values for onHeightMeasured
interface HeaderProps {
    onHeightMeasured: (details: {height : number}) => void;
}

const Header = ( { onHeightMeasured }: HeaderProps) => {
    const backModal = useToggleModal();

    // Creates a ref & attaches it to the root html element
    const headerRef = useRef<HTMLElement>(null);
    useHeaderDetails(headerRef, onHeightMeasured);
    const { logout } = useUser();

    const localBackHandler = (buttonName: string | undefined) => {
        if (buttonName === yesButtonName) {
            logout();
        }

        backModal.onClose();
    }

    return(
        <>
            {backModal.isOpen && <ConfirmationModal 
                header = "Are you sure?"
                buttons={confirmationButtons}
                onClose={localBackHandler}
            />}
            <header ref={headerRef} className="header">
                <div className="flex gap-3">
                    <Logo/>
                    <h1 className="flex items-center text-[24px] font-bold">TrueNorth</h1>
                </div>

                <nav className="flex gap-5 items-center">
                    {NavBarData.map((data, index) => (
                        <Link key={index} to={data.linkTo} state={{ fromApp: true }}>
                            <button className="header-button">
                                {data.name}
                            </button>
                        </Link>
                    ))}
                    <button className="header-button" type='button' onClick={backModal.onOpen}>Log out</button>
                </nav>
            </header>
        </>
    )
}

export default Header