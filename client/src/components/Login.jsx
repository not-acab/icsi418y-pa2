import { useState } from "react";
import "./component.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try { /* POST Request */
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            setPassword("");
            setMessage(data.message);
            setMessageType(response.ok ? "success" : "error");
        } 
        catch (error) {
            setMessage("Could not connect to the server");
            setMessageType("error");
            console.error(error);

        }
    };

    return (
        <div className="card">
            <h2>Login
                <span className="subtitle">-If you're a returning user</span>
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default Login;