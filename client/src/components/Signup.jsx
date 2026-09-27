import { useState } from "react";
import "./component.css";

const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try { /* POST Request */
            const response = await fetch ("http://localhost:9000/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ firstname, lastname, username, password })
            });
            const data = await response.json();

            setMessage(data.message);
            if (response.ok) {
                setMessageType("success");
                setFirstName("");
                setLastName("");
                setUsername("");
                setPassword("");
            }
            else setMessageType("error");
        }
        catch (error) {
            setMessage("Could not connect to server");
            setMessageType("error");
            console.error(error);
        }
    };

    return (
        <div className="card">
            <h2>Sign Up
                <span className="subtitle">-If it's your first time here</span>
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(event) => setLastName(event.target.value)}
                />
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
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default Signup;