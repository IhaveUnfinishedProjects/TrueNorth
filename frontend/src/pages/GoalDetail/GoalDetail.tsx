import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate, useGoBack, useLoading } from "@hooks/index.js";
import { Card, CheckboxComponent } from "@components/ui/index.js";
import { useCheckbox, type CheckBoxOptions, setStepsComplete, getGoal, getGoals, getBreadCrumb, type CompleteGoal } from '@features/goals/index.js';
import { FeatureCard } from './components/featureCard.js';
import './GoalDetail.css';

export const GoalDetail = () => {

    /*  HOOKS & PARAMS  */
    const { goalId } = useParams<{ goalId: string }>();
    const [goal, setGoal] = useState<CompleteGoal>();
    const navigate = useAppNavigate();
    const goBack = useGoBack();
    const { loading, setLoading } = useLoading.getState(); 
    let breadCrumb: string | null = null;
    
    // State management hooks
    const { selectedBoxes, handleChange } = useCheckbox({ defaultVal: goal?.completeSteps });

    /*  DERIVED STATE  */
    const stepOptions: CheckBoxOptions[] | undefined = goal?.steps?.map(step => ({
        id: step.id,
        description: step.description
    }));

    /*  HANDLERS  */
    const checkboxChange = (values: string[] | null) => {
        handleChange(values);
        if (values && goalId) {
            setStepsComplete({ goalId: goalId, completeSteps: values });
        }
    };

    /*  SIDE EFFECTS  */
    useEffect(() => {
        const loadGoal = async () => {
            try {
                setLoading(true);
                const goalResult = await getGoal(goalId);
                const goals = await getGoals();
                setGoal(goalResult);

                if (!goalResult) {
                    throw new Error(`Goal with ID ${goalId} not found`);
                }

                breadCrumb = getBreadCrumb({goal: goalResult, goals});
            } catch (error) {
                console.warn(`Goal of ${goalId} couldn't be found + `, error);
                goBack();
            } finally {
                setLoading(false);
            }
        }
        loadGoal();
    }, [goalId]);

    if (loading) {return null}
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
                    <CheckboxComponent curSelected={selectedBoxes} onChange={checkboxChange} options={stepOptions ?? []} name="step-checkbox" />
                </div>}
        </Card>
    );}
}

export default GoalDetail;