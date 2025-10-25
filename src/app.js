const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
const app = express()

app.post('/signup', async (req,res)=>{


    const user =  new User({
        firstName:"Anu",
        lastName:"mol",
        emailId:"anu@gmail.com",
        age:24,
        gender:"female"
    })
    try{
    await user.save()
    res.status(200).send("User created successfully !!")
    }catch(error){
        res.status(400).send("Error: Unable to create user.",error.message)
    }
})


connectDb().then(()=>{
    console.log("Database connected successfully!!");
    app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
})
    
}).catch(()=>{
    console.error("Database connection Interepted !!! ");
})

