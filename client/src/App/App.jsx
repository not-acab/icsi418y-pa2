import { useState, } from "react";
import reactLogo from "../assets/react.svg";
import mongoLogo from "../assets/mongodb.svg";
import Signup from "../components/Signup";
import Login from "../components/Login";
import "./App.css";

const App = () => {
    /* Which card has foucs */
    const [activeCard, setActiveCard] = useState("");
    /* { to: "signup" | "login", username }: hand username to other card:  */
    const [message, setMessage] = useState(null);

    /* JSX */
    return (
        <div className="page">
            <header className="page-header">
                <h1>Project 2 - Authentication</h1>
                <p>Create an account or Sign in.</p>
            </header>
            <div className="auth">
                <Signup
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    getMessage={message}
                    sendMessage={setMessage}
                />
                <span className="auth-divider">-or-</span>
                <Login
                    activeCard={activeCard}
                    setActiveCard={setActiveCard}
                    getMessage={message}
                    sendMessage={setMessage}
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