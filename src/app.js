const express = require('express');
const connectDb = require('./config/database');
const User = require('./models/user');
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken');
const { auth } = require('./middlewares/auth');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const app = express()
const router = express.Router()


app.use(express.json())
app.use(cookies())

router.use('/',authRouter)
router.use('/',profileRouter)
router.use('/',requestRouter)

app.use(router)

connectDb().then(()=>{
    console.log("Database connected successfully!!");
    app.listen(3000 , ()=>{
    console.log("Server is listening in port 3000");
})
    
}).catch(()=>{
    console.error("Database connection Interepted !!! ");
})

