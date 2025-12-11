import { CreateGoal, ViewGoal, TrackGoal } from '@assets/index.js';

// Provides type definitions for a FeatureCards data structure. 
export type featureCardData = {
    title: string;
    details: string;
    link: string;
    SvgImage: React.FC<React.SVGProps<SVGSVGElement>>;
    buttonText: string;
}

// Contains the data objects for all FeatureCards
export const featureCardData: featureCardData[] = [
    {
        title: "Create Goal",
        details: "Start your journey by creating some clear goals, and define some actionable steps to reach them.",
        link: "/CreateGoal",
        SvgImage: CreateGoal,
        buttonText: "Create"
    },
    {
        title: "View Goal",
        details: "View your current goal, and the next actionable steps you need to take to move toward your desired outcome.",
        link: "/GoalView",
        SvgImage: ViewGoal,
        buttonText: "View"
    },
    {
        title: "Track Goal",
        details: "Reflect on the progress you've made in order to refine the direction of your goals, and improve your strategies.",
        link: "/GoalReview",
        SvgImage: TrackGoal,
        buttonText: "Review"
    },
]