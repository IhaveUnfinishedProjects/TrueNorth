import Header from './components/Header/Header.js';
import HomePageContent from "./components/MainHomePageContent/HomePageContent.js";
import { useState } from "react";
import { Routes, Route, Link } from 'react-router';

function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 

    return (
        <>
            <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>
            <HomePageContent height={headerHeight}/>
        </>
    )
}

export default App;