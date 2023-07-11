const express = require('express')

const {createChat, getChats, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup} = require("../controllers/chatController")

const { protect } = require("../middleware/auth")

const router = express.Router()

router.route("/").get(protect, getChats).post( protect, createChat)

router.post("/group", protect, createGroupChat, )
router.put("/rename", protect, renameGroup)
router.put("/groupremove", protect, removeUserFromGroup)
router.put("/groupadd", protect, addUserToGroup)

module.exports = router