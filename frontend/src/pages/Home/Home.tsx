import "@root/index.css";
import "./Home.css";
import FeatureCard from "./components/FeatureCard.js";
import { featureCardData } from './components/config.js'
import { useUser } from '@hooks/index.js';

/* 
    The page is dedicated to returning the content for home page feature cards.
    It defines the content data type, sets it statically, and passes it into 
    <FeatureCard {*props*} /> to render the card itself. 
*/

export const HomePageContent = () => {

    const user  = useUser((state) => state.user);

    return (
        /**
         * Maps the FeatureCardData array & passes it's items as props 
         * to the <FeatureCard /> component to be rendered.  
         */ 
         
        <div className="flex flex-col items-center py-5 space-y-14">
            <h1 className="welcome-text" >Welcome back, <span style={{ textTransform: "capitalize" }}>{user?.username ?? 'User'}</span></h1>
            {featureCardData.map((data, index) => (
                <FeatureCard 
                    key={index}
                    title={data.title}
                    details={data.details}
                    link={data.link}
                    SvgImage={data.SvgImage}
                    buttonText={data.buttonText}
                />
            ))}
        </div>
    );
}

export default HomePageContent;