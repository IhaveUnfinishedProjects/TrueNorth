import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';

interface BehindProps {
    goal: CompleteGoal;
}
export const Behind = ({goal}: BehindProps) => {
    return(
        <Card className='review-detail-card behind-track-card'>
            <h2>Behind progress</h2>
            <p><b>Focusing on what I can do:</b> Here's what I said I'd achieve:</p>
            <p className='quote'><i>"{goal.desiredAchievement}"</i></p>
            <p>Picture working toward success. What get's in your way?</p>
            <p className='quote'>text box goes here.</p>
            <p>How do you get around this?</p>
            <p className='quote'>text box goes here.</p>
        </Card>
    );
}

export default Behind;