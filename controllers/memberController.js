const util = require('../models/util.js')
const config = require("../server/config/config")
const Post = require("../models/post")
const client = util.getMongoClient()
const express = require('express')
const memberController = express.Router()
memberController.get('/member', util.logRequest, async (req, res, next) => {
    console.info('Inside member.html')
    let collection = client.db().collection('Posts')
    let post = Post('Security','AAA is a key concept in security','Pentester')
    util.insertOne(collection, post)
    res.sendFile('member.html',{ root: config.ROOT})
})
// HTTP GET
memberController.get('/posts', util.logRequest, async (req, res, next) => {
    let collection = client.db().collection('Posts')
    let posts = await util.find(collection, {})
    //Utils.saveJson(__dirname + '/../data/topics.json', JSON.stringify(topics))
    res.status(200).json(posts)
    
})
memberController.get('/postMessage', util.logRequest, async (req, res, next) => {
    res.sendFile('postMessage.html',{ root: config.ROOT})
       
})
// HTTP POST
memberController.post('/addPost', util.logRequest, async (req, res, next) => {
    let collection = client.db().collection('Posts')
    let topic = req.body.topic
    let message = req.body.message
    let user = req.body.by
    let post = Post(topic,message,user)
    util.insertOne(collection, post)
   
    // res.json(
    //     {
    //         message: `You post was added to the ${topic} forum`
    //     }
    // )
    //Utils.saveJson(__dirname + '/../data/posts.json', JSON.stringify(posts))
    res.redirect('/posts.html')
})



module.exports = memberController