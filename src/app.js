const express = require('express');
const { auth } = require('./middlewares/auth');

const app = express()

app.use(express.json());

app.use('/',auth)


app.get('/user',(req,res)=>{
   res.send("user 1")
})

app.get('/deleteData',(req,res)=>{
   res.status(200).send("Data Deleted Successfully")
})
app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
})