const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required : [true,"plesae add a name"]
        },
        email: {
            type: String,
            required : [true,"plesae add an email"],
            unique: true
        },
        password: {
            type: String,
            required : [true,"plesae add a password"]
        },
    
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('user',userSchema)