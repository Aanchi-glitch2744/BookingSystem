const express = require('express')

const router = express.Router();

router.get("/", (req, res)=> {
    res.send("Hello, this is the auth endpoint")
})
router.get("/register", (req, res)=> {
    res.send("Hello, this is the register endpoint")
})

module.exports = router