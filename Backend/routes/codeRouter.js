const router = require("express").Router()
const { getAll,getOneCode,deleteCode,confirmPurchase } = require("../controllers/codeController")

router.get('/code/:code', getOneCode);
router.get("/code/getAll", getAll)
router.delete('/code/:code', deleteCode);
router.post('/users/:userId/purchase',confirmPurchase);
module.exports = router