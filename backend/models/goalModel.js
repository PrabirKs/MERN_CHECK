const mongosse = require('mongoose')

const GoalSchema = mongosse.Schema(
    {
        user: {
            type : mongosse.Schema.Types.ObjectId,
            required : true ,
            ref: 'User'
        },
        text: {
            type : String,
            required : [true,'please add a text']
        }
    },
    {
        timestamps : true
    }
)
module.exports = mongosse.model('goal',GoalSchema)