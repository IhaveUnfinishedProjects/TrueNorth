import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';
import { useInput } from '@hooks/index.js';

interface OnTrackProps {
    goal: CompleteGoal;
}
export const OnTrack = ({goal}: OnTrackProps) => {    
    const firstInput = useInput();
    const secondInput = useInput();
    return(
        <Card className='review-detail-card on-track-card'>
            <h2>Right On Track</h2>
            <p>
                Awesome, I hit my goal. Before moving on, did I
                sprint last minute to achieve this, and is this level of effort unsastainable? 
                If the answer is yes to either, then treat it like I'm behind.
            </p>
            <p>
                If not, then I'm in the right spot, I did what I said I would. Let's think of the next week. 
                Is there anything that might act as an obstacle to this goal?
            </p>
            <input 
                className='input'
                key={'input1'}
                name={'input1'}
                value={firstInput.selected}
                placeholder={''}
                onChange={firstInput.onChange}
            />
            <p>When this happens what will you do about it?</p>
            <input 
                className='input'
                key={'input2'}
                name={'input2'}
                value={secondInput.selected}
                placeholder={''}
                onChange={secondInput.onChange}
            />            
        </Card>
    );
}

export default OnTrack;