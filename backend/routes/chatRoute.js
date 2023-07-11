const express = require('express')

const {createChat, getChats, createGroupChat} = require("../controllers/chatController")

const { protect } = require("../middleware/auth")

const router = express.Router()

router.route("/").get(protect, getChats).post( protect, createChat)

router.post("/group", protect, createGroupChat)

module.exports = router