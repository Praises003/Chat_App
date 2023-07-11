const express = require("express")

const { createMessage, getMessage } = require("../controllers/messageController")
const { protect } = require("../middleware/auth")



const router = express.Router()

router.route("/").post(protect,createMessage)

router.get("/:chatId", protect, getMessage)

module.exports = router