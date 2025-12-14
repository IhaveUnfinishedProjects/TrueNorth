import { Card } from '@components/ui/index.js';
import type { CompleteGoal } from '@root/features/goals/index.js';
import { useInput } from '@hooks/index.js';
import { FIRST_INPUT_NAME, SECOND_INPUT_NAME} from './index.js';

interface BehindProps {
    goal: CompleteGoal;
}
export const Behind = ({goal}: BehindProps) => {
    const ID: string = goal.id + "behind";
    const firstInput = useInput();
    const secondInput = useInput();
    

    return(
        <Card className='review-detail-card'>
            <h2>Behind progress</h2>
            <p><b>Focusing on what I can do:</b> Here's what I said I'd achieve:</p>
            <p className='quote'><i>"{goal.desiredAchievement}"</i></p>
            <p>Picture working toward success. What get's in your way?</p>

            <input 
                className='input'
                key={FIRST_INPUT_NAME}
                name={FIRST_INPUT_NAME}
                value={firstInput.selected}
                placeholder={''}
                onChange={firstInput.onChange}
            />
            <p>How do you get around this?</p>
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
}

export default Behind;