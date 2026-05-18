const express = require('express');
const authUser = require('../middleware/auth');

const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/User");


userRouter.get("/user/request/received", authUser, async(req, res)=>{
    try{
         const loggedInUser = req.user._id ;

    const connectionRequest = await ConnectionRequest.findOne({
         toUserId: loggedInUser,
         status:  "interested",
    }).populate("fromUserId", [ "firstName","lastName", "About"])

    res.json({
            message: "Pending requests fetched successfully",
            data: connectionRequest
        });
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }

   

})

userRouter.get('/user/connection', authUser, async(req, res) =>{

    try{

        const loggedInUser = req.user._id;
     
    const connectionRequest = await ConnectionRequest.find({
        $or :[
            {toUserId: loggedInUser, status: "accepted"},
            {fromUserId: loggedInUser, status: "accepted"}
        ]

    }).populate("fromUserId", "firstName lastName" );

      res.json({data: connectionRequest});
        
    }catch(err){
        res.status(400).send({message: err.message})
    }
     
})

userRouter.get("/feed", authUser, async(req, res)=>{

    try{
            const loggedInUser = req.user._id ;

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10; 
            const skip =  (page-1) * limit;         
            const connectionRequest = await ConnectionRequest.find({
                $or: [
                    {fromUserId:loggedInUser},
                    {toUserId: loggedInUser},
                ]
            }).select("fromUserId, toUserId")

            const hidingconnectionFeed = new Set();
            
            connectionRequest.forEach((req) =>{
            hidingconnectionFeed.add(req.fromUserId.toString());
            hidingconnectionFeed.add(req.toUserId.toString());
            })

            const users = await User.find({
                $and:[
                {_id: {$nin: Array.from(hidingconnectionFeed)}},
                {_id:{$ne:loggedInUser }}
                ]
            }.select(USER_SAFE_DATA).skip().limit(limit));

            res.send(users);
        }
        catch(err){
            res.status(400).send({message:err.message})
        }

})

module.exports = userRouter;