const router = require("express").Router()
const { getAllDepots,getDepotById, searchDepot, getDepotItems } = require("../controllers/depotController")

router.get("/depots/getAll", getAllDepots) 
router.get("/depots/:id", getDepotById)
router.get("/depot/search", searchDepot)
router.get('/items/:depotId', async (req, res) => {
    try {const depotId = req.params.depotId;
          const items = await getDepotItems(depotId);
          res.json(items); }
           catch (error) { console.error('Error:', error);
          res.status(500).json({ error: 'An error occurred' }); }});



module.exports = router