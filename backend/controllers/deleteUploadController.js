const cloudinary = require("cloudinary")
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()
const asyncHandler = require('express-async-handler')




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


exports.deleteUpload = asyncHandler(async (req, res) => {
    try {
        const { public_id } = req.body
         
        if(!public_id) {
            return res.status(400).json({msg: "No image was chosen"})
        }

        const result = await cloudinary.v2.uploader.destroy(public_id)
        console.log(result)

        res.json({msg: "Image Deleted"})

    } catch(err) {
        res.status(500)
        throw new Error(err.message)


    }
})