const express = require("express");
const { auth } = require("../middlewares/auth");
const requestRouter = express.Router();

const ConnectionRequest = require('../models/connectionRequest')

const User = require('../models/user')

requestRouter.post("/request/send/:status/:toUserId", auth, async(req, res) => {

  try{
    const user = req.user
    const fromUserId = user._id
    const toUserId = req.params.toUserId
    const status = req.params.status

    //Validating toUserId is  in our db 

    const toUser = await User.findById(toUserId)
    if(!toUser){
      return res.status(404).json({
        message:"User not found"
      })
    }
    
    //validating if same request exist or touserid can't request to already exsting request

    const exisitingRequest = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    },)

    if(exisitingRequest){
      return res.status(400).json({message:"Request Already exist!!"})
    }
    const connectionReq =  new ConnectionRequest({
      fromUserId,toUserId,status
    })


     const data = await connectionReq.save()
     return res.status(200).json({
      message:`${user.firstName} is ${status} ${toUser.firstName} `
     })
  }catch(error){
    return res.status(400).json({Error: error.message})
  }
});

module.exports = requestRouter;
