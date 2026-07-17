const mongoose = require("mongoose")

const connectDb = async()=>{
    // await mongoose.connect("mongodb+srv://shahnas:devtinder@dev-tinder.dhmo2mn.mongodb.net/devtinder?appName=dev-tinder")
        await mongoose.connect("mongodb+srv://shahnasDevTinder:shahnas@devtinder.uctigc7.mongodb.net/devtinder?appName=devTinder")

}

module.exports = connectDb;