const mongoose = require("mongoose")

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://shahnas:devtinder@dev-tinder.dhmo2mn.mongodb.net/devtinder?appName=dev-tinder")
}

module.exports = connectDb;