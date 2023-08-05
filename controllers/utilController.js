// Import dependencies
const util = require('../models/util.js');
const express = require('express');

// Retrieve MongoDB client
const client = util.getMongoClient();

// Create express router
const utilController = express.Router();

utilController.get("/api/search/:term", util.logRequest, async (req, res, next) => {

    // Get the "Announcements" collection
    let collection = client.db().collection("Announcements");


    // Search the collection
    let results = [];

    await collection.find({}).forEach((entry) => {
        
        for (let key in entry) {
            if (entry[key].toString().toLowerCase().includes(req.params.term.toLowerCase())) {
                results.push(entry);
                break;
            }
        }
    });

    // Respond with the search results
    res.status(200).json({
        success: true,
        data: results
    });
});

module.exports = utilController