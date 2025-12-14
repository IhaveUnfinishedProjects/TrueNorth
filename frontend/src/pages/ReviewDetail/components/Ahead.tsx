import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';
import { useInput } from '@hooks/index.js';

interface AheadProps {
    goal: CompleteGoal;
}
export const Ahead = ({goal}: AheadProps) => {   

    const firstInput = useInput();
    const secondInput = useInput();
    
    return(
        <Card className='review-detail-card ahead-track-card'>
            <h2>Ahead of progress</h2>
            <p>Awesome! I did more than I thought I could. Even though I'm ahead, how could I do better next week?</p>
            <input 
                className='input'
                key={'input1'}
                name={'input1'}
                value={firstInput.selected}
                placeholder={''}
                onChange={firstInput.onChange}
            />
            <p>Set a new target for next week (optional)</p>
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

export default Ahead;