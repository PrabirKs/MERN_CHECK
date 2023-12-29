const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(
    async (req,res,next) => {
        let token
        //have to pass the jwt token at the header
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                //get token from header
                //token format is "bearer 'sdffsd2323saf...' "
                token = req.headers.authorization.split(' ')[1]

                //verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                //get user from the token 
                //creating a property user (req.user) and assiging the user object fetching from the database
                req.user = await User.findById(decoded.id).select('-password')
                next()
            } catch (error) {
                console.log(error);
                res.status(401)
                throw new Error("not authorizes")
            }
        }
        if(!token){
            res.status(401)
            throw new Error('No authorized, no token')

        }
    }
)

module.exports = {protect}