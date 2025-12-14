import './ReviewDetail.css';
import { useParams } from 'react-router-dom';
import { Card, RadioForm } from '@components/ui/index.js';
import { getGoal, type CompleteGoal } from '@root/features/goals/index.js';
import { useEffect, type FormEvent } from 'react';
import { useRadio, useAppNavigate } from '@root/hooks/index.js';
import { Ahead, Behind, OnTrack, radioOptions } from './components/index.js';

export const ReviewDetail = () => {

    /* Get the specific goal to validate it & potential route user */
    const { goalId } = useParams<{ goalId: string}>();
    const goal: CompleteGoal | undefined = getGoal(goalId);
    const navigate = useAppNavigate();

    /* Handling Radio input */
    const {selected, handleChange} = useRadio();


    useEffect(() => {
        /* Makes sure the user has a valid goal selected */
        if (!goal) {
            console.warn(`Goal ${goalId} couldn't be found.`);
            navigate(-1, { replace: true });
            return
        }
    }, [goalId]);

    const submissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget;
        const formData = new FormData(target);
        const data = Object.fromEntries(formData.entries());

        console.log(data);
    }

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

            <form onSubmit={submissionHandler}>
                <Card className='review-detail-card'>
                    <RadioForm label={""} options={radioOptions} selected={selected} onChange={handleChange} name={"review-detail-radio"}/>
                </Card>
        
                {selected === "behind" && <Behind goal={goal} />}
                {selected === "on-track" && <OnTrack goal={goal} />}
                {selected === "ahead" && <Ahead goal={goal} />}
                <button className='submit-button' type='submit'>Here</button>
            </form>
        </Card>
    );}
}

export default ReviewDetail;