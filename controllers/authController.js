const util = require("../models/util.js");
const config = require("./config/config.js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const authController = express.Router();

authController.get("/api/signup", util.logRequest, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        return res.send("Username and password are required");
    }

    const user = new User({
        username: username,
        password: password,
    });

    let collection = client.db().collection("Users");
    let result = await util.insertOne(collection, user);
    res.status(200).json(result);
});

authController.post("/api/login", util.logRequest, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status("402").json({ message: "Username and password are required" });
    }

    let collection = client.db().collection("Users");

    let result = await util.findOne(collection, {
        username: username,
        password: password,
    });

    if (result == null) {
        return res.status(401).send('Invalid credentials');
    }

    let role = result.role;

    const token = jwt.sign({ username: username, role: role}, config.SECRET, {
        expiresIn: config.SESSION_LENGTH,
    });

    res.status(200).json({ token: token });
});

authController.post('/api/verify', util.logRequest, (req, res) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403);
    }

    jwt.verify(token, config.SECRET, (err, decoded) => {
        
        if (err) {
            return res.status(401).send('Failed to authenticate token');
        }

        // Add this to prevent spoofing
        if (req.role != decoded.role) {
            return res.status(402).send('Mismatched role');
        }

        return res.json({ message: 'You are authenticated' });
    });

});

module.exports = authController;