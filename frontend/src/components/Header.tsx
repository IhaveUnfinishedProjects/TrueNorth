import React from "react";
import InfoIcon from "../assets/info.svg?react";

export function Header(){
    return(
        <header>
            <InfoIcon />
            <h1>TrueNorth</h1>
            <nav>
                <a href="#">Home</a>
                <a href="#">Goals</a>
                <a href="#">Reviews</a>
                <a href="#">New Goal</a>
            </nav>
        </header>
    );
}