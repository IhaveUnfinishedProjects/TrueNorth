import '@root/index.css';
import './GoalView.css';
import { getAncestor, getLeafGoals, type CompleteGoal } from '@features/goals/index.js';
import { getColour } from './components/index.js';
import { useFormatDate, useAppNavigate } from '@hooks/index.js';
import { MdCalendarToday } from "react-icons/md";


export const GoalView = () => {

    /** All leaf goals as a Map<id, goal> for quick lookup */
    const goals: Map<string, CompleteGoal> = getLeafGoals();
    const leafGoals: CompleteGoal[] = [...goals.values()];
    /** Allows formatting of the date strings */
    const { formatISO8601 } = useFormatDate();
    const navigate = useAppNavigate();

    return (
        <>
            <h1 className="headerGoal"> Goals Overview </h1>
            <div className='CardContainer'>
                {leafGoals.map((goal, index) => (
                    <div onClick={() => navigate(`GoalDetail/${goal.id}`)} className={`GoalViewCard ${getColour(index)}`}>
                        <div>
                            <p className='breadCrumb'> {getAncestor(goal.id)?.goalName + ' > ' + goal.goalName + ' >'}</p>
                            <h2 className='GoalViewH2'>{goal.goalName}</h2>
                        </div>
                        <p>{goal.desiredAchievement}</p>
                        <div className='flex flex-row items-center gap-[0.5rem]'>
                            <MdCalendarToday/>
                            {goal.achievementDate && <p>Due: {formatISO8601({dateObj: goal.achievementDate, dateStyle: 'medium'}) ?? goal.achievementDate}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GoalView;