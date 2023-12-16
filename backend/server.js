const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const app =  express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoute'))  // use the routes api 
app.use(errorHandler)

app.listen(port, () =>{
    console.log(`server started on port ${port}`);
})