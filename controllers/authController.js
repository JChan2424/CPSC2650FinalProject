const util = require("../models/util.js");
const User = require("../models/user");
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

authController.get("/api/login", util.logRequest, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        return res.send("Username and password are required");
    }

    let collection = client.db().collection("Users");

    let result = await util.findOne(collection, {
        username: username,
        password: password,
    });

    if (result == null) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username: username }, config.SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ token: token });
});

authController.get('/api/verify', util.logRequest, expressJwt({ secret, algorithms: ['HS256'] }), (req, res) => {
    return res.json({ message: 'You are authenticated' });
});