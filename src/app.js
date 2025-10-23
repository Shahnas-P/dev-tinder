const express = require('express')

const app = express()

app.use(express.json());

app.use('/',(req,res,next)=>{
   console.log("Goes through app.use()");
   
   // res.send("This is the app.use() response ")
   next()
})

app.post('/admin/getAllData',(req,res)=>{
   const token = req.body?.token
   console.log((token));
   
   if(token === "xyz"){
         res.send("Fetched All Data Successfully")
   }else{
      res.status(401).send("Unauthorized Error")
   }
})

app.get('/admin/deleteUser',(req,res)=>{
   res.send("User Deleted Successfully")
})
app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
    
})