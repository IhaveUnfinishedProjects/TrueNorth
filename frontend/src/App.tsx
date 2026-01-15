import Header from './layouts/Header/Header.js';
import HomePageContent from "./pages/Home/Home.js";
import { GoalCreation, GoalPlanning, GoalView, GoalDetail, GoalReview, ReviewDetail } from '@pages/index.js';
import { fetchUser, AuthScreen } from '@features/index.js';
import { Spinner } from '@components/index.js';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { BackgroundURL } from '@assets/index.js';
import { useUser, useLoading } from '@hooks/index.js';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 
    const { user, login } = useUser.getState();
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
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
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Spinner />
                </div>
            )}

            {user && <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>}
            
            <main 
                className="min-h-screen bg-cover" 
                style={{ 
                    marginTop: `${headerHeight * 2}`,
                    backgroundImage: `url(${BackgroundURL})`,
                }}>  
                    {!user ? <AuthScreen />
                        :<Routes>
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