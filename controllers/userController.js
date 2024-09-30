const express = require('express');
const asyncHandler = require('express-async-handler')

const User = require('../models/user');

const signin = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const userExist = await User.find({ email: email })

    if (userExist) {
        res.render("Home")
    }
    else {
        res.status(200).json({ "message": "user not found" })
        // console.log("user not found")
    }
})

const signup = asyncHandler(async(req,res)=>{
    const {fullname,email,password} = req.body
    const userCreated = await User.create({
        fullname,
        email,
        password
    })

    if(userCreated){
        res.status(201).json({
            "message":"user successfully created"
        })
    }

    else{
        throw new error ("Invalid user data")
    }
})

module.exports = { signin, signup }