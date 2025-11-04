import React from "react";
import "@root/index.css";
import SVG1 from "@assets/CreateGoal.svg?react";
import SVG2 from "@assets/ViewGoal.svg?react";
import SVG3 from "@assets/TrackGoal.svg?react";
import FeatureCard from "@root/views/MainHomePageContent/support/FeatureCard.js";

/* 
    The page is dedicated to returning the content for home page feature cards.
    It defines the content data type, sets it statically, and passes it into 
    <FeatureCard {*props*} /> to render the card itself. 
*/

const HomePageContent: React.FC<{}> = () => {

    // Provides type definitions for a FeatureCards data structure. 
    type featureCardData = {
        title: string;
        details: string;
        link: string;
        SvgImage: React.FC<React.SVGProps<SVGSVGElement>>;
    }

    // Contains the data objects for all FeatureCards
    const featureCardData: featureCardData[] = [
        {
            title: "Create Goal",
            details: "Start your journey by creating some clear goals, and define some actionable steps to reach them.",
            link: "https://www.youtube.com/",
            SvgImage: SVG1
        },
        {
            title: "View Goal",
            details: "View your current goal, and the next actionable steps you need to take to move toward your desired outcome.",
            link: "https://www.youtube.com/",
            SvgImage: SVG2
        },
        {
            title: "Track Goal",
            details: "Reflect on the progress you've made in order to refine the direction of your goals, and improve your strategies.",
            link: "https://www.youtube.com/",
            SvgImage: SVG3
        },
    ]

    return (

        // Maps the FeatureCardData array & passes it's items as props to the <FeatureCard /> component
        // to be rendered. 
        <div className="flex flex-col items-center py-5 space-y-14">
            <h1 className="mb-0 w-5/8 pl-3 text-start" >Welcome back, User</h1>
            {featureCardData.map((data, index) => (
                <FeatureCard 
                    key={index}

                    title={data.title}
                    details={data.details}
                    link={data.link}
                    SvgImage={data.SvgImage}
                />
            ))}
        </div>
    );
}

export default HomePageContent;