const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateEditProfileData, validatePassword } = require("../utils/validator");
const profileRouter = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')

profileRouter.get("/profile", auth, async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

profileRouter.patch("/profile/edit", auth, async (req, res) => {
  try {
    const data = req.body;
    const { isValidate, errors } = validateEditProfileData(data);

    if (!isValidate) {
      return res.status(400).json({ errors: errors.join(",") });
    }

    const logedInUser = req.user;

    Object.keys(data).forEach((key) => {
      logedInUser[key] = data[key];
    });

    await logedInUser.save();

    return res.status(200).send("Profile updated Successfully");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

profileRouter.patch("/profile/password",auth, async (req,res)=>{
  try{
    const logedUserDetials = req.user
    
   const { isValidate, errors } = validatePassword(req.body)
   if(!isValidate){
    return res.status(400).json({errors:errors.join(',')})
   }

   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   await User.findByIdAndUpdate(logedUserDetials._id, {
  password: hashedPassword,
});
   
   
   return res.status(200).json({message:"Password updated successfully!!!"})
  }catch(error){
    return res.status(500).json({error:error.message})
  }
   
   
})

module.exports = profileRouter;
