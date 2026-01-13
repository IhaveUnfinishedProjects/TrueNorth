import '@root/index.css';
import './GoalView.css';
import { getLeafGoals, type CompleteGoal } from '@features/index.js';
import { GoalCard } from '@features/index.js';
import { useLoading } from '@hooks/index.js';
import { useEffect, useState } from 'react';


export const GoalView = () => {

    const { loading, setLoading } = useLoading.getState();
    const [goals, setGoals] = useState<CompleteGoal[]>()

    useEffect(() => {
        const loadGoals = async () => {
            try {
                setLoading(true)
                const leafGoalsMap: Map<string, CompleteGoal> = await getLeafGoals()
                const leafGoals: CompleteGoal[] = leafGoalsMap.values().toArray();
                setGoals(leafGoals);
            } catch (error) {
                console.warn(error);
            } finally {
                setLoading(false);
            }
        }
        loadGoals();
    }, [])

    if (loading || !goals) {return null;}
    return (
        <>
            <h1 className="headerGoal"> Goals Overview </h1>
            {true && <GoalCard goals={goals}/>}
        </>
    );
}

export default GoalView;