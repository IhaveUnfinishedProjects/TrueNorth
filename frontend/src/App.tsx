import Header from './layouts/Header/Header.js';
import HomePageContent from "./pages/Home/Home.js";
import { GoalCreation, GoalPlanning, GoalView, GoalDetail, GoalReview, ReviewDetail } from '@pages/index.js';
import { fetchUser, AuthScreen } from './features/index.js';
import { Spinner } from '@components/index.js';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { BackgroundURL } from '@assets/index.js';
import { useUser } from '@hooks/useUser.js';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 
    const { user, login } = useUser();
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await fetchUser();
                login(userData);
            } catch (error) {
                login(null);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    },[])

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            {user && <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>}
            <main 
                className="min-h-screen bg-cover" 
                style={{ 
                    marginTop: `${headerHeight * 2}`,
                    backgroundImage: `url(${BackgroundURL})`,
                }}>  
                    {!user ? 
                        <AuthScreen />
                        :user &&
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
                    }
            </main>
        </>
    )
}

export default App;