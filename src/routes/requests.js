const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js")
const User = require("../models/user.js");



requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{

  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "invalid status type: " + status})
    }

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message: "User Not Found!"})
    }

    // If there is an existing ConnectionRequest
    const existingConneectionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId}
      ],
    });

    if(existingConneectionRequest){
      return res.status(400).send({message: "Connection Request Already Exits!!"})
    }
    
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    }); 
    
    const data = await connectionRequest.save();
    
    res.json({
        message: req.user.firstName + " is " + status+ " in "+ toUser.firstName,
        data,
      });
      
  } catch (error) {
    res.status(400).send("Error of Connection: " + error.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) => {

  try {
    const loggedInUser = req.user;

    const {status, requestId} = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message: "Status not allowed!!"})
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    
    if(!connectionRequest){
      return res.status(404).json({message: "Connection request not found"});
    }; 

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message: "Connection request "+ status, data});

  } catch (error) {
    res.status(400).send("Error from review: " + error.message);
  }
});

module.exports = requestRouter;