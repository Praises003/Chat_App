const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Sucessfully Connected; ${con.connection.host}`)
    } catch(err) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDb