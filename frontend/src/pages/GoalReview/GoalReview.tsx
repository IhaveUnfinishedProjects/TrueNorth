import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useAppNavigate, useLoading, useGoBack } from '@hooks/index.js';
import { getGoals, type CompleteGoal } from "@features/goals/index.js";
import '@root/lib/styles/circle-progress-bar.css';
import './GoalReview.css';


export const GoalReview = () => {

    /* HOOKS & PARAMS */
    const navigate = useAppNavigate();
    const { loading, setLoading } = useLoading.getState();
    const goBack = useGoBack();
    const [goals, setGoal] = useState<CompleteGoal[]>();

    /* HELPER FUNCITONS */
    const calcProgress = (goal: CompleteGoal) => {
        if (goal.steps && goal.completeSteps) {
            return (goal.completeSteps.length / goal.steps.length)*100;
        }
        return 0;
    }

    /* SIDE EFFECTS */
    useEffect(() => {
        const loadGoals = async () => {
            try {
                setLoading(true);
                const goalObj = await getGoals();
                setGoal(goalObj);
            } catch (error) {
                console.warn(`Goals couldn't be found. ` + error);
                goBack();
            } finally {
                setLoading(false);
            }
        }
        loadGoals();
    }, []);

    if (loading || !goals) {return null}
    return(
        <div className='goal-review-container'>
            <h1>Select Goal to Review</h1>
            {goals.map(goal => (
                <button key={goal.id} className="review-text-container" onClick={() => navigate(`/ReviewDetail/${goal.id}`)}>
                    <div className='details'>
                        <h3>{goal.goalName}</h3>
                        <p>{goal.desiredAchievement}</p>
                    </div>
                    <CircularProgressbar 
                        value={calcProgress(goal)} 
                        text={`${calcProgress(goal)}%`} 
                    />
                </button>
            ))}
        </div>
    );
}

export default GoalReview;