const util = require('../models/util.js');
const express = require('express');
const client = util.getMongoClient();
const utilController = express.Router();

utilController.get("/api/search/:term", util.logRequest, async (req, res, next) => {

    let collection = client.db().collection("Announcements");

    let results = [];

    await collection.find({}).forEach((entry) => {
        
        for (let key in entry) {
            if (entry[key].toString().toLowerCase().includes(req.params.term.toLowerCase())) {
                results.push(entry);
                break;
            }
        }
    });

    res.status(200).json({
        success: true,
        data: results
    });
});

module.exports = utilController