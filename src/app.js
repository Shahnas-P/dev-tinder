const express = require('express')

const app = express()

app.get('/user/:userId',(req,res)=>{
    console.log(req.params.userId);
    
        res.send("It's worked !!!")
})




app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
    
})