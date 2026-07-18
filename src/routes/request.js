const express = require("express");
const { auth } = require("../middlewares/auth");
const requestRouter = express.Router();

const ConnectionRequest = require('../models/connectionRequest')

requestRouter.post("/request/send/:status/:toUserId", auth, async(req, res) => {

  try{
    const user = req.user
    const fromUserId = user._id
    const toUserId = req.params.toUserId
    const status = req.params.status

    const connectionReq =  new ConnectionRequest({
      fromUserId,toUserId,status
    })


     const data = await connectionReq.save()
     return res.status(200).json({
      message:`${user.firstName} is ${status} ${toUserId} `
     })
  }catch(error){
    return res.status(400).json({Error: error.message})
  }
});

module.exports = requestRouter;
