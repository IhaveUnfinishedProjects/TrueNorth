import Header from './layouts/Header/Header.js';
import HomePageContent from "./pages/Home/Home.js";
import { GoalCreation, GoalPlanning, GoalView, GoalDetail, GoalReview, ReviewDetail } from '@pages/index.js';
import { fetchUser, AuthScreen } from './features/index.js';
import { useGoBack } from '@hooks/index.js';
import { Spinner } from '@components/index.js';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { BackgroundURL } from '@assets/index.js';
import { type User } from '@root/lib/index.js';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    const changeUser = (value: User | null) => {
        setUser(value);
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    },[])

    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <AuthScreen changeUser={changeUser}/>
    }

    return (
        <>
            <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>
            <main 
                className="min-h-screen bg-cover" 
                style={{ 
                    marginTop: `${headerHeight * 2}`,
                    backgroundImage: `url(${BackgroundURL})`,
                }}>  
                    <Routes>
                        <Route path="/" element={<HomePageContent />} />
                        <Route path="/CreateGoal/:curParentId?" element={<GoalCreation/>} />
                        <Route path="/EditGoal/:curParentId" element={<GoalCreation/>} />
                        <Route path="/PlanGoal/:curParentId" element={<GoalPlanning/>} />
                        <Route path="/GoalView" element={<GoalView/>} />
                        <Route path="/GoalDetail/:goalId" element={<GoalDetail/>} />
                        <Route path="/GoalReview" element={<GoalReview />} />
                        <Route path="/ReviewDetail/:goalId" element={<ReviewDetail />} />
                    </Routes>
            </main>
        </>
    )
}

export default App;