const util = require('../models/util.js')
const express = require('express')
const config = require('../server/config/config.js');

const homeController = express.Router()

const options = {
    root: config.ROOT
};

homeController.get('/', util.logRequest, (req,res) => {
    res.sendFile('index.html', options)
})
homeController.get('/index.html', util.logRequest, (req,res) => {
    res.sendFile('index.html', options)
})
homeController.get('/view-announcements',util.logRequest, (req,res) => {
    res.sendFile('/index.html', options)
})
homeController.get('/login',util.logRequest, (req,res) => {
    res.sendFile('/index.html', options)
})
homeController.get('/register',util.logRequest, (req,res) => {
    res.sendFile('/index.html', options)
})
homeController.get('/create-announcement',util.logRequest, (req,res) => {
    res.sendFile('/index.html', options)
})
homeController.get('/error',util.logRequest, (req,res) => {
    res.sendFile('/index.html', options)
})

module.exports = homeController