import { useState } from "react";
import "./component.css";

const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                setMessageType("error");
                if (data.message === "Username already exists!") setErrors({ username: true });
            }
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
                    className={errors.firstname ? "invalid" : ""}
                    onChange={(event) => {
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
                        setLastName(event.target.value);
                        if (errors.lastname) setErrors((prev) => ({ ...prev, lastname: false }));
                    }}
                />
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
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className={`message ${messageType}`}>{message}</p>}
        </div>
    );
};

export default Signup;