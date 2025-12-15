import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';
import { getContent } from './index.js';

export interface InputHook {
    selected: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ReviewSectionProps {
    goal: CompleteGoal;
    status: string;
    firstInputHook: InputHook;
    secondInputHook: InputHook;
}

export const ReviewSection = ({ goal, status, firstInputHook,  secondInputHook}: ReviewSectionProps) => {
    const FIRST_INPUT_NAME = 'input1';
    const SECOND_INPUT_NAME = 'input2';
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
                value={firstInputHook.selected}
                placeholder={''}
                onChange={firstInputHook.onChange}
            />
            <p>{content.midText}</p>
            <input 
                className='input'
                key={SECOND_INPUT_NAME}
                name={SECOND_INPUT_NAME}
                value={secondInputHook.selected}
                placeholder={''}
                onChange={secondInputHook.onChange}
            />            
        </Card>
    );
};

export default ReviewSection;