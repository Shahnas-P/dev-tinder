const { default: mongoose } = require("mongoose");


const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
  
    toUserId:{
        type:mongoose.Types.ObjectId,
        required:true
},
    status:{
        type:String,
        enum:{
            values:[
                "interested","ignored","accepted","rejected"
            ],
            message:'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
    }
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema)

exports.model = { 
    ConnectionRequestModel
}