const cloudinary = require("cloudinary")
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// exports.upload = (req, res) =>{
//     try {
        //console.log(req)
        // console.log(req.files.file)
        // if(!req.files || Object.keys(req.files).length === 0) return res.status(400).json({msg: "No files were uploaded"})

        // const file = req.files.file;

        // if(file.size > 1024*1024) return res.status(400).json({msg: "size too large"})

        // if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') return res.status(400).json({msg: "File format is not supported"})

        // console.log(file.tempFilePath)

        
        


        //   cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async (err, result) => {
        //      if (err) throw err;
        //      console.error("Error during upload:", err);
        //      console.log(result)

        //      res.json({result})
        //     //  res.json({public_id: result.public_id, url: result.secure_url})
        //  })
        

//         cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }).then(res => res.json({result: res}))
//         res.json('test')
//     } catch (error) {
//         res.status(500)
//         throw new Error("there is an error")
//     }
// }

exports.upload = async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No files were uploaded" });
  
      const file = req.files.file;
  
      if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "Size too large" });
      }
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png"
      ) {
        removeTmp(file.tempFilePath)
        return res.status(400).json({ msg: "File format is not supported" });
  
      console.log(file.tempFilePath);
      console.log(process.env.CLOUD_NAME)
      console.log(process.env.MONGO_URI)
    }
      // Use Promises with await
      try {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: "test",
        });
  
        console.log("Upload successful:", result);
        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.secure_url });
      } catch (err) {
        console.error("Error during upload:", err);
        res.status(500).json({ error: "Failed to upload the file to Cloudinary" });
      }
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  };

  const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
  }