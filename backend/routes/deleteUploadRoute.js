const express = require('express')

const { deleteUpload } = require('../controllers/deleteUploadController')

const router = express.Router()

router.post('/', deleteUpload)

module.exports = router