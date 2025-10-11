import React from "react";
import Logo from "../../assets/logo.svg?react";
import { useRef } from "react";
import { useHeaderDetails } from '../../hooks/useHeaderDetails.js';

interface HeaderProps {
    onHeightMeasured: (details: {height : number}) => void;
}

const Header:React.FC<HeaderProps> = ( { onHeightMeasured }) => {

    // Creating a ref & attaching it to the root html element
    const headerRef = useRef<HTMLElement>(null);
    useHeaderDetails(headerRef, onHeightMeasured);

    return(
        <header ref={headerRef} className="flex justify-between w-full p-5 text-[#413737] border-b-2 bg-[#F5F5F5]">
            <div className="flex gap-3">
                <Logo className=""/>
                <h1 className="flex items-center text-[24px] font-bold">TrueNorth</h1>
            </div>

            <nav className="flex gap-5 items-center">
                <a href="#">Home</a>
                <a href="#">Goals</a>
                <a href="#">Reviews</a>
                <a href="#">+ New Goal</a>
            </nav>
        </header>
    )
}

export default Header