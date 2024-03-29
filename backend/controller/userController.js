const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models//userModel')

//@desc REgister new User
//@route POST /api/users 
//@access public

const registerUser = asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all value')
    }
    //check if user exist
    const userExists =  await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user already exist')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    //create a user
    const user = await User.create({
        name,
        email,
        password:hashedPass,
    })

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid User')
    }
})
//@desc Authenticate
//@route POST /api/users/login 
//@access public
/*  Each login generates a fresh token with a new expiration time, enhancing security by limiting the window of opportunity for token misuse. (this thing can be done)*/
const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    
    //check fo the user email in the database
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User')
    }
}
)
//@desc get user data
//@route  GET /api/users/me
//@access private

const getMe = asyncHandler(async(req,res) =>{
    res.status(200).json(req.user) //already get the user in the middleware
})

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe
}
