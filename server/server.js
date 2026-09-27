require("dotenv").config();

const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("pa2");
const users = db.collection("users");
const app = express();

const connectDatabase = async() => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
        process.exit(1)
    }
}

app.use(express.json());
app.use(cors());

/* Signup Request */
app.post("/signup", async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    if (!firstname || !lastname || !username || !password) {
        return res.status(400).json({
            message: "All fields are required!"
        });
    }

    try {
        if (await users.findOne({ username })) {
            return res.status(409).json({
                message: "Username already exists!"
            });
        }

        await users.insertOne({
            f_name: firstname,
            l_name: lastname,
            username: username,
            password: password
        });

        res.status(201).json({
            message: "User created successfully."
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

/* Login Request */
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required!"
        });
    }

    try {
        const user = await users.findOne({ username });

        if (!(await users.findOne({ username }))) {
            return res.status(401).json({
                message: "That user does not exist. Did you mean to Signup?"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Incorrect Password."
            });
        }

        res.status(200).json({
            message: "Login successful."
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

/* Health Check Request */
app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

/* Start Server */
connectDatabase();

app.listen(9000, () => {
    console.log("Server running on port 9000");
});