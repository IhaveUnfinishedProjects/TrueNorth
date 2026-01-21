import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigate, useGoBack, useLoading } from "@hooks/index.js";
import { Card, CheckboxComponent, GeneralModal, ConfirmationModal } from "@components/ui/index.js";
import { useCheckbox, type CheckBoxOptions, setStepsComplete, getGoals, getBreadCrumb, type CompleteGoal, getReviews, OPTION_MAPPING, BinImage, deleteGoal, confirmationButtons, noButtonName } from '@features/index.js';
import { FeatureCard } from './components/featureCard.js';
import './GoalDetail.css';
import { type Review } from "@root/library/index.js";

export const GoalDetail = () => {

    /*  HOOKS & PARAMS  */
    const { goalId } = useParams<{ goalId: string }>();
    const [goal, setGoal] = useState<CompleteGoal>();
    const navigate = useAppNavigate();
    const goBack = useGoBack();
    const { loading, setLoading } = useLoading.getState(); 
    const [displayReview, setDisplayReview]  = useState<boolean>(false);
    const [reviewModal, setReviewModal]  = useState<Review | undefined>();
    const [reviews, setReviews] = useState<Review[]>();
    const [breadCrumb, setBreadCrumb] = useState<string>();
    const [confirmation, setConfirmation] = useState<boolean>(false);
    
    // State management hooks
    const { selectedBoxes, handleChange } = useCheckbox({ value: goal?.completeSteps });

    /*  DERIVED STATE  */
    const stepOptions: CheckBoxOptions[] | undefined = goal?.steps?.map(step => ({
        id: step.id,
        description: step.description
    }));

    /*  HANDLERS  */
    const checkboxChange = async (values: string[] | null) => {
        handleChange({value: values});
        if (values && goalId) {
            await setStepsComplete({ goalId: goalId, completeSteps: values });
        }
    };

    /* HELPER & SIDE EFFECTS */
    const removeGoal = async (name: string | undefined) => {
        setConfirmation(false);
        if (!goal || !name) {
            goBack();
            return;
        }

        if (name === noButtonName){return}

        try {
            setLoading(true);
            const response = await deleteGoal(goal.id);
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
            goBack();
        }
    }

    useEffect(() => {
        const loadGoal = async () => {
            setLoading(true);
            try {
                const goals = await getGoals();
                const goalResult = await goals.find(goal => String(goal.id) === String(goalId));

                if (!goalResult) throw new Error(`Goal with ID ${goalId} not found`);

                handleChange({value: goalResult.completeSteps});
                setGoal(goalResult);
                setBreadCrumb(getBreadCrumb({goal: goalResult, goals}));

            } catch (error) {
                console.warn(`Goal of ${goalId} couldn't be found +`, error);
                goBack();
            } finally {
                setLoading(false);
            }
        }
        loadGoal();
    }, [goalId]);

    useEffect(() => {

        if (!goalId) {
            goBack();
            return;
        }

        const loadReviews = async () => {
            setLoading(true);

            try {
                const reviewResults = await getReviews(goalId)
                if (!reviewResults) {
                    throw reviewResults;
                }
                setReviews(reviewResults);
            } catch (error) {
                console.warn("Couldn't fetch reviews + " + error);
            } finally {
                setLoading(false);
            }
        }

        loadReviews();
    }, [goalId])

    if (loading) {return null}
    if (goal) {return (
        <div className='goal-section-wrapper'>
            <Card className={`goal-detail-card  ${displayReview ? 'showing-sidebar': ''}`}>
                <p className='goal-detail-crumb'> {breadCrumb}</p>

                {/* This contains the header section */}
                <div className='goal-detail-header'>
                    <h1>{goal.goalName}</h1>
                    <div>
                        <button className="" onClick={() => navigate(`/EditGoal/${goal.id}`)}>Edit</button>
                        <button className="" onClick={() => navigate(`/PlanGoal/${goal.id}`)}>+ Add Step</button>
                        {reviews && reviews.length > 0 && <button className="" onClick={() => setDisplayReview(!displayReview)}>Reviews</button>}
                        <BinImage item={goal} remove={() => setConfirmation(true)}/>
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

            {displayReview && reviews &&
                <Card className="side-review-bar">
                    <h3>Reviews</h3>
                    {reviews.map((review, index) => {
                        const displayWeek = reviews.length - index
                        const reviewType = OPTION_MAPPING[review.reviewType as keyof typeof OPTION_MAPPING];
                        return (
                            <button onClick={() => setReviewModal(review)}><b>Week {displayWeek}</b> - {reviewType}</button>
                        )
                    })}
                </Card>
            }

            {reviewModal && 
                <GeneralModal onClose={() => setReviewModal(undefined)}>
                    <h2 className='mt-[-0.5rem]'>{OPTION_MAPPING[reviewModal.reviewType as keyof typeof OPTION_MAPPING]}</h2>
                    <p className="review-inputs">{reviewModal.firstInput}</p>
                    <p className="review-inputs">{reviewModal.secondInput}</p>
                </GeneralModal>
            }

            {confirmation && 
                <ConfirmationModal header={'Delete Goal?'} buttons={confirmationButtons} onClose={removeGoal}/>
            }
        </div>
    );}
}

export default GoalDetail;