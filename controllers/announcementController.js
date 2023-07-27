// Imports
const util = require("../models/util.js");
const config = require("../server/config/config");
const Announcement = require("../models/announcement");
const client = util.getMongoClient();
const express = require("express");
const announcementController = express.Router();

const validateAnnoucement = (req, res, next) => {
  if (req.body.topic == null) {
    req.body.topic = "general";
  }

  if (req.body.message == null) {
    res.status(400);
    return res.send("Message is required");
  }

  if (req.body.author == null) {
    res.status(400);
    return res.send("Author is required");
  }

  req.body.date = new Date();

  next();
};

// getAll
announcementController.get(
  "/api/announcements",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let announcements = await util.find(collection, {});
    res.status(200).json(announcements);
  }
);

// getById
announcementController.get(
  "/api/announcements/:id",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let announcement = await util.findOne(collection, { _id: req.params.id });
    res.status(200).json(announcement);
  }
);

// getByTopic
announcementController.get(
  "/api/announcements/topic/:topic",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let announcement = await util.findOne(collection, {
      topic: req.params.topic,
    });
    res.status(200).json(announcement);
  }
);

// getByLastX (Last x announcements)
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

// addAnnouncement
announcementController.post(
  "/api/announcements",
  validateAnnoucement,
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let ann = new Announcement(
      req.body.topic,
      req.body.message,
      req.body.author,
      req.body.date
    );

    let result = await util.insertOne(collection, ann);
    res.status(200).json(result);
  }
);

// deleteAnnouncement
announcementController.delete(
  "/api/announcements/:id",
  util.logRequest,
  async (req, res, next) => {
    let collection = client.db().collection("Announcements");

    let result = await util.deleteOne(collection, { _id: req.params.id });
    res.status(200).json(result);
  }
);
