const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
const validateKeys = require('./utils/validator');
const bcrypt = require('bcrypt');
const app = express()




app.use(express.json())

app.post('/signup', async (req,res)=>{
    try{ 

    const data = req.body  
  
    if(!data || Object.keys(data).length ===0){
      return res.status(400).json({error:"Request body cannot be empty"})
    }
    
    const {isValidate ,errors} = validateKeys(data)
    
    if(!isValidate){
       return res.status(400).json({errors:errors.join(',')})
    }


   const hashedPassword =await bcrypt.hash(data.password,10)

    const user =  new User({
      ...data,
      password : hashedPassword
    })

    await user.save()

    return res.status(200).send("User created successfully !!")

    }catch(error){
       return res.status(400).json({error:error.message})
    }
})

app.post('/login',async(req,res)=>{
   const {emailId,password} = req.body

   if(!emailId || !password){
    return res.status(400).json({error:"Email and password required"})
   }

   const {isValidate,errors} = validateKeys(req.body)

   if(!isValidate){
    return res.status(400).json({errors:errors.join(',') })
   }

   const user = await User.findOne({emailId})

   if(!user){
    return res.status(400).json({message:"Invalid Credential"})
   }
   
   const isPasswordValid = await bcrypt.compare(password,user.password)
   
   if(isPasswordValid){
       return res.status(200).json({message:"Login Successfull"})
   }else{
    return res.status(400).json({message:"Invalid Credential"})
   }
   
})

app.get('/users',async(req,res)=>{
    try{
       const  {emailId}  =  req.body

    const user = await User.find({emailId})
    if(user.length!==0){
        res.status(200).send(user)
    }else{
       return res.status(400).send("User not found")
    }
    }catch(error){
       return res.status(500).send("Something went wrong!!")
    }
})

app.get('/user',async(req,res)=>{
    try{
        const {emailId} = req.body
        const user = await User.findOne({emailId})

        if(user){
          return  res.status(200).send(user)
        }else{
           return res.status(400).send("User not found")
        }
    }catch(error){
       return  res.status(500).send("Something went wrong!!")
    }
})

//Feed API - Get all users 
  
  app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find()
        if(users){
          return  res.status(200).send(users)
        }else{
          return  res.status(400).send("Users not found")
        }
    }catch(error){
      return  res.status(500).send("Something went wrong!!")
    }
  })

  app.delete('/user', async (req,res)=>{
    try{  
        await User.findByIdAndDelete(req.body.userId)
       return res.status(200).send("User Deleted Successfully!!")
    }catch(error){
      return  res.status(500).send("Something Went Wrong!!")
    }
  })

  app.patch('/user/:userId',async(req,res)=>{
    try{
    const {userId} = req.params
    const data = req.body
    
    const ALLOWED_KEYS = [
    "firstName","lastName","emailId","password","age","gender","about","photoUrl","skill"
    ]

       
    const isValid = Object.keys(data).every((key) =>
      ALLOWED_KEYS.includes(key)
    );

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty." });
    }

    if (!isValid) {
      return res.status(400).json({ message:"Some of the information you entered isn’t valid. Please check your details and try again.",});
    }

    
    const {isValidate ,errors} = validateKeys(data)
    
    if(!isValidate){
       return res.status(400).json({errors:errors.join(',')})
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new:true,
      runValidators: true,
    }).lean();
    
    
    if (!updatedUser) {
     return res.status(400).send({ message: "User not found " });
    }
     return res.status(200).send({ message: "User updated Successfully !! ", data: updatedUser });

        
    }catch(error){
      return  res.status(500).json({error:error.message})
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

