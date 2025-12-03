import React from "react";
import "@root/index.css";
import { CreateGoal, ViewGoal, TrackGoal } from '@assets/index.js';
import FeatureCard from "./components/FeatureCard.js";

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
            link: "/CreateGoal",
            SvgImage: CreateGoal
        },
        {
            title: "View Goal",
            details: "View your current goal, and the next actionable steps you need to take to move toward your desired outcome.",
            link: "/GoalView",
            SvgImage: ViewGoal
        },
        {
            title: "Track Goal",
            details: "Reflect on the progress you've made in order to refine the direction of your goals, and improve your strategies.",
            link: "https://www.youtube.com/",
            SvgImage: TrackGoal
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