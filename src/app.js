const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
const app = express()


app.use(express.json())

app.post('/signup', async (req,res)=>{
    
    const user =  new User(req.body)
    try{
    await user.save()
    res.status(200).send("User created successfully !!")
    }catch(error){
        res.status(400).send("Error: Unable to create user.",error.message)
    }
})


app.get('/users',async(req,res)=>{
    try{
       const  {emailId}  =  req.body

    const user = await User.find({emailId})
    if(user.length!==0){
        res.status(200).send(user)
    }else{
        res.status(400).send("User not found")
    }
    }catch(error){
        res.status(500).send("Something went wrong!!")
    }
})

app.get('/user',async(req,res)=>{
    try{
        const {emailId} = req.body
        const user = await User.findOne({emailId})

        if(user){
            res.status(200).send(user)
        }else{
            res.status(400).send("User not found")
        }
    }catch(error){
        res.status(500).send("Something went wrong!!")
    }
})

//Feed API - Get all users 
  
  app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find()
        if(users){
            res.status(200).send(users)
        }else{
            res.status(400).send("Users not found")
        }
    }catch(error){
        res.status(500).send("Something went wrong!!")
    }
  })

  app.delete('/user', async (req,res)=>{
    try{  
        await User.findByIdAndDelete(req.body.userId)
        res.status(200).send("User Deleted Successfully!!")
    }catch(error){
        res.status(500).send("Something Went Wrong!!")
    }
  })

  app.patch('/user',async(req,res)=>{
    try{
        const {userId} = req.body
        const data = req.body
        
        const updatedUser = await User.findByIdAndUpdate(userId,data,{returnDocument:"after"}).lean()
        if(updatedUser){
         res.status(200).send({message:"User updated Successfully !! " , data : updatedUser})
        }
        
    }catch(error){
        res.status(500).send("Somthing went wrong!!")
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

