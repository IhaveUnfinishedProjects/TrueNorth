import Header from './layouts/Header/Header.js';
import HomePageContent from "./pages/Home/Home.js";
import { GoalCreation, GoalPlanning, GoalView } from '@pages/index.js';

import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { BackgroundURL } from '@assets/index.js';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 

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
                    </Routes>
            </main>
        </>
    )
}

export default App;