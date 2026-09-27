import { useState, useRef, useEffect } from "react";
import "./component.css";

const Signup = ({ onActivity, onLogin, prefillUsername, resetPrefill }) => {
    /* Fields */
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    /* Messages */
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    /* Card switching */
    const [lastOnlogin, setLastOnlogin] = useState(onLogin);
    /* Refernce to username input - needed to focus on switch */
    const usernameRef = useRef(null);

    /* Clear card when typing in Login */
    if (lastOnlogin !== onLogin) {
        setLastOnlogin(onLogin);
        if (onLogin) {
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");
            setErrors({});
            setMessage("");
            setMessageType("");
            onActivity(false);
        }
    }

    /* Fill username from login and focus it */
    useEffect(() => {
        if (prefillUsername) {
            setUsername(prefillUsername);
            usernameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            usernameRef.current?.focus();
            resetPrefill();
        }
    }, [prefillUsername, resetPrefill]);

    /* Submit form */
    const handleSubmit = async (event) => {
        event.preventDefault();

        /* Required fields empty - POST request still sent as per pa2 requirements */
        const fieldEmpty = {
            firstname: !firstname,
            lastname: !lastname,
            username: !username,
            password: !password
        };
        setErrors(fieldEmpty);

        try {
            /* POST Request */
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
                setErrors({});
            } else {
                /* add failed */
                if (data.message.toLowerCase().includes("user")) setErrors({ username: true });
                setMessageType("error");
            }
        }
        catch (error) {
            setMessage("Could not connect to server");
            setMessageType("error");
            console.error(error);
        }
    };

    /* JSX */
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
                    className={errors.firstname ? "invalid" : ""}
                    onChange={(event) => {
                        onActivity(true);
                        setFirstName(event.target.value);
                        if (errors.firstname) setErrors((prev) => ({ ...prev, firstname: false }));
                    }}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    className={errors.lastname ? "invalid" : ""}
                    onChange={(event) => {
                        onActivity(true);
                        setLastName(event.target.value);
                        if (errors.lastname) setErrors((prev) => ({ ...prev, lastname: false }));
                    }}
                />
                <input 
                    ref={usernameRef}
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
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default Signup;