const express = require('express')

const app = express()

app.use(express.json());

app.all('/',(req,res,next)=>{
   console.log("Middleware to parse to json");
   next()
})

app.all('/test',(req,res,next)=>{
   console.log("Inside second middleware ");
   
   next()
   // res.send("yeah we reached through app.all('/') middleware")
})


app.get('/test/user',(req,res)=>{
   res.send("/test/user working fine for app.all() middlewares")
})

app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
    
})