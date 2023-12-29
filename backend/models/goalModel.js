const mongosse = require('mongoose')

const GoalSchema = mongosse.Schema(
    {
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