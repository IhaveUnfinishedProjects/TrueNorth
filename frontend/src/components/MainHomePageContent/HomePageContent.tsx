import React from "react";
import RectangleHolder from "./RectangleHolder.js";
import SVG1 from "../../assets/CreateGoal.svg?react";
import SVG2 from "../../assets/ViewGoal.svg?react";
import SVG3 from "../../assets/TrackGoal.svg?react";

interface HomePageProps {
    height: number;
}

const HomePageContent: React.FC<HomePageProps> = ({ height }) => {

    const createGoalHeader: string = "Create Goal";
    const createGoalString: string = "Start your journey by creating some clear goals, and define some actionable steps to reach them.";
    const createGoalLink:   string = "https://www.youtube.com/";

    const viewGoalHeader:   string = "View Goal";
    const viewGoalString:   string = "View your current goal, and the next actionable steps you need to take to move toward your desired outcome.";
    const viewGoalLink:     string = "https://www.youtube.com/";

    const trackGoalHeader:  string = "Track Goal";
    const trackGoalString:  string = "Reflect on the progress you've made in order to refine the direction of your goals, and improve your strategies.";
    const trackGoalLink:    string = "https://www.youtube.com/";
    return (

        <main className="min-h-screen bg-[url('/src/assets/background.svg')] bg-cover" style={{ marginTop: `${height * 2}` }}>
            <div className="flex flex-col items-center py-30 space-y-14">
                <h1 className="mb-0 w-5/8 pl-3 text-start text-[#413737] text-3xl font-bold" >Welcome, User</h1>
                <RectangleHolder title={createGoalHeader} details={createGoalString} link={createGoalLink} SvgImage={SVG1} />
                <RectangleHolder title={viewGoalHeader} details={viewGoalString} link={viewGoalLink} SvgImage={SVG2} />
                <RectangleHolder title={trackGoalHeader} details={trackGoalString} link={trackGoalLink} SvgImage={SVG3} />
            </div>
        </main>
    );
}

export default HomePageContent;