// Import dependencies
const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Import custom modules and configuration
const config = require("./config/config.js");
const util = require("../models/util.js");
const User = require("../models/user");

// Initialize MongoDB client and Express Router
const client = util.getMongoClient();
const authController = express.Router();

// Middleware to parse urlencoded bodies and JSON bodies
authController.use(express.urlencoded({ extended: true }));
authController.use(express.json());

// Helper function to validate user input
const verifyInput = (req, res, confirmPassword = false) => {
    const { username, password, confirmedPassword } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        res.status(400);
        return {
            success: false,
            message: "Username and password are required",
        };
    }

    // If confirmation of password is required, check if passwords match
    if (confirmPassword && password != confirmedPassword) {
        res.status(400);
        return { success: false, message: "Passwords do not match" };
    }

    return null;
};

// Route to register a new user
authController.post("/api/register", util.logRequest, async (req, res) => {
    // Validate input
    let response = verifyInput(req, res, true);
    if (response) return res.json(response);

    const { username, password, invite, role } = req.body;
    let collection = client.db().collection("Users");

    // Check if username already exists
    let result = await collection.findOne({ username: username });
    if (result != null) {
        res.status(409);
        return res.json({ success: false, message: "Username already exists" });
    }

    // Hash password for secure storage
    let hashedPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

    // Create new user instance

    if (invite != config.INVITE_CODE) {
        return res.status(401).json({ success: false, message: "Invalid invite code" });
    }
    
    let user =new User(username, hashedPassword, role)

    // Attempt to insert the new user into the database
    try {
        await util.insertOne(collection, user);
        return res.status(200).json({ success: true, message: "User created" });
    } catch (err) {
        // In case of error, return a failure message
        res.status(500);
        return res.json({ success: false, message: "Failed to create user" });
    }
});

// Route to login a user
authController.post("/api/login", util.logRequest, async (req, res) => {
    // Validate input
    let response = verifyInput(req, res);
    if (response) return res.json(response);

    const { username, password } = req.body;
    let hashedPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

    // Attempt to find user in the database
    let collection = client.db().collection("Users");
    let result = await collection.findOne({
        username: username,
        password: hashedPassword,
    });

    // If user not found, return a failure message
    if (result == null) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
    }

    // If user found, proceed with generating a token
    let role = result.role;
    try {
        const token = jwt.sign(
            { username: username, role: role },
            config.SECRET,
            { expiresIn: config.SESSION_LENGTH }
        );
        res.status(200).json({
            success: true,
            token: token,
            role: role,
            username: username,
        });
    } catch (err) {
        // In case of error, return a failure message
        res.status(500);
        return res.json({ success: false, message: "Failed to create token" });
    }
});

// Route to verify user token
authController.post("/api/verify", util.logRequest, (req, res) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];

    // If no token provided, return a failure message
    if (!token) {
        return res
            .status(403)
            .json({ success: false, message: "No token provided" });
    }

    // Attempt to verify the token
    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            // If token is invalid, return a failure message
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Failed to authenticate token",
                });
        }
        // If token is valid, return success message with username and role
        return res.json({
            success: true,
            username: decoded.username,
            role: decoded.role,
        });
    });
});

// Export the authController for use in other modules
module.exports = authController;
