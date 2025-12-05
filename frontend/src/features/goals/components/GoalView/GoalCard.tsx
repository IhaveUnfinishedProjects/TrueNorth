import { getAncestor, getLeafGoals, type CompleteGoal } from '@features/goals/index.js';
import { getColour } from './components/index.js';
import { useFormatDate, useAppNavigate } from '@hooks/index.js';
import { MdCalendarToday } from "react-icons/md";


interface GoalCardProps {
    /** The goals to display */
    goals: CompleteGoal[];
}

export const GoalCard = ({goals}: GoalCardProps) => {

    const navigate = useAppNavigate();
    const { formatISO8601 } = useFormatDate();

    return (
        <div className='CardContainer'>
            {goals.map((goal, index) => (
                <div onClick={() => navigate(`/GoalDetail/${goal.id}`)} className={`GoalViewCard ${getColour(index)}`}>
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
    );
}

export default GoalCard;