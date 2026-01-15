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
                    <p>
                        What is standing in your way?
                    </p>
                ),
                midText: 'How do you get around this?'
            };
            case REVIEW_TYPES[1]:
                return {
                    className: 'on-track-card',
                    title: 'Right On Track',
                    intro: (
                        <p>
                            Goal Reached. Was this effort sustainable, or a last-minute sprint? Any upcoming obstacles for next week?
                        </p>
                ),
                midText: 'How will you deal with those obstacles?'
            };
        case REVIEW_TYPES[2]:
            return {
                className: 'ahead-track-card',
                title: 'Ahead of progress',
                intro: <p>How can you step it up even further next week?</p>,
                midText: 'Set a new target for next week (optional)'
            };
        default:
            return null;
    }
};

export default getContent;