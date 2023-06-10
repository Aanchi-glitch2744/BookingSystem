const User = require('../models/User')
const bcrypt = require('bcrypt')
const createError = require("../utils/error");
const jwt = require('jsonwebtoken')
const register = async (req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            password: hash
        })

        await newUser.save()
        res.status(200).send("User has been created.")
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if (!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong credentials!"))

        //generated secret key using $openssl rand -base64 32 -> which is a robust, commercial-grade,
        // full-featured toolkit for general-purpose cryptography and secure communication.
        //We will set the token in a cookie using cookie parser
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET); //secret key


        const {password, ...otherDetails} = user._doc  //Removed isAdmin

        res.cookie("access_token", token, {
          httpOnly: true //This doesn't allow any client secrets to reach to this cookie
        }).status(200).json({...otherDetails});

    } catch (err) {
        next(err)
    }
}

module.exports = {register, login}