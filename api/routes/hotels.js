const express = require('express')
const Hotel = require('../models/Hotel.js')
const router = express.Router();

//Create
router.post("/", async (req, res)=> {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    } catch (e) {
        res.status(500).json(e)
    }
})

//Read
router.get("/", async (req, res)=> {
    try {
        const getHotel = await Hotel.find()
        res.status(200).json(getHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

//Update

router.put("/:id", async (req, res)=> {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            { new: true }
            )
        res.status(200).json(updatedHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

//Delete
router.delete("/:id", async (req, res)=> {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(
            req.params.id,
            { new: true }
        )
        res.status(200).json(deletedHotel)
    } catch (e) {
        res.status(500).json(e)
    }
})

module.exports = router