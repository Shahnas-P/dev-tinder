const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        maxLength:20

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        maxLength:50,
        trim:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about"
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
    },
    skill:{
        type:[String],
    }
})

module.exports = mongoose.model("User",userSchema)