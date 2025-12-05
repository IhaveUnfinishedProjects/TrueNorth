import '@root/index.css';
import './GoalView.css';
import { getLeafGoals, type CompleteGoal } from '@features/goals/index.js';
import { GoalCard } from '@features/goals/index.js';


export const GoalView = () => {

    /** All leaf goals as a Map<id, goal> for quick lookup */
    const goals: Map<string, CompleteGoal> = getLeafGoals();
    const leafGoals: CompleteGoal[] = [...goals.values()];
    /** Allows formatting of the date strings */

    return (
        <>
            <h1 className="headerGoal"> Goals Overview </h1>
            {true && <GoalCard goals={leafGoals}/>}
        </>
    );
}

export default GoalView;