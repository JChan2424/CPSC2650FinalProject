// Imports
const util = require("../models/util.js");
const Announcement = require("../models/announcement");
const client = util.getMongoClient();
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const announcementController = express.Router();

// Custom Middleware
const validateAnnoucement = (req, res, next) => {
    req.body.topic = req.body.topic ? req.body.topic.toLowerCase() : "general";
    req.body.date = new Date().toISOString();

    if (req.body.message == null) {
        return res.status(400).json({ message: "Message is required" });
    }
    if (req.body.author == null) {
        return res.status(400).json({ message: "Author is required" });
    }
    if (req.body.title == null) {
        return res.status(400).json({ message: "Title is required" });
    }

    next();
};

// Routes

// Register a new route handler for GET requests to the "/api/announcements" path
announcementController.get(
    "/api/announcements", // The route path

    util.logRequest, // Middleware function that logs the request

    // The route handler function
    async (req, res, next) => {
        // Get the "Announcements" collection from the MongoDB database
        let collection = client.db().collection("Announcements");

        // Use the utility function to find all documents in the "Announcements" collection
        // The {} argument to find means "match all documents"
        let announcements = await util.find(collection, {});

        // Send the found announcements back to the client with a 200 OK status code
        // The result is automatically converted to JSON
        res.status(200).json(announcements);
    }
);

// Get announcement by ID
announcementController.get(
    "/api/announcements/:id",
    util.logRequest, // Middleware to log the request
    async (req, res, next) => {
        // Get the Announcements collection from MongoDB
        let collection = client.db().collection("Announcements");

        // Log the requested ID
        console.log("Requested: " + req.params.id);

        // Find the announcement with the requested ID and return it
        let announcement = await collection.findOne({
            _id: new ObjectId(req.params.id),
        });
        res.status(200).json(announcement);
    }
);

// Get announcements by topic
announcementController.get(
    "/api/announcements/topic/:topic",
    util.logRequest, // Middleware to log the request
    async (req, res, next) => {
        // Get the Announcements collection from MongoDB
        let collection = client.db().collection("Announcements");

        // Log the requested topic
        console.log("Requested: " + req.params.topic);

        // Find all announcements with the requested topic and return them
        let announcement = await util.find(collection, {
            topic: req.params.topic.toLowerCase(),
        });
        res.status(200).json(announcement);
    }
);

// Get the last X announcements
announcementController.get(
    "/api/announcements/last/:count",
    util.logRequest, // Middleware to log the request
    async (req, res, next) => {
        // Get the Announcements collection from MongoDB
        let collection = client.db().collection("Announcements");

        // Find the last X announcements and return them
        let announcements = await util.find(
            collection,
            {},
            { limit: parseInt(req.params.count) }
        );
        res.status(200).json(announcements);
    }
);

// Create an announcement
announcementController.post(
    "/api/announcements",
    validateAnnoucement, // Middleware to validate the announcement data
    util.logRequest, // Middleware to log the request
    async (req, res, next) => {
        // Get the Announcements collection from MongoDB
        let collection = client.db().collection("Announcements");

        // Create a new Announcement object
        let ann = new Announcement(
            req.body.title,
            req.body.message,
            req.body.topic,
            req.body.author
        );

        // Insert the new announcement into the database and return the result
        let result = await util.insertOne(collection, ann);
        res.status(200).json(result);
    }
);

// Delete an announcement by ID
announcementController.delete(
    "/api/announcements/:id",
    util.logRequest, // Middleware to log the request
    async (req, res, next) => {
        // Get the Announcements collection from MongoDB
        let collection = client.db().collection("Announcements");

        // Delete the announcement with the given ID and return the result
        let result = await util.deleteOne(collection, {
            _id: new ObjectId(req.params.id),
        });
        res.status(200).json(result);
    }
);

// Export the announcementController for use in other modules
module.exports = announcementController;
