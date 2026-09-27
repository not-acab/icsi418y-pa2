import { useState } from "react";
import "./component.css";

const Login = ({ onActivity, onSignup, userNotFound }) => {
    /* Fields */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    /* Messages */
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    /* Card switching */
    const [lastOnSignup, setLastOnSignup] = useState(onSignup);
    /* Hyperlink to signup */
    const [showSignupLink, setShowSignupLink] = useState(false);

    /* Clear card when typing in Signup */
    if (lastOnSignup !== onSignup) {
        setLastOnSignup(onSignup);
        if (onSignup) {
            setUsername("");
            setPassword("");
            setMessage("");
            setMessageType("");
            setErrors({});
            setShowSignupLink(false);
            onActivity(false)
        }
    }

    /* Submit Form */
    const handleSubmit = async (event) => {
        event.preventDefault();

        /* Required fields empty - POST request still sent as per pa2 requirements */
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
                setShowSignupLink(false);
            } else {
                setMessageType("error");
                if (data.message.toLowerCase().includes("user")) {
                    setErrors({ username: true });
                    setShowSignupLink(true);

                } else {
                    setErrors({ password: true });
                    setShowSignupLink(false);
                }
            }
        }
        catch (error) {
            setMessage("Could not connect to the server");
            setMessageType("error");
            setShowSignupLink(false);
            console.error(error);

        }
    };

    /* JSX */
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
                        onActivity(true);
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
                        onActivity(true);
                        setPassword(event.target.value)
                        if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
                    }}
                />
                <button type="submit">Login</button>
            </form>
            /* Overwrites message with a hyperlink to Signup */
            {message && (
                <p className={`message ${messageType}`}>
                    {showSignupLink ? (
                        <>That user does not exist.{" "}
                            <a href="#signup"
                                className="message-link"
                                onClick={(event) => {
                                    event.preventDefault();
                                    userNotFound(username);
                                }}
                            >Did you mean to Signup?
                            </a>
                        </>
                    ) : (message)}
                </p>
            )}
        </div>
    );
};

export default Login;