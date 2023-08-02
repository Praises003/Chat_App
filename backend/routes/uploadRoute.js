const express = require('express')

const {upload} = require('../controllers/uploadController')

const router = express.Router()

router.post('/', upload)

module.exports = router