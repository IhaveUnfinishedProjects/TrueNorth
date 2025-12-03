import '@root/index.css';
import './GoalView.css';
import { Card } from '@root/components/ui/index.js';
import { getGoals, type CompleteGoal } from '@root/features/goals/index.js';


export const GoalView = () => {

    // Given a list of goals, which defaults to all of them we want to display a card for each
    const goals: CompleteGoal[] = getGoals();

    return (
        <div className='CardContainer'>
            {goals.map(goal => (
                <Card key={goal.id}>
                    <div className='GoalViewCard'>
                        <h1>{goal.goalName}</h1>
                        <p>{goal.desiredAchievement}</p>
                        <p>{goal.importance}</p>
                        
                        {goal.achievementDate && <p>Due: {goal.achievementDate}</p>}

                    </div>
                </Card>
            ))}
        </div>
    );
}

export default GoalView;