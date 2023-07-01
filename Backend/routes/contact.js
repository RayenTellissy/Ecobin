const router = require("express").Router()
const { getContacts } = require("../controllers/contact")

router.get("/getContacts/:id", getContacts)

module.exports = router