import Header from './components/Header/Header.js';
import HomePageContent from "./components/MainHomePageContent/HomePageContent.js";
import GoalCreation from './components/CreateGoal/GoalCreation.js';
import { useState } from "react";
import { Routes, Route, Link } from 'react-router';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 

    return (
        <>
            <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>
            <main className="min-h-screen bg-[url('/src/assets/background.svg')] bg-cover pt-20" style={{ marginTop: `${headerHeight * 2}` }}>  
                <Routes>
                    <Route path="/" element={<HomePageContent />} />
                    <Route path="/CreateGoal" element={<GoalCreation />} />
                </Routes>
            </main>
        </>
    )
}

export default App;