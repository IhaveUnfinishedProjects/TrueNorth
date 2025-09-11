import React from "react";
import Logo from "../../assets/logo.svg?react";

const Header = () => {
    return(
        <header>
            <Logo />
            <div>
                <p>This is where the logo will go</p>
            </div>
            <div>
                <h1>Title</h1>
            </div>

        </header>
    )
}

export default Header