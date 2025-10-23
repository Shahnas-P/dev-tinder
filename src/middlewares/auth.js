const auth = (req,res,next)=>{
   const token = req.body?.token

   if(token === "xyz"){
      console.log("Authorized");
      
      next()
   }else{
      res.status(401).send("Unauthorized user")
   }
}

module.exports = {auth}
