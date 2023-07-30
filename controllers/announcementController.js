// Imports
const util = require("../models/util.js");
const Announcement = require("../models/announcement");
const client = util.getMongoClient();
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const announcementController = express.Router();

// Custom Middleware

const validateAnnoucement = (req, res, next) => {

  if (req.body.topic == null) {
    req.body.topic = "general";
  } else {
    req.body.topic = req.body.topic.toLowerCase();
  }

  if (req.body.message == null) {
    res.status(400);
    return res.send("Message is required");
  }

  if (req.body.author == null) {
    res.status(400);
    return res.send("Author is required");
  }

  req.body.date = new Date().toISOString();

  next();
};

// Routes

// returns all announcements
announcementController.get(
  "/api/announcements",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let announcements = await util.find(collection, {});
    res.status(200).json(announcements);
  }
);

// returns announcement by id
announcementController.get(
  "/api/announcements/:id",
  util.logRequest,
  async (req, res, next) => {

    let collection = client.db().collection("Announcements");

    console.log("Requested: " + req.params.id);

    let announcement = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    res.status(200).json(announcement);
  }
);

//  returns announcement by topic
announcementController.get(
  "/api/announcements/topic/:topic",
  util.logRequest,
  async (req, res, next) => {

    let collection = client.db().collection("Announcements");

    console.log("Requested: " + req.params.topic);

    let announcement = await util.find(collection, { topic: req.params.topic.toLowerCase() });
    res.status(200).json(announcement);
  }
);

// returns last x announcements
announcementController.get(
  "/api/announcements/last/:count",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let announcements = await util.find(
      collection,
      {},
      { limit: parseInt(req.params.count) }
    );
    res.status(200).json(announcements);
  }
);

// !! TODO: subscribe (subscribe to a topic)
// announcementController.post(
//   "/api/announcements/subscribe/:topic",
//   util.logRequest,
//   async (req, res, next) => {
//     let collection = client.db().collection("Announcements");

//     // TODO: Need to plan database structure for subscriptions
//     res.status(200).json(result);
//   }
// );

// create announcement
announcementController.post(
  "/api/announcements",
  validateAnnoucement,
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let ann = new Announcement(req.body.title, req.body.message, req.body.topic, req.body.author);

    let result = await util.insertOne(collection, ann);
    res.status(200).json(result);
  }
);

// delete announcement by id
announcementController.delete(
  "/api/announcements/:id",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let result = await util.deleteOne(collection, { _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  }
);

module.exports = announcementController;