import React from "react";
import { useRef } from "react";
import { Link } from "react-router";

import '@root/index.css';
import Logo from "@assets/logo.svg?react";
import { useHeaderDetails } from '@root/hooks/useHeaderHeight.js';


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

const Header:React.FC<HeaderProps> = ( { onHeightMeasured }) => {

    // Creates a ref & attaches it to the root html element
    const headerRef = useRef<HTMLElement>(null);
    useHeaderDetails(headerRef, onHeightMeasured);


    // Defines the types of the content for the NavBarArray
    type NavBarData = {
        linkTo: string;
        name: string;
    }

    const NavBarData: NavBarData[] = [
        {
            linkTo: "/",
            name: "Home"
        },
        {
            linkTo: "/",
            name: "Goals"
        },
        {
            linkTo: "/",
            name: "Review"
        },
        {
            linkTo: "/CreateGoal",
            name: "+ New Goal"
        }
    ]

    return(
        <header ref={headerRef} className="flex justify-between w-full p-5 text-[#413737] border-b-2 bg-[#F5F5F5]">
            <div className="flex gap-3">
                <Logo className=""/>
                <h1 className="flex items-center text-[24px] font-bold">TrueNorth</h1>
            </div>

            <nav className="flex gap-5 items-center">
                {NavBarData.map((data, index) => (
                    <Link key={index} to={data.linkTo}>
                        <button>
                            {data.name}
                        </button>
                    </Link>
                ))}
            </nav>
        </header>
    )
}

export default Header