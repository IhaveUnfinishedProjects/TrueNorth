import { Card } from "@components/ui/index.js";
import { useInput } from "@hooks/index.js";
import { login } from './index.js';
import './auth.css';
import type { User } from "@root/lib/index.js";

interface AuthScreenProps {
    changeUser: (value: User | null) => void;
}

const AuthScreen = ({changeUser}: AuthScreenProps) => {
    const usernameInput = useInput();
    const passwordInput = useInput();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await login({username: usernameInput.selected, password: passwordInput.selected});
            changeUser(response);
        } catch (error){
            console.warn(error);
        }
    }
    
    return(
        <Card className='auth-screen'>
            <form 
                className='input-form'
                onSubmit={handleSubmit}
            >
                <p>Username</p>
                <input 
                    className="input"
                    key="username"
                    name="username"
                    value={usernameInput.selected}
                    placeholder="Username"
                    onChange={usernameInput.onChange}
                />
                <p>Password</p>
                <input 
                    className="input"
                    key="password"
                    name="password"
                    type="password"
                    value={passwordInput.selected}
                    placeholder="Password"
                    onChange={passwordInput.onChange}
                />
                <button className='login'>Log In</button>
                <div className='sign-up'>
                    <p>Don't have an account?</p>
                    <button>Sign up</button>
                </div>
            </form>
        </Card>
    );
}

export default AuthScreen;