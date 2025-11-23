import Header from './layouts/Header/Header.js';
import HomePageContent from "./pages/Home/Home.js";
import GoalCreation from './pages/GoalCreation/GoalCreation.js';
import GoalPlanning from './pages/GoalPlanning/GoalPlanning.js';

import { useState } from "react";
import { Routes, Route, Link } from 'react-router';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 

    return (
        <>
            <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>
            <main className="min-h-screen bg-[url('src/assets/background.svg')] bg-cover" style={{ marginTop: `${headerHeight * 2}` }}>  
                <Routes>
                    <Route path="/" element={<HomePageContent />} />
                    <Route path="/CreateGoal" element={<GoalCreation />} />
                    <Route path="/PlanGoal" element={<GoalPlanning />} />
                </Routes>
            </main>
        </>
    )
}

export default App;