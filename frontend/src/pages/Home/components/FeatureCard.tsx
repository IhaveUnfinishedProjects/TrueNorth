import {useState, useEffect} from 'react'
import { useAppNavigate } from '@hooks/index.js';
import type { featureCardData } from "./config.js";
import "@root/index.css";

/*
    This file is responsible for taking FeatureCardData & rendering the 
    content into the card.
*/

const FeatureCard = ({ title, details, link, SvgImage, buttonText }: featureCardData ) => {

    const [ smallDevice, setSmallDevice ] = useState(window.innerWidth <= 700);
    const navigate = useAppNavigate();

    useEffect(() => {
        const handleResizing = () => {
            setSmallDevice(window.innerWidth <= 700);
        }

        window.addEventListener('resize', handleResizing);

        return () => window.removeEventListener('resize', handleResizing);
    }, [])

    return (

        /* This acts as the rectangle card container. */
        <div className="main card-container">
                {/* The first flex box item contains the text header and explaination */}
                <div className="container-text">

                    <h2 className="text text-2xl font-bold">{ title }</h2>
                    <p className="text text-l font-medium leading-tight">{ details }</p>
                    <button onClick={() => navigate(`${link}`)} className="home-button text">{buttonText}</button>

                </div>

                {/* The second flex item containing the SVG image */}
                <SvgImage 
                    className="svg-image svg-image-mobile" 
                    preserveAspectRatio={smallDevice ? "none" : "xMidYMid meet"}
                    style={{ 
                        filter: smallDevice ? "brightness(0.9) contrast(0.9)" : "none",
                        transition: "filter 0.3s ease"
                    }}
                />
                
        </div>
    );
}

export default FeatureCard;