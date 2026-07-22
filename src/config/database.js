const mongoose = require("mongoose")
const dbConnectionString = process.env.DB
const connectDb = async()=>{
    
        await mongoose.connect(dbConnectionString)

}

module.exports = connectDb;