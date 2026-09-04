const express = require('express')
const {validateKeys} = require("../utils/validator");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  
  try {
    const data = req.body;
 
    
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }

    const { isValidate, errors } = validateKeys(data);
    
    

    if (!isValidate) {
      return res.status(400).json({ errors: errors.join(",") });
    }

    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      ...data,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).send("User created successfully !!");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
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

  const isPasswordValid = await user.verifyPassword(password);

  if (isPasswordValid) {
    const token = user.getJWT();

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login Successfull" , data:user});
  } else {
    return res.status(400).json({ message: "Invalid Credential" });
  }
});

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.send("Logout successfully")
})

module.exports = authRouter;
