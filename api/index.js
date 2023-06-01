const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth.js')
const usersRoute = require('./routes/auth.js')
const hotelsRoute = require('./routes/auth.js')
const roomsRoute = require('./routes/auth.js')
const app = express()
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to database")
    } catch (err) {
        throw ("Err occurred while connecting to mongoose as: ", err);
    }
}

mongoose.connection.on("disconnected", ()=> {
    console.log("Disconnected from database!")
})

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", authRoute);
app.use("/api/hotels", authRoute);
app.use("/api/rooms", authRoute);
app.listen(5000, ()=> {
    connect()
    console.log('Server is running on port 5000')
})