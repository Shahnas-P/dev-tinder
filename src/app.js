const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
const validateKeys = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { auth } = require('./middlewares/auth');
const app = express()


app.use(express.json())
app.use(cookies())

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

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const { isValidate, errors } = validateKeys(req.body);

  if (!isValidate) {
    return res.status(400).json({ errors: errors.join(",") });
  }

  const user = await User.findOne({ emailId });

  if (!user) {
    return res.status(400).json({ message: "Invalid Credential" });
  }

  const isPasswordValid = user.verifyPassword(password)

  if (isPasswordValid) {
    const token = user.getJWT()

    res.cookie("token", token,{ maxAge: 7 * 24 * 60 * 60 *1000 , httpOnly: true });
    return res.status(200).json({ message: "Login Successfull" });
  } else {
    return res.status(400).json({ message: "Invalid Credential" });
  }
});

  app.get("/profile", auth, async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  app.post('/sendConnectionRequest',auth,(req,res)=>{
    return res.status(200).json({message:"Connection send successfully!"})
  })


connectDb().then(()=>{
    console.log("Database connected successfully!!");
    app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
})
    
}).catch(()=>{
    console.error("Database connection Interepted !!! ");
})

