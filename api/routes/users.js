const express = require('express')

const router = express.Router();

router.get("/", (req, res)=> {
    res.send("Hello, this is the users endpoint")
})

module.exports = router