const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth.js')
const usersRoute = require('./routes/users.js')
const hotelsRoute = require('./routes/hotels.js')
const roomsRoute = require('./routes/rooms.js')
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

//by default, we cannot use json objects simply to call an api so call this --->
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.listen(5000, ()=> {
    connect()
    console.log('Server is running on port 5000')
})