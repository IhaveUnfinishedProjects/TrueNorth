// Defines the types of the content for the NavBarArray
type NavBarData = {
    linkTo: string;
    name: string;
}

export const NavBarData: NavBarData[] = [
    {
        linkTo: "/",
        name: "Home"
    },
    {
        linkTo: "/GoalView",
        name: "Goals"
    },
    {
        linkTo: "/GoalReview",
        name: "Review"
    },
    {
        linkTo: "/CreateGoal",
        name: "+ New Goal"
    }
]