import reactLogo from "../assets/react.svg";
import mongoLogo from "../assets/mongodb.svg";
import Signup from "../components/Signup";
import Login from "../components/Login";
import "./App.css";

const App = () => {
    return (
        <div className="page">
            <header className="page-header">
                <h1>Project 2 Accounts</h1>
                <p>Create an account or Sign in.</p>
            </header>
            <div className="auth">
                <Signup />
                <span className="auth-divider">-or-</span>
                <Login />
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