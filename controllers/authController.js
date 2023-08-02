const util = require("../models/util.js");
const config = require("./config/config.js");
const client = util.getMongoClient();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const authController = express.Router();

// TODO: Fix Roles
authController.post("/api/register", util.logRequest, async (req, res) => {

    const { username, password, confirmedPassword, invite, role } = req.body;

    if (!username || !password) {
        res.status(400);
        return res.json({ success: false, message: "Username and password are required" });
    }

    let user;
    // TODO: Add hashing here
    password = crypto.createHash("sha1").update(password).digest("hex");
    console.log("Password: " + password);
    if (invite == config.INVITE) {
        user = new User(username, password, role);
    } else {
        user = new User(username, password, "USER");
    }

    if (password != confirmedPassword) {
        res.status(400);
        return res.json({ success: false, message: "Passwords do not match" });
    }

    let collection = client.db().collection("Users");
    let result = await collection.findOne({ username: username });

    if (result != null) {

        res.status(409);
        return res.json({ success: false, message: "Username already exists" });
    }

    try {

        await util.insertOne(collection, user);

        res.status(200).json({
            success: true,
            message: "User created",
        });

    } catch (err) {

        res.status(500);
        return res.json({ success: false, message: "Failed to create user" });
    }
});

authController.post("/api/login", util.logRequest, async (req, res) => {

    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status("402").json({ success: false, message: "Username and password are required" });
    }
    password = crypto.createHash("sha1").update(password).digest("hex");
    // check if credentials are valid
    // TODO: Need to fix this by adding hashing and salting
    let collection = client.db().collection("Users");

    let result = await collection.findOne({ username: username, password: password });

    if (result == null) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    let role = result.role;

    try {
        const token = jwt.sign({ username: username, role: role }, config.SECRET, {
            expiresIn: config.SESSION_LENGTH,
        });

        res.status(200).json({ success: true, token: token, role: role, username: username, role: role });
    }
    catch (err) {
        res.status(500);
        return res.json({ success: false, message: "Failed to create token" });
    }

});

authController.post('/api/verify', util.logRequest, (req, res) => {

    // Check if token is provided and if so get the token
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    // If token is not provided return 403
    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {

        // If token is invalid return 401
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        }

        // If token is valid return 200
        return res.json({ success: true, username: decoded.username, role: decoded.role });
    });

});

module.exports = authController;