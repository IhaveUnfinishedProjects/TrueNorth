import { Audio } from 'react-loader-spinner';
import './auth.css';

function Spinner() {
    return (
        <div className="spinner-div">
            <Audio
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    )
}

export default Spinner;