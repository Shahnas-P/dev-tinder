const express = require('express')

const app = express()

app.use('/hello' ,(req,res)=>{
    res.send("Server response to /hello request")
})
app.use('/test',(req,res)=>{
    res.send("Server response is here , hope you happy...")
})
app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
    
})