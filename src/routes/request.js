const express = require("express");
const { auth } = require("../middlewares/auth");
const requestRouter = express.Router();

const ConnectionRequest = require('../models/connectionRequest')

const User = require('../models/user')

requestRouter.post(
  "/request/send/:status/:toUserId", auth, async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //status validation
      const allowedStatus = ["ignored", "interested"];

      const validStatus = allowedStatus.includes(status);

      if (!validStatus) {
        return res.status(400).json({
          message: `Allowed status ${allowedStatus}`,
        });
      }

      //Validating toUserId is  in our db

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      //validating if same request exist or touserid can't request to already exsting request

      const exisitingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (exisitingRequest) {
        return res.status(400).json({ message: "Request Already exist!!" });
      }
      const connectionReq = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionReq.save();
      return res.status(200).json({
        message: `${user.firstName} is ${status} ${toUser.firstName} `,
      });
    } catch (error) {
      return res.status(400).json({ Error: error.message });
    }
  },
);

requestRouter.post("/request/review/:status/:requestId",auth,async(req,res)=>{
  try{
    const loggedInUser = req.user
    const {status,requestId} = req.params

     //validate status [accepted,rejected]
    const allowedStatus =["accepted", "rejected"]

     const  isStatusValid = allowedStatus.includes(status)

     if(!isStatusValid){
      return res.status(400).json({message:`Allowed status ${allowedStatus}`})
     }
     
    
     // Request validation  (It should be exist on the connectionRequest)
     // interested conneciton request can only review 
     //loggedIn user should be the toUserId
     const connectionRequest = await ConnectionRequest.findOne({
      _id:requestId,
      status:"interested",
      toUserId:loggedInUser._id
     })
     
     if(!connectionRequest){
      return res.status(404).json({message:"Request not found"})
     }
     connectionRequest.status = status
     const data =  await connectionRequest.save()
     res.status(200).json({message:`${loggedInUser.firstName} ${status} request`,data})


  }catch(error){
    return res.status(500).json({message:error.message})
  }
})

module.exports = requestRouter;
