import { useState, } from "react";
import reactLogo from "../assets/react.svg";
import mongoLogo from "../assets/mongodb.svg";
import Signup from "../components/Signup";
import Login from "../components/Login";
import "./App.css";

const App = () => {
    /* Shared states */
    const [prefillUsername, setPrefillUsername] = useState("");
    const [signupActivity, setSignupActivity] = useState(false);
    const [loginActivity, setLoginActivity] = useState(false);

    /* JSX */
    return (
        <div className="page">
            <header className="page-header">
                <h1>Project 2 - Accounts</h1>
                <p>Create an account or Sign in.</p>
            </header>
            <div className="auth">
                <Signup
                    onActivity={setSignupActivity}
                    onLogin={loginActivity}
                    prefillUsername={prefillUsername}
                    resetPrefill={()=>setPrefillUsername("")}
                />
                <span className="auth-divider">-or-</span>
                <Login
                    onActivity={setLoginActivity}
                    onSignup={signupActivity}
                    userNotFound={setPrefillUsername}
                />
            </div>
            <footer className="tech-stack">
                <div className="tech-stack-row">
                    <img src={reactLogo} alt="" className="tech-stack-logo" />
                    <span>Built with React</span>
                </div>
                <div className="tech-stack-row">
                    <img src={mongoLogo} alt="" className="tech-stack-logo" />
                    <span>Powered by MongoDB</span>
                </div>
            </footer>
        </div>
    );
};

export default App;