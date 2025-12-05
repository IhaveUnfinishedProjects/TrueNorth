import React from "react";
import "@root/index.css";
import { useAppNavigate } from '@hooks/index.js';
import type { featureCardData } from "./config.js";

/*
    This file is responsible for taking FeatureCardData & rendering the 
    content into the card.
*/

const FeatureCard = ({ title, details, link, SvgImage, buttonText }: featureCardData ) => {

    const navigate = useAppNavigate();

    return (

        /* This acts as the rectangle card container. */
        <div className="card-container">
                {/* The first flex box item contains the text header and explaination */}
                <div className="container-text">

                    <h2 className="text-[#413737] text-2xl font-bold">{ title }</h2>
                    <p className="text-[#413737] text-l font-medium leading-tight">{ details }</p>
                    <button onClick={() => navigate(`${link}`)} className="home-button">{buttonText}</button>

                </div>

                {/* The second flex item containing the SVG image */}
                <SvgImage className="svg-image" />
                
        </div>
    );
}

export default FeatureCard;