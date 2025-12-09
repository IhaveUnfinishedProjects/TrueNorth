import { getGoal, type CompleteGoal } from "@root/features/goals/index.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "@hooks/index.js";
import { Card, CheckboxComponent } from "@root/components/ui/index.js";
import { FeatureCard } from './components/featureCard.js';
import './GoalDetail.css';
import { getBreadCrumb } from "@features/goals/index.js";
import { useCheckbox, type CheckBoxOptions } from '@features/goals/index.js';

export const GoalDetail = () => {

    const navigate = useAppNavigate();

    // Takes the goalId from the url to get the goal, breadcrumb, goal steps
    const { goalId } = useParams<{ goalId: string}>();
    const goal: CompleteGoal | undefined = getGoal(goalId);

    const steps: string[] | undefined = goal?.steps?.map(step => step.id);
    const stepOptions: CheckBoxOptions[] | undefined = goal?.steps?.map(step => ({
        id: step.id,
        description: step.description
    }));

    const breadCrumb: string = getBreadCrumb(goal); // cread crumb string to display goal ancestors
    const {selectedBoxes, handleChange} = useCheckbox({defaultVal: steps}); // to tick / untick goals
    
    /* Makes sure the user has a valid goal selected */
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
                    <button className="" onClick={() => navigate(`/EditGoal/${goal.id}`)}>Edit</button>
                    <button className="" onClick={() => navigate(`/PlanGoal/${goal.id}`)}>+ Add Step</button>
                </div>
            </div>

            {/* This contains the goal info card section (The why, what when cards etc) */}
            <div className='goal-feature-section'>
                <FeatureCard title={"Why I want to achieve this"} content={goal.importance} />
                <FeatureCard title={"What the goal is"} content={goal.desiredAchievement} />
                <FeatureCard title={"How I'm measuring progress"} content={goal.measurement} />
                <FeatureCard title={"Due achievement date"} content={goal.achievementDate} />
            </div>


            {/* Contains the list of steps & whether they're complete */}
            {(goal.steps && stepOptions) && 
            <div className="goal-detail-steps">
                <h2>Steps to complete</h2>
                <div className="steps-border">
                    {goal.steps?.map((data) => (
                        <div key={data.id} className="goal-detail-step">
                            <span>
                                {data.description}
                            </span>
                            {data.recurrence?.startDate}
                        </div>
                    ))}
                </div>

                <CheckboxComponent curSelected={selectedBoxes} onChange={handleChange} options={stepOptions ?? []} name="step-checkbox" />
            </div>}
        </Card>
    );}
}

export default GoalDetail;