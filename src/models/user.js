const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
    password:{
        type:String,
        required:true,
        maxLength:100,
        minLength:8,
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
        default:"This is a default about",
        min:1000
    },
    photoUrl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80"
    },
    skill:{
        type:[String],
    }
},{ timestamps: true })

userSchema.methods.getJWT = function(){
    const user = this
    const token = jwt.sign({ _id: user._id } , "NamasteDevTinder#234",{ expiresIn: '7d' });
    return token
}


userSchema.methods.verifyPassword = async function(userInputPassword){
    const user = this
    const hashedPassword = user.password
    const isPasswordValid = await bcrypt.compare(userInputPassword, hashedPassword);
    return isPasswordValid
}
module.exports = mongoose.model("User",userSchema)