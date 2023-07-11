const express = require("express")
const {testUser} = require("../controllers/testController")

const router = express.Router()

router.post("/chat", testUser)

module.exports = router;