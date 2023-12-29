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
        password:hashedPass
    })

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } else{
        res.status(400)
        throw new Error('Invalid User')
    }
})
//@desc Authenticate
//@route POST /api/users/login 
//@access public

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    
    //check fo the user email in the database
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid User')
    }
    res.json({message: 'Log in user'})
}
)
//@desc get user data
//@route  GET /api/users/me
//@access public

const getMe = asyncHandler(async(req,res) =>{
    res.json({message: 'user data'})
}
)
module.exports = {
    registerUser,
    loginUser,
    getMe
}
