import { type CompleteGoal } from '@features/index.js';
import { getBreadCrumb, getColour } from './components/index.js';
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
            <h1 className="headerGoal"> Goals Overview </h1>
            {goals.map((goal, index) => (
                <div key={goal.id} onClick={() => navigate(`/GoalDetail/${goal.id}`)} className={`GoalViewCard ${getColour(index)}`}>
                    <div>
                        <p className='goal-card-crumb break-words'> {getBreadCrumb({goal, goals})}</p>
                        <h2 className='GoalViewH2 break-words'>{goal.goalName}</h2>
                    </div>
                    <p className='break-words'>{goal.desiredAchievement}</p>
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