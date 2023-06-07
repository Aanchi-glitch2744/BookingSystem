const express = require('express')
const {createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability} = require('../controllers/room')
const {verifyAdmin} = require('../utils/verifyToken')
const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);

module.exports = router