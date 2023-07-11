const express = require('express')
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')
const {notFound, errorHandler} = require('./middleware/error')
dotenv.config()
const connectDb = require('./config/db')
const userRoute = require("./routes/userRoute")
const chatRoute = require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")
const testRoute = require("./routes/testRoute")
connectDb()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/user', userRoute)
app.use('/api/chat', chatRoute)
app.use('/api/message', messageRoute)
app.use('/', testRoute)
app.get('/', (req, res) => {

    res.send("Hello World")
})


const PORT = process.env.PORT || 5000
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
    
})