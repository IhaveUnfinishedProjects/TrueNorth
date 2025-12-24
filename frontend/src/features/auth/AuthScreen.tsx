import { Card } from "@components/ui/index.js";
import { useInput } from "@hooks/index.js";
import { login, signUp } from './index.js';
import './auth.css';
import type { User } from "@root/lib/index.js";
import { useState } from "react";

interface AuthScreenProps {
    changeUser: (value: User | null) => void;
}

const AuthScreen = ({changeUser}: AuthScreenProps) => {
    const usernameInput = useInput();
    const passwordInput = useInput();
    const emailInput = useInput();
    const confirmInput = useInput();
    const [signup, setSignup] = useState(false);
    const [warning, setWarning] = useState("");

    const toggleSignup = () => {
        // Allows the page to toggle between a login & signup
        // without loading a new page
        setSignup(!signup);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (signup && passwordInput !== confirmInput) {
            setWarning("Passwords do not match");
            return;
        }
        
        try {
            const response = signup ? 
                await signUp({username: usernameInput.selected, password: passwordInput.selected, email: emailInput.selected})
                :await login({username: usernameInput.selected, password: passwordInput.selected});
            changeUser(response);
        } catch (error: any){
            setWarning(error.error);
        }
    }
    
    return(
        <Card className='auth-screen'>
            <form 
                className='input-form'
                onSubmit={handleSubmit}
                >   

                {signup &&
                    <>
                        <p>Email</p>
                        <input 
                            className="input"
                            key="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={emailInput.selected}
                            onChange={emailInput.onChange}
                            required
                        />
                    </>
                }

                <p>{signup ? "Username" : "Email or Username"}</p>
                <input 
                    className="input"
                    key="username"
                    name="username"
                    value={usernameInput.selected}
                    placeholder={signup ? "Choose a username" : "Username"}
                    onChange={usernameInput.onChange}
                    required
                />

                <p>Password</p>
                <input 
                    className="input"
                    key="password"
                    name="password"
                    type="password"
                    value={passwordInput.selected}
                    placeholder={signup ? "Create a password" : "Enter your password"}
                    onChange={passwordInput.onChange}
                    required
                />

                {signup &&
                    <>
                        <p>Confirm Password</p>
                        <input 
                            className="input"
                            key="confirm"
                            name="confirm"
                            type="password"
                            value={confirmInput.selected}
                            placeholder="Confirm your password"
                            onChange={confirmInput.onChange}
                            required
                        />
                    </>
}
                <button type="submit" className='login'>{signup ? "Sign Up" : "Log In"}</button>
                <div className='sign-up'>
                    <p>{signup ? "H" : "Don't h"}ave an account?</p>
                    <button type="button" onClick={toggleSignup}>{signup ? "Log In" : "Sign Up"}</button>
                </div>
            </form>
            <p>{warning}</p>
        </Card>
    );
}

export default AuthScreen;