import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';
import { useInput } from '@hooks/index.js';
import { FIRST_INPUT_NAME, getContent, SECOND_INPUT_NAME } from './index.js';

export interface ReviewSectionProps {
    goal: CompleteGoal;
    status: string;
}

export const ReviewSection = ({ goal, status }: ReviewSectionProps) => {
    const firstInput = useInput();
    const secondInput = useInput();
    const content = getContent({ goal, status });
    if (!content) return null;

    return (
        <Card className={`review-detail-card ${content.className}`}>
            <h2>{content.title}</h2>
            {content.intro}
            <input 
                className='input'
                key={FIRST_INPUT_NAME}
                name={FIRST_INPUT_NAME}
                value={firstInput.selected}
                placeholder={''}
                onChange={firstInput.onChange}
            />
            <p>{content.midText}</p>
            <input 
                className='input'
                key={SECOND_INPUT_NAME}
                name={SECOND_INPUT_NAME}
                value={secondInput.selected}
                placeholder={''}
                onChange={secondInput.onChange}
            />            
        </Card>
    );
};

export default ReviewSection;