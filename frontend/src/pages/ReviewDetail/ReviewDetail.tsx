import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, RadioForm } from '@components/ui/index.js';
import { ReviewSection } from './components/index.js';
import { useRadio, useInput, useGoBack, useLoading } from '@hooks/index.js';
import { getGoal, AddReview, REVIEW_TYPES, OPTION_MAPPING, isReviewType, type CompleteGoal } from '@features/index.js';
import './ReviewDetail.css';

export const ReviewDetail = () => {

    /* HOOKS & PARAMS */
    const { goalId } = useParams<{ goalId: string }>();
    const goBack = useGoBack();
    
    /* STATE */
    const [goal, setGoal] = useState<CompleteGoal>();
    const { loading, setLoading } = useLoading.getState();

    /* FORM HOOKS */
    const { selected: reviewType, handleChange } = useRadio();
    const firstInputHook = useInput();
    const secondInputHook = useInput();
    
    /* HELPER FUNCTION */
    const submissionHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const firstInput = firstInputHook.selected;
        const secondInput = secondInputHook.selected;

        if (!goalId || !isReviewType(reviewType) || !firstInput || !secondInput) {
            console.warn("Invalid Review Object or Type");
            return;
        }

        try {
            setLoading(true);
            await AddReview({ goalId, reviewType, firstInput, secondInput });
            goBack();
            
        } catch (error) {
            console.warn("There was a problem submitting review.", error);
        } finally {
            setLoading(false);
        }
    }

    /* CONSTANTS */
    const RADIO_FORM_NAME = 'reviewDetailRadio';
    const radioOptions = Object.entries(OPTION_MAPPING).map(([value, label]) => ({
        value: value,    
        displayLabel: label 
    }));

    /* SIDE EFFECTS */
    useEffect(() => {
        const loadGoal = async () => {
            try {
                setLoading(true);
                const goalObj = await getGoal(goalId);
                setGoal(goalObj);
            } catch (error) {
                console.warn(`Goal ${goalId} couldn't be found. ` + error);
                goBack();
            } finally {
                setLoading(false);
            }
        }
        loadGoal();
    }, [goalId]);


    if (loading) {return null}
    if (goal) {return (
        <Card className='review-detail-container'>

            <Card className='review-detail-card'>
                <h1>Review of '{goal.goalName}'</h1>
                <p>
                    <b>Progress Measurement:</b> {goal.measurement}</p>
                <p><b>Target Achievement:</b> {goal.desiredAchievement}</p>
            </Card>

            <Card className='review-detail-card'>
                <form className='review-detail-form' onSubmit={submissionHandler}>
                    <RadioForm label={""} options={radioOptions} selected={reviewType} onChange={handleChange} name={RADIO_FORM_NAME} className='review-radio'/>
                    {reviewType && <ReviewSection goal={goal} status={reviewType} firstInputHook={firstInputHook} secondInputHook={secondInputHook}/>}
                    <button className='submit-button mt-[1rem]' type='submit'>Complete</button>
                </form>
            </Card>
        </Card>
    );}
}

export default ReviewDetail;