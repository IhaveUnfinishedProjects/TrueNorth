import './ReviewDetail.css';
import { useParams } from 'react-router-dom';
import { Card } from '@components/ui/index.js';
import { getGoal, type CompleteGoal } from '@root/features/goals/index.js';
import { useEffect } from 'react';
import useAppNavigate from '@root/hooks/useAppNavigate.js';

export const ReviewDetail = () => {
    const { goalId } = useParams<{ goalId: string}>();
    const goal: CompleteGoal | undefined = getGoal(goalId);
    const navigate = useAppNavigate();

    useEffect(() => {
        /* Makes sure the user has a valid goal selected */
        if (!goal) {
            console.warn(`Goal ${goalId} couldn't be found.`);
            navigate(-1, { replace: true });
            return
        }
    }, [goalId]);

    if (goal) {return (
        <Card className='review-detail-container'>
            <Card className='review-detail-card'>
                <h1>Review of '{goal.goalName}'</h1>
            </Card>
            <Card className='review-detail-card'>
                <h2>How did you do this week?</h2>
                <p><b>This was how I said I'd measure progress:</b></p>
                <p className='quote'>"<i>{goal.measurement}</i>"</p>
                <p>Based on that, did I hit my target?</p>
            </Card>
            <Card className='review-detail-card'>
                <p className='quote'>Behind - on track - ahead</p>
            </Card>
            <Card className='review-detail-card behind-track-card'>
                <h2>Behind progress</h2>
                <p><b>Focusing on what I can do:</b> Here's what I said I'd achieve:</p>
                <p className='quote'><i>"{goal.desiredAchievement}"</i></p>
                <p>Picture working toward success. What get's in your way?</p>
                <p className='quote'>text box goes here.</p>
                <p>How do you get around this?</p>
                <p className='quote'>text box goes here.</p>
            </Card>
            <Card className='review-detail-card on-track-card'>
                <h2>Right On Track</h2>
                <p>
                    Awesome, you hit your goal. Before moving on, did you
                    sprint last minute to achieve this, and is this level of effort unsastainable? 
                    If the answer is yes to either, then treat it like you're behind.
                </p>
                <p>
                    If not, then I'm in the right spot, I did what I said I would. Let's think of the next week. 
                    Is there anything that might act as an obstacle to this goal?
                </p>
                <p className='quote'>text box goes here.</p>
                <p>When this happens what will you do about it?</p>
                <p className='quote'>text box goes here.</p>
            </Card>
            <Card className='review-detail-card ahead-track-card'>
                <h2>Ahead of progress</h2>
                <p>Awesome! I did more than I thought I could. Even though I'm ahead, how could I do better next week?</p>
                <p className='quote'>text box goes here.</p>
                <p>Set a new target for next week (optional)</p>
                <p className='quote'>text box goes here.</p>
            </Card>
        </Card>
    );}
}

export default ReviewDetail;