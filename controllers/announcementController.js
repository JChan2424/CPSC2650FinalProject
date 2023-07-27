// Imports
const util = require("../models/util.js");
const config = require("../server/config/config");
// const announcement = require("../models/announcement"); 
const client = util.getMongoClient();
const express = require("express");
const announcementController = express.Router();

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

