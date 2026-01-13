import type { ReviewSectionProps } from './index.js';
import { REVIEW_TYPES} from '@features/index.js';

type contentProps = Pick<ReviewSectionProps, 'goal' | 'status'>

export const getContent = ({goal, status}: contentProps) => {
    switch (status) {
        case REVIEW_TYPES[0]:
            return {
                className: 'behind-track-card',
                title: 'Behind progress',
                intro: (
                    <>
                        <p><b>Focusing on what I can do:</b> Here's what I said I'd achieve:</p>
                        <p className='quote'><i>"{goal.desiredAchievement}"</i></p>
                        <p>Picture working toward success. What get's in your way?</p>
                    </>
                ),
                midText: 'How do you get around this?'
            };
            case REVIEW_TYPES[1]:
                return {
                    className: 'on-track-card',
                    title: 'Right On Track',
                    intro: (
                        <>
                        <p>
                            Awesome, I hit my goal. Before moving on, did I
                            sprint last minute to achieve this, and is this level of effort unsastainable? 
                            If the answer is yes to either, then treat it like I'm behind.
                        </p>
                        <p>
                            If not, then I'm in the right spot, I did what I said I would. Let's think of the next week. 
                            Is there anything that might act as an obstacle to this goal?
                        </p>
                    </>
                ),
                midText: 'When this happens what will you do about it?'
            };
        case REVIEW_TYPES[2]:
            return {
                className: 'ahead-track-card',
                title: 'Ahead of progress',
                intro: <p>Awesome! I did more than I thought I could. Even though I'm ahead, how could I do better next week?</p>,
                midText: 'Set a new target for next week (optional)'
            };
        default:
            return null;
    }
};

export default getContent;