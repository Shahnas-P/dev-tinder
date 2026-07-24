const express = require("express")
const userRouter = express.Router()

const {auth} = require("../middlewares/auth")

const ConnectionRequest = require("../models/connectionRequest")
const user = require("../models/user")

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


userRouter.get("/feed",auth,async(req,res)=>{
    try{
        const loggedInUser =  req.user

        //Add pagination 
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        if(limit>50) {
            limit =  10;
        }
        let skip = (page-1)*limit

        //get all the connection request of the loggedIn user

        const connectionRequest = await ConnectionRequest.find({$or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]}).select("fromUserId toUserId")

        const hideConnectionList = new Set();

       connectionRequest.forEach((item)=>{
            hideConnectionList.add(item.fromUserId.toString())
            hideConnectionList.add(item.toUserId.toString())
        })

        const feedUser =await user.find({
            $and:[
                {_id:{$nin:Array.from(hideConnectionList)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        
        res.status(200).json({message:"Users fetched succesfully!!",data:feedUser})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = userRouter;