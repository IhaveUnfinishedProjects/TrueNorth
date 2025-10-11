import Header from './components/Header/Header.js';
import { useState } from "react"
function App() {

    const [headerHeight, setHeaderHeight] = useState(0); 

    return (
        <div className="bg-[#F6E7CB]">
            <Header onHeightMeasured={({height}) => setHeaderHeight(height)}/>
            <main style={{ marginTop: `${headerHeight}` }}>
                <div className="min-h-screen bg-[url('/src/assets/background.svg')] bg-cover bg-center"></div>
            </main>
        </div>
    )
}

export default App;