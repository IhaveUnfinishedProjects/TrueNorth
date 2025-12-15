import './ReviewDetail.css';
import { useParams } from 'react-router-dom';
import { Card, RadioForm } from '@components/ui/index.js';
import { getGoal, type CompleteGoal, AddReview, REVIEW_TYPES } from '@root/features/goals/index.js';
import { useEffect } from 'react';
import { useRadio, useAppNavigate, useInput, useGoBack } from '@root/hooks/index.js';
import { ReviewSection } from './components/index.js';
import { isReviewType } from '@root/features/goals/utils/index.js';

export const ReviewDetail = () => {

    /* CONSTANTS */
    const { goalId } = useParams<{ goalId: string}>();
    const goal: CompleteGoal | undefined = getGoal(goalId);
    const navigate = useAppNavigate();
    const goBack = useGoBack();
    const RADIO_FORM_NAME = 'reviewDetailRadio';
    const radioOptions = REVIEW_TYPES.map(option => ({
        value: option,
        displayLabel: option
    }));

    const {selected: reviewType, handleChange} = useRadio();
    const firstInputHook = useInput();
    const secondInputHook = useInput();

    useEffect(() => {
        // Validates the goal id by checking goal is real.
        if (!goal) {
            console.warn(`Goal ${goalId} couldn't be found.`);
            goBack();
            return
        }
    }, [goalId]);

    const submissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const firstInput = firstInputHook.selected;
        const secondInput = secondInputHook.selected;

        if (!(goalId && reviewType && firstInput && secondInput) || secondInput === '' || firstInput === ''){
            console.warn("Invalid Review Object");
            return;
        }

        if (!isReviewType(reviewType)){
            console.warn("reviewType passed is not valid");
            return;
        }

        AddReview({ goalId, reviewType, firstInput, secondInput });
        goBack();
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

            <form className='review-detail-form' onSubmit={submissionHandler}>
                <Card className='review-detail-card'>
                    <RadioForm label={""} options={radioOptions} selected={reviewType} onChange={handleChange} name={RADIO_FORM_NAME}/>
                </Card>
        
                {reviewType && <ReviewSection goal={goal} status={reviewType} firstInputHook={firstInputHook} secondInputHook={secondInputHook}/>}
                <button className='submit-button' type='submit'>Here</button>
            </form>
        </Card>
    );}
}

export default ReviewDetail;