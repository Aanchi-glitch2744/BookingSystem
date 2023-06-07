const express = require('express')
const Hotel = require('../models/Hotel.js')
const router = express.Router();
const createError = require("../utils/error");
const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType,
    getHotelRooms
} = require('../controllers/hotel')
const {verifyToken, verifyAdmin, verifyUser} = require('../utils/verifyToken')

//Create
router.post("/", verifyAdmin, createHotel)

//Read
router.get("/:id", verifyAdmin, getHotel)

//Update
router.put("/:id", verifyAdmin, updateHotel)

//Delete
router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router