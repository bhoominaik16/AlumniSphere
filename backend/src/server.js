const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB  = require('./config/db')
const User = require('./models/UserModel')
const AuthRouter = require('./routes/AuthRouter')
const MentorshipRouter = require("./routes/MentorshipRouter");
const ensureAuthentication = require('./middleware/Auth')

dotenv.config()
connectDB();

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth', AuthRouter)
app.use('/user', AuthRouter)
app.use("/mentorship", MentorshipRouter);

app.listen(PORT, () => {
    console.log("Server running on port:",PORT)
})
