const jwt = require('jsonwebtoken')
const createError = require('./error')
const {verify} = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"))
        req.user = user; //can use any other name to assign it value here
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(res.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Yu are not authorized!"))
        }
    })
}
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Yu are not authorized!"))
        }
    })
}


module.exports = {verifyToken, verifyUser, verifyAdmin}