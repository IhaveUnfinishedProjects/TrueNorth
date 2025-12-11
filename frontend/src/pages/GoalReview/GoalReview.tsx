import './GoalReview.css';
import '@root/styles/circle-progress-bar.css';
import { getGoals, type CompleteGoal } from "@root/features/goals/index.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import { useAppNavigate } from '@hooks/index.js';


export const GoalReview = () => {
    const goals = getGoals();
    const navigate = useAppNavigate();

    const calcProgress = (goal: CompleteGoal) => {
        if (goal.steps && goal.completeSteps) {
            return (goal.completeSteps.length / goal.steps.length)*100;
        }
        console.log("return none");
        return 0;
    }

    return(
        <div className='goal-review-container'>
            <h1>Select Goal to Review</h1>
            {goals.map(goal => (
                <button className="review-text-container" onClick={() => navigate(`/ReviewDetail/${goal.id}`)}>
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