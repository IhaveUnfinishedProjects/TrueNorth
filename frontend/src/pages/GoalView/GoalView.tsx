import '@root/index.css';
import './GoalView.css';
import { getGoals, getLeafGoals, type CompleteGoal } from '@features/goals/index.js';
import { getColour } from './components/index.js';
import { useFormatDate } from '@hooks/index.js';


export const GoalView = () => {

    // Given a list of goals, which defaults to all of them we want to display a card for each
    const goals: CompleteGoal[] = getLeafGoals();
    const { formatISO8601 } = useFormatDate();

    return (
        <>
            <h1 className="headerGoal"> Goals Overview </h1>
            <div className='CardContainer'>
                {goals.map((goal, index) => (
                    <div className={`GoalViewCard ${getColour(index)}`}>
                        <h2 className='GoalViewH2'>{goal.goalName}</h2>
                        <p>{goal.desiredAchievement}</p>
                        <p>{goal.importance}</p>
                        {goal.achievementDate && <p>Due: {formatISO8601({dateObj: goal.achievementDate, dateStyle: 'medium'}) ?? goal.achievementDate}</p>}

                    </div>
                ))}
            </div>
        </>
    );
}

export default GoalView;