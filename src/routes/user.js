const express = require("express")
const userRouter = express.Router()

const {auth} = require("../middlewares/auth")

const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFE_DATA = "firstName lastName photoUrl about skill"

userRouter.get("/user/request/received",auth,async(req,res)=>{
    try {
      //fetch request  received to loggedIn user
      const loggedInUser = req.user;

      const connecitonRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId",USER_SAFE_DATA );
      
      res.status(200).json({
          message: "Connection request fetched successfully !!!",
          connecitonRequests,
        });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
})


userRouter.get("/user/connections",auth,async(req,res)=>{
    try{
        //check loggedIn user in fromuserid or  toUserid  status must be accepted
        //populate only the fromUserId or toUserId based on which one is loggedIn user corresponding one is the connection.
        const loggedInUser = req.user;

        const connection = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id ,status:"accepted"},{toUserId:loggedInUser._id,status:"accepted"}]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

        const data = connection.map((row)=>{
            if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })


        res.status(200).json({message:"Data fetched sucessfully",data})

    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = userRouter;