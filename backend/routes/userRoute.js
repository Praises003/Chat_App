const express = require("express")
const {registerUser, logout, login, getAllUsers, allUsers} = require("../controllers/userController")
const { protect } = require("../middleware/auth")

const router = express.Router()

router.route('/').get(protect,getAllUsers).post(registerUser)
router.post("/login", login)
router.post("/logout", logout)
router.get("/all", allUsers)
module.exports = router;