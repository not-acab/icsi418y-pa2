import { useState } from "react";
import "./component.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        const fieldEmpty = {
            username: !username,
            password: !password
        };
        setErrors(fieldEmpty);

        try {
            /* POST Request */
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            setPassword("");
            setMessage(data.message);

            if (response.ok) {
                setMessageType("success");
                setErrors({});
            } else {
                setMessageType("error");
                newUser: {
                    if (data.message.includes("does not exist")) {
                        setErrors({ username: true });
                        break newUser;
                    }
                    setErrors({ password: true });
                }
            }
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
                    className={errors.username ? "invalid" : ""}
                    onChange={(event) => {
                        setUsername(event.target.value)
                        if (errors.username) setErrors((prev) => ({ ...prev, username: false }));
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className={errors.password ? "invalid" : ""}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
                    }}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default Login;