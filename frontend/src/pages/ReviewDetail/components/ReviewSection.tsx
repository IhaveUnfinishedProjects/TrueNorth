import type { CompleteGoal } from '@root/features/goals/index.js';
import { getContent } from './index.js';

export interface InputHook {
    selected: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
        <>
            {content.intro}
            <textarea 
                className='input textarea mb-[1rem]'
                key={FIRST_INPUT_NAME}
                name={FIRST_INPUT_NAME}
                value={firstInputHook.selected}
                placeholder={''}
                onChange={firstInputHook.onChange}
                required
            />
            <p>{content.midText}</p>
            <textarea 
                className='input textarea'
                key={SECOND_INPUT_NAME}
                name={SECOND_INPUT_NAME}
                value={secondInputHook.selected}
                placeholder={''}
                onChange={secondInputHook.onChange}
                required
            />   
        </>         
    );
};

export default ReviewSection;