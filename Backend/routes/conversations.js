const router = require("express").Router()
const { getMessages, sendMessage, create } = require("../controllers/conversations")

router.get("/getMessages/:id", getMessages)

router.post("/send", sendMessage)
router.post("/create", create)

module.exports = router