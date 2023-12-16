const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected : ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        
    }
}
module.exports = connectDB