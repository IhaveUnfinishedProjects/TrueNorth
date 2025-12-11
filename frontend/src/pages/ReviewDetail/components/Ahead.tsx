import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';

interface AheadProps {
    goal: CompleteGoal;
}
export const Ahead = ({goal}: AheadProps) => {    return(
        <Card className='review-detail-card ahead-track-card'>
            <h2>Ahead of progress</h2>
            <p>Awesome! I did more than I thought I could. Even though I'm ahead, how could I do better next week?</p>
            <p className='quote'>text box goes here.</p>
            <p>Set a new target for next week (optional)</p>
            <p className='quote'>text box goes here.</p>
        </Card>
    );
}

export default Ahead;