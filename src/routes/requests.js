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
    console.log(data)

    res.json({
      message: req.user.firstName + " is " + status+ " in "+ toUser.firstName,
      data,
    });
  } catch (error) {
    res.status(400).send("Error of Connection: " + error.message);
  }
})

module.exports = requestRouter;