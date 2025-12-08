import { getAncestor, getGoal, type CompleteGoal } from "@root/features/goals/index.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@hooks/index.js";
import { Card } from "@root/components/ui/index.js";
import { FeatureCard } from './components/featureCard.js';
import './GoalDetail.css';
import { getBreadCrumb } from "@root/features/goals/components/GoalView/components/util.js";

export const GoalDetail = () => {

    const { goalId } = useParams<{ goalId: string}>();
    const navigate = useAppNavigate();
    const goal: CompleteGoal | undefined = getGoal(goalId);
    const breadCrumb = getBreadCrumb(goal);

    useEffect(() => {

        if (!goal) {
            console.warn(`Goal ${goalId} couldn't be found.`);
            navigate(-1, { replace: true });
            return
        }

    }, [goalId]);

    if (goal) {return (
        <Card className='goal-detail-card'>
            <p className='goal-detail-crumb'> {breadCrumb}</p>

            {/* This contains the header section */}
            <div className='goal-detail-header'>
                <h1>{goal.goalName}</h1>
                <div>
                    <button className="">Edit</button>
                    <button className="">+ Add Step</button>
                </div>
            </div>

            {/* This contains the goal info card section (The why, what when cards etc) */}
            <div className='goal-feature-section'>
                <FeatureCard title={"Why I want to achieve this"} content={goal.importance} />
                <FeatureCard title={"What the goal is"} content={goal.desiredAchievement} />
                <FeatureCard title={"How I'm measuring progress"} content={goal.measurement} />
                <FeatureCard title={"Due achievement date"} content={goal.achievementDate} />
            </div>


            {goal.steps && 
            <div className="goal-detail-steps">
                <h2>Steps to complete</h2>
                <div className="steps-border">
                    {goal.steps?.map((data) => (
                        <div className="goal-detail-step">
                            <span>
                                {data.description}
                            </span>
                            {data.recurrence?.startDate}
                        </div>
                    ))}
                </div>
            </div>}
        </Card>
    );}
}

export default GoalDetail;